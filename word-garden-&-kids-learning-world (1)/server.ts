import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const dataSize = pcmBuffer.length;
  const fileSize = dataSize + 36;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;

  header.write("RIFF", 0);
  header.writeUInt32LE(fileSize, 4);
  header.write("WAVE", 8);

  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI lazily
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Server-side in-memory cache for TTS audio chunks to prevent quota rate limit exhaustion
  const ttsCache = new Map<string, { audio: string; mimeType: string }>();

  // AI Speech Generation (TTS) endpoint (Supports ElevenLabs + Gemini + Browser Fallback)
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice = "Kore", voiceId = "JBFqnCBsd6RMkjVDRZzb" } = req.body;
      if (!text) {
        res.status(400).json({ error: "Text is required" });
        return;
      }

      const cleanedText = text.replace(/\//g, " ").replace(/\s+/g, " ").trim();
      const cacheKey = `${cleanedText.toLowerCase()}_${(voiceId || voice).toLowerCase()}`;

      if (ttsCache.has(cacheKey)) {
        const cached = ttsCache.get(cacheKey)!;
        res.json(cached);
        return;
      }

      // 1. Try ElevenLabs API if ELEVENLABS_API_KEY is configured
      const elevenApiKey = process.env.ELEVENLABS_API_KEY;
      if (elevenApiKey && elevenApiKey !== "YOUR_ELEVENLABS_API_KEY_HERE" && elevenApiKey.trim() !== "") {
        try {
          const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
              "Accept": "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": elevenApiKey,
            },
            body: JSON.stringify({
              text: cleanedText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                style: 0.4,
                use_speaker_boost: true,
              },
            }),
          });

          if (elevenRes.ok) {
            const arrayBuffer = await elevenRes.arrayBuffer();
            const base64Audio = Buffer.from(arrayBuffer).toString("base64");
            const resultPayload = {
              audio: base64Audio,
              mimeType: "audio/mpeg",
              provider: "elevenlabs",
            };
            ttsCache.set(cacheKey, resultPayload);
            res.json(resultPayload);
            return;
          } else {
            const errorText = await elevenRes.text();
            console.warn("[TTS] ElevenLabs API error response:", elevenRes.status, errorText.slice(0, 100));
          }
        } catch (elevenErr) {
          console.warn("[TTS] ElevenLabs connection error:", elevenErr);
        }
      }

      // 2. Fallback to Gemini TTS if Gemini key is available
      try {
        const ai = getAi();
        let pcmBase64 = "";
        const ttsModels = ["gemini-2.5-flash-preview-tts", "gemini-3.1-flash-tts-preview"];

        for (const model of ttsModels) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: `Say the following in a friendly, clear, enthusiastic teacher voice for kids: ${cleanedText}`,
              config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: {
                      voiceName: voice,
                    },
                  },
                },
              },
            });

            const part = response.candidates?.[0]?.content?.parts?.[0];
            if (part && part.inlineData && part.inlineData.data) {
              pcmBase64 = part.inlineData.data;
              break;
            }
          } catch (modelErr: any) {
            const errMsg = String(modelErr?.message || modelErr);
            if (errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("Quota exceeded")) {
              console.log(`[TTS] Rate limit for ${model}, using browser speech fallback.`);
            }
          }
        }

        if (pcmBase64) {
          const pcmBuffer = Buffer.from(pcmBase64, "base64");
          const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
          const resultPayload = {
            audio: wavBuffer.toString("base64"),
            mimeType: "audio/wav",
            provider: "gemini",
          };
          ttsCache.set(cacheKey, resultPayload);
          res.json(resultPayload);
          return;
        }
      } catch (geminiErr) {
        // Fallback silently if Gemini API Key isn't configured
      }

      // 3. Fallback to native browser speech synthesis
      res.json({ fallback: true, reason: "Using client browser native speech synthesis" });
    } catch (error: any) {
      console.log("[TTS] Endpoint info: using native client speech fallback.");
      res.json({ fallback: true });
    }
  });

  // Gemini Live API Real-Time Voice WebSocket Server
  const wss = new WebSocketServer({ server, path: "/live" });

  wss.on("connection", async (clientWs) => {
    let session: any = null;
    try {
      const ai = getAi();
      session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            const text = message.serverContent?.modelTurn?.parts?.[0]?.text;
            if (audio || text) {
              clientWs.send(JSON.stringify({ audio, text }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            if (clientWs.readyState === clientWs.OPEN) {
              clientWs.close();
            }
          },
          onerror: (err) => {
            console.error("Gemini Live session error:", err);
            if (clientWs.readyState === clientWs.OPEN) {
              clientWs.send(JSON.stringify({ error: "Gemini Live error occurred" }));
            }
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction:
            "You are Maya, a cheerful, gentle AI teacher in Word Garden for young kids aged 3-7. Have a real-time voice chat with the child! Keep responses short (1-2 sentences), playful, encouraging, and clear.",
        },
      });

      clientWs.on("message", (data) => {
        try {
          const payload = JSON.parse(data.toString());
          if (payload.audio) {
            session.sendRealtimeInput({
              audio: { data: payload.audio, mimeType: "audio/pcm;rate=16000" },
            });
          } else if (payload.text) {
            session.sendRealtimeInput({ text: payload.text });
          }
        } catch (err) {
          console.error("Error processing ws payload:", err);
        }
      });

      clientWs.on("close", () => {
        if (session) {
          try {
            session.close();
          } catch (e) {}
        }
      });
    } catch (error: any) {
      console.error("Failed to connect Gemini Live session:", error?.message || error);
      if (clientWs.readyState === clientWs.OPEN) {
        clientWs.send(JSON.stringify({ error: error?.message || "Failed to connect to Live API" }));
        clientWs.close();
      }
    }
  });

  // AI Speech / Pronunciation encouraging feedback endpoint
  app.post("/api/pronunciation-check", async (req, res) => {
    try {
      const { targetWord, spokenText } = req.body;
      if (!targetWord) {
        res.status(400).json({ error: "Target word is required" });
        return;
      }

      const ai = getAi();
      const prompt = `You are Maya, a gentle, friendly, enthusiastic teacher avatar in an educational children's app called Word Garden.
The child was trying to say the word "${targetWord}".
The spoken text detected was: "${spokenText || ""}".
Evaluate if it's close or correct for a young child learning phonics.
Respond with a JSON object with keys:
- "isCorrect": boolean (true if spokenText is identical or very close to targetWord, ignoring minor accents or noise)
- "feedback": string (1 short, super encouraging, cheerful sentence for a 3-6 year old kid with emojis!)
- "starsEarned": number (10 if correct, 5 if close attempt)

Return ONLY raw valid JSON, no markdown code blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const responseText = response.text || "{}";
      const cleanedJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanedJson);
      res.json(parsed);
    } catch (error: any) {
      console.error("Error in pronunciation check:", error);
      // Fallback response if Gemini API key is missing or encounters issue
      const isClose = req.body.spokenText
        ? req.body.spokenText.toLowerCase().includes(req.body.targetWord.toLowerCase())
        : false;
      res.json({
        isCorrect: isClose || true,
        feedback: isClose ? "Fantastic job! You sounded just like a star! ⭐" : "Super effort! Let's try saying it together!",
        starsEarned: isClose ? 10 : 5,
      });
    }
  });

  // AI Guide Chat ("Ask Maya") endpoint
  app.post("/api/ask-guide", async (req, res) => {
    try {
      const { question, currentTopic } = req.body;
      const ai = getAi();
      const prompt = `You are Maya, a cheerful AI guide character with a colorful headband in Word Garden, a learning app for kids aged 3-7.
The child asked: "${question}" (Current learning topic: "${currentTopic || "general"}").
Give a simple, warm, fun 1-2 sentence answer that a young child can understand easily. Use simple words and playful emojis.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ reply: response.text?.trim() || "You are doing amazing today! Keep exploring!" });
    } catch (error) {
      res.json({ reply: "That's such a great question! You're a curious explorer!" });
    }
  });

  // AI Story Generator endpoint
  app.post("/api/generate-story", async (req, res) => {
    const { targetLetter = "A", targetWord = "Apple" } = req.body || {};
    try {
      const ai = getAi();
      const prompt = `Create a short 4-page mini children's story focusing on the letter "${targetLetter}" and the word "${targetWord}".
Format as JSON:
{
  "title": string,
  "pages": [
    { "pageNumber": 1, "text": string, "highlightWord": string, "illustrationPrompt": string }
  ]
}
Return raw JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const responseText = response.text || "{}";
      const cleanedJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
      res.json(JSON.parse(cleanedJson));
    } catch (error) {
      res.json({
        title: `The Story of the ${targetWord}`,
        pages: [
          { pageNumber: 1, text: `Once upon a time, there was a shiny red ${targetWord}.`, highlightWord: targetWord, illustrationPrompt: `A cute ${targetWord} in a garden` },
          { pageNumber: 2, text: `It loved to sit in the warm sunshine every morning.`, highlightWord: "sunshine", illustrationPrompt: "Sunshine in garden" },
          { pageNumber: 3, text: `All the garden friends came over to play together!`, highlightWord: "friends", illustrationPrompt: "Cute animals playing" },
          { pageNumber: 4, text: `And they lived happily ever after. The end!`, highlightWord: "happily", illustrationPrompt: "Happy friends smiling" }
        ]
      });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

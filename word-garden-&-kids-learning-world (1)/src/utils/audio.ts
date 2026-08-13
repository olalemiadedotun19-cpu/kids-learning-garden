// Web Audio API Synthesizer and Advanced Web Speech API helper for Word Garden

let audioCtx: AudioContext | null = null;
let activeMelodyTimeoutIds: number[] = [];
let activeMelodyOscillators: OscillatorNode[] = [];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopNurseryRhymeMelody() {
  activeMelodyTimeoutIds.forEach((id) => clearTimeout(id));
  activeMelodyTimeoutIds = [];
  activeMelodyOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {}
  });
  activeMelodyOscillators = [];
}

// Note Frequency Mapping
const C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, B3 = 246.94;
const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77, C6 = 1046.50;

type NoteStep = [freq: number, dur: number, bassFreq?: number];

const MELODIES: Record<string, NoteStep[]> = {
  'twinkle-star': [
    [C4, 0.4, C3], [C4, 0.4, C3], [G4, 0.4, G3], [G4, 0.4, G3], [A4, 0.4, F3], [A4, 0.4, F3], [G4, 0.8, C3],
    [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.4, G3], [D4, 0.4, G3], [C4, 0.8, C3],
    [G4, 0.4, G3], [G4, 0.4, G3], [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.8, G3],
    [G4, 0.4, G3], [G4, 0.4, G3], [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.8, G3],
    [C4, 0.4, C3], [C4, 0.4, C3], [G4, 0.4, G3], [G4, 0.4, G3], [A4, 0.4, F3], [A4, 0.4, F3], [G4, 0.8, C3],
    [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.4, G3], [D4, 0.4, G3], [C4, 0.8, C3]
  ],
  'abc-song': [
    [C4, 0.4, C3], [C4, 0.4, C3], [G4, 0.4, G3], [G4, 0.4, G3], [A4, 0.4, F3], [A4, 0.4, F3], [G4, 0.8, C3],
    [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.4, G3], [D4, 0.4, G3], [C4, 0.8, C3],
    [G4, 0.4, G3], [G4, 0.4, G3], [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.8, G3],
    [G4, 0.4, G3], [G4, 0.4, G3], [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.8, G3],
    [C4, 0.4, C3], [C4, 0.4, C3], [G4, 0.4, G3], [G4, 0.4, G3], [A4, 0.4, F3], [A4, 0.4, F3], [G4, 0.8, C3]
  ],
  'wheels-on-bus': [
    [C4, 0.3, C3], [F4, 0.3, F3], [F4, 0.3, F3], [F4, 0.3, F3], [F4, 0.3, F3], [A4, 0.3, F3], [C5, 0.3, C4], [A4, 0.3, F3], [F4, 0.6, F3],
    [G4, 0.3, C3], [G4, 0.3, C3], [G4, 0.6, C3], [E4, 0.3, C3], [C4, 0.3, C3], [C4, 0.6, C3],
    [F4, 0.3, F3], [F4, 0.3, F3], [F4, 0.3, F3], [F4, 0.3, F3], [A4, 0.3, F3], [C5, 0.3, C4], [A4, 0.3, F3], [F4, 0.6, F3],
    [G4, 0.4, C3], [C4, 0.4, C3], [F4, 0.8, F3]
  ],
  'old-macdonald': [
    [G4, 0.3, G3], [G4, 0.3, G3], [G4, 0.3, G3], [D4, 0.3, D3], [E4, 0.3, C3], [E4, 0.3, C3], [D4, 0.6, G3],
    [B4, 0.3, G3], [B4, 0.3, G3], [A4, 0.3, D3], [A4, 0.3, D3], [G4, 0.8, G3],
    [D4, 0.3, D3], [G4, 0.3, G3], [G4, 0.3, G3], [G4, 0.3, G3], [D4, 0.3, D3], [E4, 0.3, C3], [E4, 0.3, C3], [D4, 0.6, G3],
    [B4, 0.3, G3], [B4, 0.3, G3], [A4, 0.3, D3], [A4, 0.3, D3], [G4, 0.8, G3]
  ],
  'baa-baa-black-sheep': [
    [C4, 0.4, C3], [C4, 0.4, C3], [G4, 0.4, G3], [G4, 0.4, G3], [A4, 0.2, F3], [A4, 0.2, F3], [A4, 0.2, F3], [A4, 0.2, F3], [G4, 0.8, C3],
    [F4, 0.4, F3], [F4, 0.4, F3], [E4, 0.4, C3], [E4, 0.4, C3], [D4, 0.4, G3], [D4, 0.4, G3], [C4, 0.8, C3]
  ],
  'if-youre-happy': [
    [C4, 0.25, C3], [C4, 0.25, C3], [F4, 0.35, F3], [F4, 0.25, F3], [F4, 0.25, F3], [F4, 0.25, F3], [F4, 0.25, F3], [E4, 0.25, C3], [F4, 0.25, F3], [G4, 0.6, C3],
    [C4, 0.25, C3], [C4, 0.25, C3], [G4, 0.35, G3], [G4, 0.25, G3], [G4, 0.25, G3], [G4, 0.25, G3], [G4, 0.25, G3], [F4, 0.25, F3], [G4, 0.25, G3], [A4, 0.6, F3]
  ],
  'itsy-spider': [
    [G4, 0.3, G3], [C4, 0.3, C3], [C4, 0.3, C3], [C4, 0.3, C3], [D4, 0.3, D3], [E4, 0.3, C3], [E4, 0.6, C3],
    [E4, 0.3, C3], [D4, 0.3, G3], [C4, 0.3, C3], [D4, 0.3, G3], [E4, 0.3, C3], [C4, 0.6, C3],
    [E4, 0.3, C3], [E4, 0.3, C3], [F4, 0.3, F3], [G4, 0.6, G3],
    [G4, 0.3, G3], [F4, 0.3, F3], [E4, 0.3, C3], [F4, 0.3, F3], [G4, 0.3, G3], [E4, 0.6, C3]
  ],
  'row-boat': [
    [C4, 0.4, C3], [C4, 0.4, C3], [C4, 0.4, C3], [D4, 0.3, D3], [E4, 0.5, C3],
    [E4, 0.3, C3], [D4, 0.3, G3], [E4, 0.3, C3], [F4, 0.3, F3], [G4, 0.8, G3],
    [C5, 0.2, C4], [C5, 0.2, C4], [C5, 0.2, C4], [G4, 0.2, G3], [G4, 0.2, G3], [G4, 0.2, G3], [E4, 0.2, C3], [E4, 0.2, C3], [E4, 0.2, C3], [C4, 0.2, C3], [C4, 0.2, C3], [C4, 0.2, C3],
    [G4, 0.3, G3], [F4, 0.3, F3], [E4, 0.3, C3], [D4, 0.3, G3], [C4, 0.8, C3]
  ],
  'mary-lamb': [
    [E4, 0.35, C3], [D4, 0.35, G3], [C4, 0.35, C3], [D4, 0.35, G3], [E4, 0.35, C3], [E4, 0.35, C3], [E4, 0.7, C3],
    [D4, 0.35, G3], [D4, 0.35, G3], [D4, 0.7, G3], [E4, 0.35, C3], [G4, 0.35, G3], [G4, 0.7, G3],
    [E4, 0.35, C3], [D4, 0.35, G3], [C4, 0.35, C3], [D4, 0.35, G3], [E4, 0.35, C3], [E4, 0.35, C3], [E4, 0.35, C3], [E4, 0.35, C3],
    [D4, 0.35, G3], [D4, 0.35, G3], [E4, 0.35, C3], [D4, 0.35, G3], [C4, 0.8, C3]
  ],
  'london-bridge': [
    [G4, 0.35, G3], [A4, 0.35, F3], [G4, 0.35, G3], [F4, 0.35, F3], [E4, 0.35, C3], [F4, 0.35, F3], [G4, 0.7, G3],
    [D4, 0.35, G3], [E4, 0.35, C3], [F4, 0.7, F3], [E4, 0.35, C3], [F4, 0.35, F3], [G4, 0.7, G3],
    [G4, 0.35, G3], [A4, 0.35, F3], [G4, 0.35, G3], [F4, 0.35, F3], [E4, 0.35, C3], [F4, 0.35, F3], [G4, 0.7, G3],
    [D4, 0.5, G3], [G4, 0.5, G3], [E4, 0.35, C3], [C4, 0.7, C3]
  ]
};

export function playNurseryRhymeMelody(
  rhymeId: string, 
  onNoteStep?: (noteIndex: number, totalNotes: number) => void
): number {
  stopNurseryRhymeMelody();
  const melody = MELODIES[rhymeId] || MELODIES['twinkle-star'];
  const ctx = getAudioContext();
  let accumulatedTime = 0;

  melody.forEach(([freq, duration, bassFreq], index) => {
    const timeMs = accumulatedTime * 1000;
    
    const timeoutId = window.setTimeout(() => {
      try {
        if (onNoteStep) onNoteStep(index, melody.length);

        const now = ctx.currentTime;

        // 1. Lead Melody Note (Bright Marimba / Piano sound)
        const leadOsc = ctx.createOscillator();
        const leadGain = ctx.createGain();
        leadOsc.type = 'triangle';
        leadOsc.frequency.setValueAtTime(freq, now);
        leadGain.gain.setValueAtTime(0.35, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.95);
        leadOsc.connect(leadGain);
        leadGain.connect(ctx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + duration);
        activeMelodyOscillators.push(leadOsc);

        // 2. Warm Bass Accompaniment Note
        if (bassFreq) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(bassFreq, now);
          bassGain.gain.setValueAtTime(0.2, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.2);
          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + duration * 1.2);
          activeMelodyOscillators.push(bassOsc);
        }

        // 3. Subtle Rhythm Chime on beat
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq * 2, now);
        chimeGain.gain.setValueAtTime(0.08, now);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(now);
        chimeOsc.stop(now + 0.08);
        activeMelodyOscillators.push(chimeOsc);

      } catch (e) {}
    }, timeMs);

    activeMelodyTimeoutIds.push(timeoutId);
    accumulatedTime += duration;
  });

  return accumulatedTime;
}

/**
 * Play synthesized sound effects using Web Audio API
 */
export function playSound(type: 'star' | 'correct' | 'click' | 'gem' | 'pop' | 'fanfare' | 'note', freq: number = 440) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click' || type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'correct' || type === 'star') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, index) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(f, now + index * 0.08);
        noteGain.gain.setValueAtTime(0.2, now + index * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(now + index * 0.08);
        noteOsc.stop(now + index * 0.08 + 0.3);
      });
    } else if (type === 'gem') {
      const notes = [880, 1108.73, 1318.51, 1760];
      notes.forEach((f, index) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(f, now + index * 0.06);
        noteGain.gain.setValueAtTime(0.2, now + index * 0.06);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.25);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(now + index * 0.06);
        noteOsc.stop(now + index * 0.06 + 0.25);
      });
    } else if (type === 'note') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'fanfare') {
      const fanfareNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      fanfareNotes.forEach((f, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(f, now + idx * 0.1);
        noteGain.gain.setValueAtTime(0.25, now + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.start(now + idx * 0.1);
        noteOsc.stop(now + idx * 0.1 + 0.4);
      });
    }
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
}

// Global cached human-like voices array, client audio cache & active audio tracker
let availableVoices: SpeechSynthesisVoice[] = [];
let currentAiAudio: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();

export function stopSpeech() {
  if (currentAiAudio) {
    currentAiAudio.pause();
    currentAiAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function loadVoices() {
  if ('speechSynthesis' in window) {
    availableVoices = window.speechSynthesis.getVoices();
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Advanced Text to Speech powered by Gemini AI Speech Generation (/api/tts)
 * Includes zero-latency instant response for short words, numbers, and counts.
 */
export async function speakText(
  text: string, 
  onEnd?: () => void, 
  voice: string = 'Kore',
  options?: { fast?: boolean; forceNative?: boolean; rate?: number; voiceId?: string }
) {
  stopSpeech();

  const cleanedText = text.replace(/\//g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleanedText) {
    if (onEnd) onEnd();
    return;
  }

  // Only use native browser speech if explicitly requested by forceNative
  if (options?.forceNative) {
    fallbackSpeech(cleanedText, onEnd, options?.rate || 1.0);
    return;
  }

  const voiceId = options?.voiceId || (typeof localStorage !== 'undefined' && localStorage.getItem('elevenlabs_voice_id')) || 'EXAVITQu4vr4xnSDxMaL';
  const cacheKey = `${cleanedText.toLowerCase()}_${(voiceId || voice).toLowerCase()}`;

  // 1. Check client-side audio cache first for instant (<5ms) playback
  if (clientAudioCache.has(cacheKey)) {
    try {
      const audioUrl = clientAudioCache.get(cacheKey)!;
      const audio = new Audio(audioUrl);
      currentAiAudio = audio;

      audio.onended = () => {
        if (currentAiAudio === audio) currentAiAudio = null;
        if (onEnd) onEnd();
      };
      audio.onerror = (e) => {
        console.error("Cached AI TTS Audio element error:", e);
        if (currentAiAudio === audio) currentAiAudio = null;
        fallbackSpeech(cleanedText, onEnd, options?.rate || 1.0);
      };

      await audio.play();
      return;
    } catch (cacheErr) {
      console.warn("Error playing cached audio, re-fetching:", cacheErr);
    }
  }

  // 2. Fetch AI TTS from server (/api/tts) - PRIMARY METHOD
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanedText, voice, voiceId }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audio) {
        const audioMime = data.mimeType || 'audio/wav';
        const audioUrl = `data:${audioMime};base64,${data.audio}`;
        
        // Save to client audio cache for future instant re-plays
        clientAudioCache.set(cacheKey, audioUrl);

        const audio = new Audio(audioUrl);
        currentAiAudio = audio;

        audio.onended = () => {
          if (currentAiAudio === audio) currentAiAudio = null;
          if (onEnd) onEnd();
        };
        audio.onerror = (e) => {
          console.error("AI TTS Audio element error:", e);
          if (currentAiAudio === audio) currentAiAudio = null;
          fallbackSpeech(cleanedText, onEnd, options?.rate || 1.0);
        };

        await audio.play();
        return;
      }
    }
    console.warn(`Server TTS API responded but no audio data. Status: ${res.status}`);
  } catch (err) {
    console.warn("Server TTS API unavailable, attempting direct ElevenLabs...");
  }

  // 3. Direct ElevenLabs API Call (FALLBACK when server is unavailable)
  try {
    const elevenApiKey = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY;
    if (!elevenApiKey) {
      console.warn("No ElevenLabs API key configured in environment");
      throw new Error("Missing VITE_ELEVENLABS_API_KEY");
    }

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
        },
      }),
    });

    if (elevenRes.ok) {
      const blob = await elevenRes.blob();
      const audioUrl = URL.createObjectURL(blob);
      clientAudioCache.set(cacheKey, audioUrl);

      const audio = new Audio(audioUrl);
      currentAiAudio = audio;

      audio.onended = () => {
        if (currentAiAudio === audio) currentAiAudio = null;
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        if (currentAiAudio === audio) currentAiAudio = null;
        fallbackSpeech(cleanedText, onEnd, options?.rate || 1.0);
      };

      await audio.play();
      return;
    } else {
      console.warn(`ElevenLabs API error: ${elevenRes.status}`, await elevenRes.text());
    }
  } catch (clientElevenErr) {
    console.warn("Direct ElevenLabs call unavailable:", clientElevenErr);
  }

  // 4. Fallback to browser speech synthesis if all APIs are unreachable
  console.warn("All TTS APIs unavailable, using browser speech synthesis as fallback");
  fallbackSpeech(cleanedText, onEnd, options?.rate || 1.0);
}

function fallbackSpeech(cleanedText: string, onEnd?: () => void, rate: number = 1.0) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = rate; // Clear, natural pace
  utterance.pitch = 1.0; // Natural tone

  if (availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  // Prioritize human-like, natural high-clarity female voices
  const naturalVoice = availableVoices.find(v => 
    v.lang.startsWith('en') && (
      v.name.includes('Google US English') ||
      v.name.includes('Samantha') || 
      v.name.includes('Victoria') ||
      v.name.includes('Karen') ||
      v.name.includes('Natural') || 
      v.name.includes('Neural') ||
      v.name.includes('Premium')
    )
  ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];

  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Volume2, Mic, MicOff, Radio, Sparkles, MessageCircle } from 'lucide-react';
import { GUIDE_AVATAR_IMG } from '../data/flashcards';
import { speakText, playSound, stopSpeech } from '../utils/audio';

interface MayaAskModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: string;
}

export const MayaAskModal: React.FC<MayaAskModalProps> = ({
  isOpen,
  onClose,
  currentTopic = 'Word Garden'
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'live'>('live');
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState<string | null>(
    "Hi! I'm Maya! Ask me anything or switch to Live Voice Chat to talk directly to me!"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Gemini Live API State
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Ready to talk!');

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) {
      stopLiveSession();
      stopSpeech();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  const startLiveSession = async () => {
    try {
      setConnectionStatus('Connecting to Gemini Live API...');
      stopSpeech();

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = processor;

      source.connect(processor);
      processor.connect(inputCtx.destination);

      processor.onaudioprocess = (e) => {
        if (!ws || ws.readyState !== WebSocket.OPEN || isMuted) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const base64Audio = pcmFloat32ToBase64(inputData);
        if (base64Audio) {
          ws.send(JSON.stringify({ audio: base64Audio }));
        }
      };

      ws.onopen = () => {
        setIsLiveConnected(true);
        setConnectionStatus('Live with Maya! Say something...');
        setLiveTranscript('👋 Hello! I am listening to your voice!');
        playSound('star');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.interrupted) {
            if (outputAudioCtxRef.current) {
              nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
            }
          }
          if (data.audio && outputAudioCtxRef.current) {
            playPcm24kChunk(outputAudioCtxRef.current, data.audio, nextStartTimeRef);
          }
          if (data.text) {
            setLiveTranscript((prev) => (prev ? `${prev} ${data.text}` : data.text));
          }
        } catch (err) {
          console.error('Error handling WS msg:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setConnectionStatus('Connection error. Retrying...');
      };

      ws.onclose = () => {
        setIsLiveConnected(false);
        setConnectionStatus('Disconnected');
      };
    } catch (err: any) {
      console.error('Failed to start Live session:', err);
      setConnectionStatus(`Microphone error: ${err.message || 'Permission denied'}`);
      setIsLiveConnected(false);
    }
  };

  const stopLiveSession = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    setIsLiveConnected(false);
    setConnectionStatus('Ready to talk!');
  };

  const pcmFloat32ToBase64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const playPcm24kChunk = (
    ctx: AudioContext,
    base64Pcm: string,
    nextStartTimeRef: React.MutableRefObject<number>
  ) => {
    try {
      const binary = atob(base64Pcm);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
    } catch (err) {
      console.error('PCM 24k playback error:', err);
    }
  };

  if (!isOpen) return null;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    playSound('pop');
    setIsLoading(true);
    const userQ = question;
    setQuestion('');

    try {
      const res = await fetch('/api/ask-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQ, currentTopic })
      });
      const data = await res.json();
      const answer = data.reply || "That's a fantastic question! You are so smart!";
      setReply(answer);
      speakText(answer);
    } catch (err) {
      const fallback = "Apples grow on big sunny trees in gardens, and they are super yummy and healthy!";
      setReply(fallback);
      speakText(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-fade-in">
      <div className="bg-[#FFFDF5] border-8 border-indigo-400 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-3.5 flex items-center justify-between text-white border-b-4 border-indigo-300 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow shrink-0">
              <img
                src={GUIDE_AVATAR_IMG}
                alt="Maya"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-lg font-black font-sans leading-tight">Maya AI Buddy</h2>
              <p className="text-xs text-indigo-100 font-medium">Gemini Live Voice & Q&A</p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('pop');
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-indigo-100 p-1.5 border-b-2 border-indigo-200 shrink-0">
          <button
            onClick={() => {
              setActiveTab('live');
              playSound('click');
            }}
            className={`flex-1 py-2 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-indigo-800 hover:bg-indigo-200/60'
            }`}
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Gemini Live Voice API</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('text');
              playSound('click');
              stopLiveSession();
            }}
            className={`flex-1 py-2 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-indigo-800 hover:bg-indigo-200/60'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Text Question</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'live' ? (
            <div className="space-y-4 flex flex-col items-center">
              {/* Status Badge */}
              <div
                className={`px-4 py-2 rounded-full border-2 font-bold text-xs flex items-center gap-2 ${
                  isLiveConnected
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 animate-pulse'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isLiveConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                  }`}
                />
                <span>{connectionStatus}</span>
              </div>

              {/* Main Avatar / Visualizer Card */}
              <div className="bg-gradient-to-b from-indigo-50 to-purple-50 border-4 border-indigo-200 rounded-3xl p-6 w-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                <div className="relative mb-4">
                  <div
                    className={`w-28 h-28 rounded-full border-4 border-purple-400 overflow-hidden shadow-xl transition-transform ${
                      isLiveConnected ? 'scale-105 ring-8 ring-purple-300/50' : 'opacity-90'
                    }`}
                  >
                    <img
                      src={GUIDE_AVATAR_IMG}
                      alt="Maya Live"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {isLiveConnected && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-2 rounded-full border-2 border-white shadow animate-bounce">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full justify-center">
                  {!isLiveConnected ? (
                    <button
                      onClick={startLiveSession}
                      className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm md:text-base rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Mic className="w-5 h-5 animate-pulse" />
                      <span>Start Real-Time Voice Session</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center gap-2 transition-all shadow ${
                          isMuted
                            ? 'bg-rose-100 border-rose-400 text-rose-800'
                            : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                        }`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-600" />}
                        <span>{isMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
                      </button>

                      <button
                        onClick={stopLiveSession}
                        className="px-5 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm rounded-2xl shadow-lg transition-all active:scale-95"
                      >
                        End Call
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Live Transcript Box */}
              <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 w-full shadow-inner min-h-[90px] max-h-[140px] overflow-y-auto">
                <div className="text-[10px] uppercase font-black tracking-wider text-indigo-400 mb-1">
                  Gemini Live Transcript:
                </div>
                <p className="text-sm font-bold text-indigo-950 leading-relaxed font-sans">
                  {liveTranscript || 'Start session to begin speaking in real-time with Maya!'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 shadow-inner min-h-[110px] flex items-center gap-3">
                <div className="text-3xl shrink-0">💬</div>
                <p className="text-base font-bold text-indigo-950 font-sans leading-relaxed">
                  {isLoading ? 'Thinking of a super fun answer for you...' : reply}
                </p>
              </div>

              {reply && !isLoading && (
                <button
                  onClick={() => speakText(reply)}
                  className="flex items-center gap-2 text-indigo-700 font-bold text-xs md:text-sm bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-2xl transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Maya Voice (Gemini TTS)</span>
                </button>
              )}

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Why are apples red?', 'How do birds fly?', 'What is a lion?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuestion(q);
                    }}
                    className="text-xs font-bold text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-xl border border-purple-200 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleAsk} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask Maya a question..."
                  className="flex-1 bg-white border-2 border-indigo-200 rounded-2xl px-4 py-3 text-sm font-bold text-indigo-950 focus:outline-none focus:border-indigo-500 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl shadow-lg transition-transform active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

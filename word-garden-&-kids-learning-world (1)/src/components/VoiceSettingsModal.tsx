import React, { useState } from 'react';
import { X, Volume2, Check, Sparkles, Mic, Play, Music } from 'lucide-react';
import { speakText, playSound } from '../utils/audio';

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'female' | 'male';
  tag: string;
  description: string;
  avatar: string;
  color: string;
  sampleText: string;
}

export const ELEVEN_LABS_VOICES: VoiceOption[] = [
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella',
    gender: 'female',
    tag: 'Teacher Bella ⭐ (DEFAULT)',
    description: 'Energetic, playful, cheerful storyteller with bright tone - verified working with ElevenLabs!',
    avatar: '🦋',
    color: 'from-purple-500 to-pink-500',
    sampleText: "Once upon a time in Word Garden, magic happened! Let's learn and have fun together!"
  },
  {
    id: 'JBFqnCBsd6RMkjVDRZzb',
    name: 'George',
    gender: 'male',
    tag: 'Friendly Guide 🙋‍♂️',
    description: 'Gentle, clear, enthusiastic male mentor voice with warm personality',
    avatar: '🎩',
    color: 'from-blue-500 to-indigo-600',
    sampleText: "Welcome explorer! I'm George! Ready for a fun adventure?"
  }
];

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedVoiceId,
  onSelectVoice
}) => {
  const [testingVoiceId, setTestingVoiceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestVoice = (voice: VoiceOption) => {
    playSound('pop');
    setTestingVoiceId(voice.id);
    speakText(
      voice.sampleText,
      () => setTestingVoiceId(null),
      'Kore',
      { voiceId: voice.id }
    );
  };

  const handleChooseVoice = (voiceId: string) => {
    playSound('fanfare');
    onSelectVoice(voiceId);
    speakText("Voice updated successfully!", undefined, 'Kore', { voiceId });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="relative w-full max-w-xl bg-[#FFFDF5] border-4 sm:border-6 border-amber-300 rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-indigo-950 flex items-center gap-1.5">
                Choose Voice <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              </h2>
              <p className="text-xs font-bold text-amber-900">
                Select the teacher voice you like best!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 flex items-center justify-center shadow font-black transition-transform active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Cards Grid */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {ELEVEN_LABS_VOICES.map((voice) => {
            const isSelected = selectedVoiceId === voice.id;
            const isTesting = testingVoiceId === voice.id;

            return (
              <div
                key={voice.id}
                className={`relative p-3.5 rounded-2xl border-3 transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-purple-600 shadow-md ring-2 ring-purple-300 scale-[1.01]'
                    : 'bg-white border-amber-200 hover:border-amber-300 shadow-sm'
                }`}
              >
                {/* Voice Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${voice.color} text-white flex items-center justify-center text-2xl shadow-md shrink-0`}>
                    {voice.avatar}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-indigo-950">{voice.name}</h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300">
                        {voice.tag}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">
                      {voice.description}
                    </p>
                  </div>
                </div>

                {/* Actions: Test Voice & Select */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTestVoice(voice)}
                    disabled={isTesting}
                    className={`p-2.5 rounded-xl border-2 font-black text-xs flex items-center gap-1 shadow transition-transform active:scale-95 ${
                      isTesting
                        ? 'bg-purple-600 text-white animate-bounce border-purple-400'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                    }`}
                    title="Listen to sample audio"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Listen</span>
                  </button>

                  <button
                    onClick={() => handleChooseVoice(voice.id)}
                    className={`px-3 py-2 rounded-xl font-black text-xs flex items-center gap-1 shadow border-2 transition-transform active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-300'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Active</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-3 pt-2 border-t-2 border-amber-200 text-center">
          <p className="text-xs font-bold text-amber-900">
            ✨ Powered by ElevenLabs Hyper-Realistic AI Voice Engine
          </p>
        </div>
      </div>
    </div>
  );
};

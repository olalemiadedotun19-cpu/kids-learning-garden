import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Rocket, 
  Volume2, 
  ArrowRight,
  BookOpen,
  Music,
  Compass,
  Smile
} from 'lucide-react';
import { playSound, speakText, stopSpeech } from '../utils/audio';
import { GUIDE_AVATAR_IMG } from '../data/flashcards';

interface AdventureIntroScreenProps {
  playerName: string;
  onComplete: () => void;
}

export const AdventureIntroScreen: React.FC<AdventureIntroScreenProps> = ({
  playerName,
  onComplete,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Play upbeat intro sound
    playSound('fanfare');
    setIsSpeaking(true);
    speakText(
      `Welcome, ${playerName}! I'm Gigi! Are you ready for a magical learning adventure? Let's explore together!`,
      () => {
        setIsSpeaking(false);
      }
    );

    return () => {
      stopSpeech();
    };
  }, [playerName]);

  const handleStart = () => {
    stopSpeech();
    playSound('star');
    onComplete();
  };

  const handleReplayVoice = () => {
    setIsSpeaking(true);
    speakText(
      `Let's go explore the Word Garden, stories, and songs, ${playerName}! Tap the big button to begin!`,
      () => setIsSpeaking(false)
    );
  };

  const ADVENTURE_ZONES = [
    {
      icon: '🔤',
      title: 'Word Garden',
      subtitle: 'Phonics & Flashcards',
      bg: 'from-amber-400 to-orange-500',
      border: 'border-amber-300',
      glow: 'shadow-amber-500/30',
    },
    {
      icon: '📚',
      title: 'Story House',
      subtitle: 'Audio Fairy Tales',
      bg: 'from-purple-500 to-indigo-600',
      border: 'border-purple-300',
      glow: 'shadow-purple-500/30',
    },
    {
      icon: '🔢',
      title: 'Number Town',
      subtitle: 'Counting & Math',
      bg: 'from-emerald-400 to-teal-600',
      border: 'border-emerald-300',
      glow: 'shadow-emerald-500/30',
    },
    {
      icon: '🎵',
      title: 'Rhyme & Music',
      subtitle: 'Sing-along Melodies',
      bg: 'from-pink-500 to-rose-600',
      border: 'border-pink-300',
      glow: 'shadow-pink-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none">
      
      {/* Background Animated Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Stars */}
        <div className="absolute top-6 left-10 text-yellow-300 text-3xl sm:text-4xl animate-bounce" style={{ animationDuration: '2.5s' }}>⭐</div>
        <div className="absolute top-20 right-12 text-yellow-200 text-2xl sm:text-3xl animate-bounce" style={{ animationDuration: '3.2s' }}>✨</div>
        <div className="absolute bottom-16 left-8 text-amber-300 text-3xl sm:text-4xl animate-pulse">🌟</div>
        <div className="absolute bottom-24 right-14 text-yellow-300 text-3xl animate-bounce" style={{ animationDuration: '2.8s' }}>⭐</div>
        
        {/* Clouds */}
        <div className="absolute -top-6 left-1/4 text-white/20 text-8xl blur-[1px]">☁️</div>
        <div className="absolute top-1/3 -right-8 text-white/20 text-9xl blur-[1px]">☁️</div>
      </div>

      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 pt-1">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 text-white shadow-sm">
          <Compass className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-xs sm:text-sm font-black tracking-wide uppercase">Adventure Pass</span>
        </div>

        <button
          onClick={handleStart}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 text-xs sm:text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          <span>Jump In</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Center Stage (Constrained to fit without scrolling) */}
      <div className="w-full max-w-2xl z-10 flex flex-col items-center gap-3 sm:gap-4 my-auto py-2">
        
        {/* Gigi Mascot Card */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-5 border-4 border-amber-300 shadow-2xl w-full">
          
          {/* Avatar with Glow Ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-400 shadow-lg border-3 border-white overflow-hidden flex items-center justify-center">
              <img
                src={GUIDE_AVATAR_IMG}
                alt="Gigi"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            
            <button
              onClick={handleReplayVoice}
              className={`absolute -bottom-1 -right-1 p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md border-2 border-white hover:scale-110 active:scale-95 transition-all ${
                isSpeaking ? 'animate-bounce ring-4 ring-yellow-300' : ''
              }`}
              title="Hear Gigi speak"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Speech / Greeting */}
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[11px] font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-pink-500" />
              Your Fun Guide
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">{playerName}</span>! 🎉
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-600 mt-1">
              I'm <span className="text-purple-600 font-black">Gigi</span>! We're going to play games, collect stars, and learn exciting new words together!
            </p>
          </div>
        </div>

        {/* 4 Interactive Zone Preview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
          {ADVENTURE_ZONES.map((zone, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${zone.bg} rounded-2xl p-2.5 sm:p-3 border-2 ${zone.border} shadow-lg ${zone.glow} text-white flex flex-col items-center text-center transform hover:scale-105 transition-all cursor-default`}
            >
              <div className="text-2xl sm:text-3xl mb-1 filter drop-shadow">{zone.icon}</div>
              <div className="font-black text-xs sm:text-sm leading-snug">{zone.title}</div>
              <div className="text-[10px] text-white/90 font-medium leading-tight mt-0.5">{zone.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Big Start Button */}
        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:via-orange-400 hover:to-rose-400 text-white font-black text-lg sm:text-2xl shadow-xl shadow-orange-900/30 border-3 border-white flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all animate-pulse tracking-wide uppercase mt-1"
        >
          <Rocket className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          <span>Let's Start Learning!</span>
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </button>
      </div>

      {/* Footer info banner */}
      <div className="text-center text-white/80 text-[11px] sm:text-xs font-bold z-10 pb-1 flex items-center gap-1.5 justify-center">
        <Smile className="w-3.5 h-3.5 text-yellow-300" />
        <span>Safe, Ad-Free & Designed for Young Learners</span>
      </div>

    </div>
  );
};

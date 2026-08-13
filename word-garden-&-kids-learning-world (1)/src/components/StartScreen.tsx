import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Gem, 
  PlayCircle,
  ShieldCheck,
  Volume2,
  User
} from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import { GUIDE_AVATAR_IMG } from '../data/flashcards';

interface StartScreenProps {
  playerName: string;
  playerAvatar: string;
  onStart: (name: string, avatar: string) => void;
  stars: number;
  gems: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  playerName: initialName,
  playerAvatar: initialAvatar,
  onStart,
  stars,
  gems,
}) => {
  const [name, setName] = useState(initialName || '');
  const [showWelcome, setShowWelcome] = useState(true);

  // Play Gigi's welcoming greeting voice on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showWelcome) {
        speakText("Hello! I'm Gigi! I'm SO excited to meet you! Welcome to Word Garden! What is your name?");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  const handlePlayVoiceIntro = () => {
    playSound('pop');
    speakText(`Hi ${name || 'explorer'}! I'm Gigi! Let's have an AMAZING time together in Word Garden! This is going to be SO FUN!`);
  };

  const handleStartGame = () => {
    if (!name.trim()) {
      speakText("Please tell me your name first!");
      playSound('note', 200);
      return;
    }

    playSound('fanfare');
    const finalName = name.trim();
    
    // Save to localStorage
    localStorage.setItem('playerName', finalName);
    localStorage.setItem('playerAvatar', initialAvatar || 'bunny');
    
    speakText(`Wonderful, ${finalName}! Let's start our adventure in the Word Garden! Gigi is SO ready!`, () => {
      onStart(finalName, initialAvatar || 'bunny');
    });
    // Instant trigger if audio takes time
    setTimeout(() => {
      onStart(finalName, initialAvatar || 'bunny');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartGame();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-indigo-600 to-purple-900 flex flex-col items-center justify-center p-4 overflow-y-auto select-none">
      
      {/* Top Banner Stats */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl flex items-center justify-between px-4 shrink-0 gap-4">
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-full text-white font-bold text-xs sm:text-sm shadow">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>{stars}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-full text-white font-bold text-xs sm:text-sm shadow">
          <Gem className="w-4 h-4 text-purple-200 fill-purple-300" />
          <span>{gems}</span>
        </div>
      </div>

      {/* Center Simplified Welcome Card */}
      <div className="relative z-10 w-full max-w-sm bg-amber-50/95 border-4 sm:border-6 border-amber-300 rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-5">
        
        {/* TEACHER AVATAR - Simplified */}
        <div className="relative flex flex-col items-center -mt-6">
          <button 
            onClick={handlePlayVoiceIntro}
            className="relative group focus:outline-none transition-transform hover:scale-110 active:scale-95"
            title="Click to hear Gigi's super lively voice!"
          >
            {/* Glowing avatar ring */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-purple-400 via-pink-400 to-purple-500 shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
              <img
                src={GUIDE_AVATAR_IMG}
                alt="Teacher Bella"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Animated Waving Hand Badge */}
            <div className="absolute -bottom-2 -right-2 bg-amber-300 text-amber-950 border-3 border-white rounded-full p-2 shadow-lg text-3xl animate-bounce">
              👋
            </div>

            {/* Audio Voice Badge */}
            <div className="absolute top-0 right-0 bg-purple-600 text-white rounded-full p-2 border-2 border-white shadow-lg">
              <Volume2 className="w-4 h-4" />
            </div>
          </button>

          {/* Welcome Speech Bubble */}
          <div className="mt-4 bg-white border-3 border-purple-300 rounded-3xl px-5 py-3 shadow-lg max-w-sm">
            <p className="text-purple-900 font-black text-sm sm:text-base leading-snug">
              "Hi! I'm <span className="text-yellow-500 font-extrabold text-lg">Gigi</span>! 👋"
            </p>
            <p className="text-indigo-800 font-bold text-xs sm:text-sm mt-2">
              Super excited to learn with you! What's your name?
            </p>
          </div>
        </div>

        {/* NAME INPUT - Focused and Simple */}
        <div className="w-full bg-white border-3 border-purple-300 rounded-2xl p-4 shadow-inner">
          <label className="block text-purple-900 font-black text-sm mb-2 text-left flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" /> 
            <span>Your Name:</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your name..."
            className="w-full text-xl sm:text-2xl font-black text-purple-700 bg-gradient-to-r from-amber-50 to-pink-50 border-2 border-purple-400 rounded-xl px-4 py-3 text-center focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 transition-all"
            maxLength={20}
            autoFocus
          />
        </div>

        {/* START BUTTON - Simplified and Centered */}
        <button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:via-pink-500 hover:to-purple-600 border-3 border-amber-300 text-white font-black text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all transform flex items-center justify-center gap-3 tracking-wide uppercase"
        >
          <PlayCircle className="w-6 h-6 text-amber-300 fill-amber-400" />
          <span>Start Learning!</span>
        </button>

        {/* Encouraging Text */}
        <p className="text-purple-800 font-bold text-xs text-center">
          🌟 Click your name or press Enter to start!
        </p>
      </div>

      {/* Bottom Safe Badge */}
      <div className="absolute bottom-4 text-white/90 font-bold text-xs text-center flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>Safe, fun & interactive AI learning! ✨</span>
      </div>
    </div>
  );
};


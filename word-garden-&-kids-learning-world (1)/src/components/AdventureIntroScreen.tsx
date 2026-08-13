import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Sparkles, 
  Zap, 
  Heart, 
  Crown, 
  Flame,
  Play,
  Rocket,
  Wand2
} from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import { GUIDE_AVATAR_IMG } from '../data/flashcards';

interface AdventureIntroScreenProps {
  playerName: string;
  onComplete: () => void;
}

export const AdventureIntroScreen: React.FC<AdventureIntroScreenProps> = ({
  playerName,
  onComplete,
}) => {
  const [stage, setStage] = useState<'welcome' | 'journey' | 'ready'>('welcome');
  const [showConfetti, setShowConfetti] = useState(false);

  // Animate through stages
  useEffect(() => {
    // Welcome speech
    if (stage === 'welcome') {
      const timer = setTimeout(() => {
        playSound('fanfare');
        setShowConfetti(true);
        speakText(
          `Welcome, ${playerName}! You're about to embark on an amazing learning adventure in Word Garden!`,
          () => {
            setTimeout(() => setStage('journey'), 1000);
          }
        );
      }, 800);
      return () => clearTimeout(timer);
    }

    // Journey speech
    if (stage === 'journey') {
      const timer = setTimeout(() => {
        playSound('star');
        speakText(
          `You'll explore magical places, collect stars and gems, solve fun word puzzles, and learn amazing things with me, Teacher Bella!`,
          () => {
            setTimeout(() => setStage('ready'), 1500);
          }
        );
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [stage, playerName]);

  const handleStartAdventure = () => {
    playSound('fanfare');
    speakText(`Let's go, ${playerName}! Adventure awaits!`, () => {
      onComplete();
    });
    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-600 flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      
      {/* Animated stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute text-yellow-300 text-4xl ${
              showConfetti ? 'animate-bounce' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              opacity: showConfetti ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Floating clouds */}
      <div className="absolute top-10 left-10 text-white/40 text-6xl animate-pulse">☁️</div>
      <div className="absolute top-20 right-20 text-white/40 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>☁️</div>
      <div className="absolute bottom-20 right-10 text-white/40 text-7xl animate-pulse" style={{ animationDelay: '1s' }}>☁️</div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl text-center">
        
        {/* Teacher Avatar */}
        <div className="relative animate-bounce">
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-yellow-300 via-amber-300 to-yellow-400 shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
            <img
              src={GUIDE_AVATAR_IMG}
              alt="Teacher Bella"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div className="absolute -bottom-3 -right-3 text-5xl sm:text-6xl animate-spin" style={{ animationDuration: '3s' }}>
            ✨
          </div>
        </div>

        {/* Welcome Title */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-4 border-4 border-amber-300 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-2">
            Welcome, {playerName}! 🎉
          </h1>
          <p className="text-purple-800 font-bold text-lg sm:text-xl">
            You're ready for an epic learning adventure!
          </p>
        </div>

        {/* Adventure Info Cards */}
        {(stage === 'journey' || stage === 'ready') && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full animate-fadeIn">
            <div className="bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl p-4 border-3 border-amber-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-black text-amber-950 text-sm">Earn Stars</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-4 border-3 border-pink-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">💎</div>
              <p className="font-black text-pink-950 text-sm">Collect Gems</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-300 to-blue-400 rounded-2xl p-4 border-3 border-blue-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🧠</div>
              <p className="font-black text-blue-950 text-sm">Learn & Grow</p>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-emerald-400 rounded-2xl p-4 border-3 border-emerald-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🎮</div>
              <p className="font-black text-emerald-950 text-sm">Fun Games</p>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-rose-400 rounded-2xl p-4 border-3 border-rose-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-black text-rose-950 text-sm">Earn Rewards</p>
            </div>
            <div className="bg-gradient-to-br from-orange-300 to-amber-400 rounded-2xl p-4 border-3 border-orange-500 shadow-lg text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🌈</div>
              <p className="font-black text-orange-950 text-sm">Explore Magic</p>
            </div>
          </div>
        )}

        {/* Ready State - Start Button */}
        {stage === 'ready' && (
          <button
            onClick={handleStartAdventure}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 border-4 border-white text-white font-black text-2xl sm:text-3xl py-5 px-10 rounded-3xl shadow-2xl transform hover:scale-110 active:scale-95 transition-all animate-pulse flex items-center justify-center gap-3 tracking-widest uppercase"
          >
            <Rocket className="w-8 h-8 fill-white" />
            <span>Start Adventure!</span>
            <Sparkles className="w-8 h-8 fill-white" />
          </button>
        )}

        {/* Loading indicator for stages */}
        {stage !== 'ready' && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>

      {/* Bottom motivational text */}
      <div className="absolute bottom-6 text-white/90 font-bold text-center text-sm sm:text-base">
        <p>✨ Get ready to learn, play, and have tons of fun! ✨</p>
      </div>
    </div>
  );
};

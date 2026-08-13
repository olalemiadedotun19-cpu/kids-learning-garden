import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, Star } from 'lucide-react';
import { playSound } from '../utils/audio';
import mascotBunny from '../assets/images/mascot_bunny_1786587939185.jpg';

interface KidsLoadingScreenProps {
  onComplete?: () => void;
  message?: string;
}

const FUN_KIDS_FACTS = [
  "Did you know? Dolphins sleep with one eye open!",
  "Did you know? Honey never spoils — ever!",
  "Did you know? Bananas are botanical berries!",
  "Did you know? Octopuses have three hearts!",
  "Did you know? Butterflies taste food with their feet!",
  "Did you know? Owls can turn their heads almost all the way around!",
  "Did you know? Apples float because 25% of their volume is air!",
  "Did you know? Sea otters hold hands when they sleep!"
];

export const KidsLoadingScreen: React.FC<KidsLoadingScreenProps> = ({
  onComplete,
  message = "Getting your fun garden ready..."
}) => {
  const [progress, setProgress] = useState(10);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    // Random fact
    setFactIndex(Math.floor(Math.random() * FUN_KIDS_FACTS.length));

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      playSound('fanfare');
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-xl">
      
      {/* Background Floating Decorative Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Animated Bouncing Mascot Container */}
      <div className="relative mb-6">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/90 p-2 border-8 border-amber-300 shadow-2xl overflow-hidden animate-bounce flex items-center justify-center">
          <img 
            src={mascotBunny} 
            alt="Mascot Bunny" 
            className="w-full h-full object-cover rounded-full transform hover:scale-110 transition-transform"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 border-4 border-white text-3xl flex items-center justify-center shadow-xl animate-spin">
          <Sparkles className="w-8 h-8 text-amber-100 fill-amber-200" />
        </div>
      </div>

      {/* Message Header */}
      <h2 className="text-2xl md:text-4xl font-black text-white mb-2 drop-shadow-lg tracking-wide">
        {message}
      </h2>

      {/* Fun Kids Fact Box */}
      <div className="max-w-md bg-white/95 backdrop-blur-md border-4 border-amber-300 rounded-3xl p-5 shadow-2xl mb-8 transform hover:scale-105 transition-transform">
        <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" /> Fun Kid Fact
        </span>
        <p className="text-indigo-950 font-black text-base md:text-lg leading-snug">
          {FUN_KIDS_FACTS[factIndex]}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md bg-black/30 border-4 border-white/50 rounded-full h-9 overflow-hidden p-1 shadow-2xl relative backdrop-blur-md">
        <div 
          className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 h-full rounded-full transition-all duration-300 flex items-center justify-end pr-3 shadow-lg"
          style={{ width: `${progress}%` }}
        >
          <Star className="w-4 h-4 text-white fill-amber-200" />
        </div>
      </div>

      <p className="mt-4 text-amber-200 font-black text-base tracking-widest uppercase drop-shadow">
        {progress}% Loading Magic...
      </p>
    </div>
  );
};


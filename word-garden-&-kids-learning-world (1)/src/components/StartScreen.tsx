import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Gem, 
  Sparkles, 
  User, 
  Smile, 
  Heart, 
  PlayCircle, 
  Award, 
  ShieldCheck,
  Zap,
  Crown,
  Radio,
  Flame,
  Volume2
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

const AVATARS = [
  { id: 'bunny', name: 'Bunny Buddy', icon: <Smile className="w-5 h-5 text-pink-600" /> },
  { id: 'lion', name: 'Leo Lion', icon: <Crown className="w-5 h-5 text-amber-600" /> },
  { id: 'fox', name: 'Foxy Fox', icon: <Flame className="w-5 h-5 text-orange-600" /> },
  { id: 'unicorn', name: 'Sparkle Unicorn', icon: <Sparkles className="w-5 h-5 text-purple-600" /> },
  { id: 'astro', name: 'Astro Kid', icon: <Zap className="w-5 h-5 text-blue-600" /> },
  { id: 'panda', name: 'Panda Pal', icon: <Award className="w-5 h-5 text-emerald-600" /> },
  { id: 'bear', name: 'Teddy Bear', icon: <Heart className="w-5 h-5 text-rose-600" /> },
  { id: 'owl', name: 'Wise Owl', icon: <Radio className="w-5 h-5 text-indigo-600" /> },
];

const AGES = [
  { age: 3, label: '3 Yrs', desc: 'Toddler Explorer 🎈' },
  { age: 4, label: '4 Yrs', desc: 'Pre-K Star 🌟' },
  { age: 5, label: '5 Yrs', desc: 'Kindergarten 🚀' },
  { age: 6, label: '6 Yrs', desc: 'Early Reader 📚' },
  { age: 7, label: '7+ Yrs', desc: 'Super Scholar ⭐' }
];

export const StartScreen: React.FC<StartScreenProps> = ({
  playerName: initialName,
  playerAvatar: initialAvatar,
  onStart,
  stars,
  gems,
}) => {
  const [name, setName] = useState(initialName || 'Explorer');
  const [selectedAge, setSelectedAge] = useState<number>(4);
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar || 'bunny');
  const [isWaving, setIsWaving] = useState(true);

  // Play Maya's welcoming greeting voice on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      speakText("Hi there! I'm Maya, your teacher in Word Garden! Welcome! What is your name and how old are you?");
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectAvatar = (avatarId: string) => {
    playSound('pop');
    setSelectedAvatar(avatarId);
  };

  const handleSelectAge = (age: number) => {
    playSound('pop');
    setSelectedAge(age);
    speakText(`Awesome! ${age} years old!`);
  };

  const handlePlayVoiceIntro = () => {
    playSound('pop');
    setIsWaving(true);
    speakText(`Hi ${name || 'explorer'}! I'm Maya! Let's learn together in Word Garden!`);
  };

  const handleStartGame = () => {
    playSound('fanfare');
    const finalName = name.trim() || 'Explorer';
    speakText(`Wonderful, ${finalName}! Let's start our first lesson in the Word Garden!`, () => {
      onStart(finalName, selectedAvatar);
    });
    // Instant trigger if audio takes time
    setTimeout(() => {
      onStart(finalName, selectedAvatar);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-indigo-600 to-purple-900 flex flex-col items-center justify-between p-2 sm:p-4 overflow-y-auto select-none">
      
      {/* Top Banner Stats */}
      <div className="relative z-10 w-full max-w-3xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 rounded-full text-white font-bold text-xs sm:text-sm shadow">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>{stars} Stars</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 rounded-full text-white font-bold text-xs sm:text-sm shadow">
          <Gem className="w-4 h-4 text-purple-200 fill-purple-300" />
          <span>{gems} Gems</span>
        </div>
      </div>

      {/* Center Onboarding Card */}
      <div className="relative z-10 my-auto w-full max-w-xl bg-amber-50/95 border-4 sm:border-6 border-amber-300 rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-4 sm:p-6 text-center flex flex-col items-center gap-3 sm:gap-4 mt-8 sm:mt-10 mb-4">
        
        {/* MAYA POP-UP AVATAR WITH ANIMATED WAVE */}
        <div className="relative -mt-14 sm:-mt-16 flex flex-col items-center">
          <button 
            onClick={handlePlayVoiceIntro}
            className="relative group focus:outline-none transition-transform hover:scale-105 active:scale-95"
            title="Click to hear Maya greet you!"
          >
            {/* Glowing avatar ring */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 shadow-xl border-4 border-white flex items-center justify-center overflow-hidden">
              <img
                src={GUIDE_AVATAR_IMG}
                alt="Maya AI Teacher"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Animated Waving Hand Badge */}
            <div className="absolute -bottom-1 -right-1 bg-amber-300 text-amber-950 border-2 border-white rounded-full p-1.5 shadow-lg text-lg sm:text-2xl animate-bounce">
              👋
            </div>

            {/* Audio Voice Pulse Badge */}
            <div className="absolute top-0 right-0 bg-purple-600 text-white rounded-full p-1 border border-white shadow">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Teacher Maya Welcome Speech Bubble */}
          <div className="mt-2 bg-white border-2 border-indigo-200 rounded-2xl px-4 py-2 shadow-md max-w-sm">
            <p className="text-indigo-950 font-black text-xs sm:text-sm leading-snug">
              "Hi! I'm <span className="text-purple-700 font-extrabold">Teacher Maya</span>! 👋 Welcome to Word Garden! What is your name and age?"
            </p>
          </div>
        </div>

        {/* 1. Name Input */}
        <div className="w-full max-w-md bg-white border-3 border-indigo-200 rounded-2xl p-2.5 shadow-inner">
          <label className="block text-indigo-950 font-extrabold text-xs mb-1 text-left flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-purple-600" /> What is your name, explorer?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name here..."
            className="w-full text-lg sm:text-xl font-black text-purple-700 bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-1.5 text-center focus:outline-none focus:ring-4 focus:ring-purple-400"
            maxLength={15}
          />
        </div>

        {/* 2. Age Selector */}
        <div className="w-full max-w-md">
          <label className="block text-indigo-950 font-extrabold text-xs mb-1 text-left flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> How old are you?
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {AGES.map((ag) => (
              <button
                key={ag.age}
                onClick={() => handleSelectAge(ag.age)}
                className={`py-1.5 px-1 rounded-xl border-2 font-black text-xs transition-all flex flex-col items-center justify-center ${
                  selectedAge === ag.age
                    ? 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white border-amber-300 shadow-md scale-105'
                    : 'bg-white text-indigo-950 border-slate-200 hover:bg-amber-100'
                }`}
              >
                <span>{ag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Buddy Avatar Picker */}
        <div className="w-full max-w-md">
          <label className="block text-indigo-950 font-extrabold text-xs mb-1.5 text-left flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-purple-600" /> Choose your Buddy Avatar:
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => handleSelectAvatar(av.id)}
                className={`p-2 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                  selectedAvatar === av.id
                    ? 'bg-amber-300 border-purple-600 shadow-md scale-105 ring-2 ring-purple-300'
                    : 'bg-white border-slate-200 hover:bg-amber-100'
                }`}
                title={av.name}
              >
                {av.icon}
              </button>
            ))}
          </div>
        </div>

        {/* START LESSON BUTTON */}
        <button
          onClick={handleStartGame}
          className="w-full max-w-md bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-3 border-amber-300 text-white font-black text-xl sm:text-2xl py-3 px-6 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all transform flex items-center justify-center gap-2 tracking-wide uppercase mt-1"
        >
          <PlayCircle className="w-7 h-7 text-amber-300 fill-amber-400" />
          <span>START MY FIRST LESSON!</span>
          <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
        </button>

      </div>

      {/* Safe Badge */}
      <div className="relative z-10 text-white/80 font-bold text-xs text-center flex items-center justify-center gap-1">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>Safe, fun & interactive AI learning for kids!</span>
      </div>
    </div>
  );
};


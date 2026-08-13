import React, { useState } from 'react';
import { 
  Star, 
  Gem, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  User, 
  Smile, 
  Compass, 
  Heart, 
  PlayCircle, 
  Award, 
  ShieldCheck,
  Zap,
  Crown,
  Radio,
  Flame
} from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import appHeroLogo from '../assets/images/app_hero_logo_1786587912102.jpg';
import mascotBunny from '../assets/images/mascot_bunny_1786587939185.jpg';

interface StartScreenProps {
  playerName: string;
  playerAvatar: string;
  onStart: (name: string, avatar: string) => void;
  stars: number;
  gems: number;
}

const AVATARS = [
  { id: 'bunny', name: 'Bunny Buddy', icon: <Smile className="w-6 h-6 text-pink-600" /> },
  { id: 'lion', name: 'Leo Lion', icon: <Crown className="w-6 h-6 text-amber-600" /> },
  { id: 'fox', name: 'Foxy Fox', icon: <Flame className="w-6 h-6 text-orange-600" /> },
  { id: 'unicorn', name: 'Sparkle Unicorn', icon: <Sparkles className="w-6 h-6 text-purple-600" /> },
  { id: 'astro', name: 'Astro Kid', icon: <Zap className="w-6 h-6 text-blue-600" /> },
  { id: 'panda', name: 'Panda Pal', icon: <Award className="w-6 h-6 text-emerald-600" /> },
  { id: 'bear', name: 'Teddy Bear', icon: <Heart className="w-6 h-6 text-rose-600" /> },
  { id: 'owl', name: 'Wise Owl', icon: <Radio className="w-6 h-6 text-indigo-600" /> },
];

export const StartScreen: React.FC<StartScreenProps> = ({
  playerName: initialName,
  playerAvatar: initialAvatar,
  onStart,
  stars,
  gems,
}) => {
  const [name, setName] = useState(initialName || 'Explorer');
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar || 'bunny');
  const [claimedBonus, setClaimedBonus] = useState(false);
  const [bonusAnim, setBonusAnim] = useState(false);

  const handleSelectAvatar = (avatarId: string) => {
    playSound('pop');
    setSelectedAvatar(avatarId);
  };

  const handleClaimBonus = () => {
    if (claimedBonus) return;
    playSound('fanfare');
    speakText("Hooray! You got fifty free stars and ten gems!");
    setClaimedBonus(true);
    setBonusAnim(true);
    setTimeout(() => setBonusAnim(false), 1500);
  };

  const handleStartGame = () => {
    playSound('fanfare');
    speakText(`Welcome back, ${name}! Let's go on an adventure!`);
    onStart(name, selectedAvatar);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-800 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none">
      {/* Top Banner */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl text-white font-bold text-xs sm:text-base shadow">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>{stars + (claimedBonus ? 50 : 0)} Stars</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl text-white font-bold text-xs sm:text-base shadow">
          <Gem className="w-4 h-4 text-purple-200 fill-purple-300" />
          <span>{gems + (claimedBonus ? 10 : 0)} Gems</span>
        </div>
      </div>

      {/* Center Hero Card */}
      <div className="relative z-10 my-auto w-full max-w-2xl bg-amber-50/95 border-4 sm:border-8 border-amber-300 rounded-3xl sm:rounded-[3rem] shadow-2xl p-4 sm:p-8 text-center flex flex-col items-center gap-4 sm:gap-6 mt-12 sm:mt-16 mb-4">
        
        {/* 3D Hero Logo Banner */}
        <div className="relative -mt-14 sm:-mt-20 w-48 sm:w-72 h-24 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-4 sm:border-6 border-amber-300 shadow-xl bg-amber-100 transform hover:scale-105 transition-transform">
          <img 
            src={appHeroLogo} 
            alt="Word Garden Logo" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow">
            <img src={mascotBunny} alt="Bunny Mascot" className="w-full h-full object-cover" />
          </div>
          <p className="text-indigo-950 font-black text-xl md:text-2xl drop-shadow-sm flex items-center gap-1.5">
            Interactive Learning Adventure! <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          </p>
        </div>

        {/* Player Name Input */}
        <div className="w-full max-w-md bg-white border-4 border-indigo-200 rounded-2xl p-3 shadow-inner">
          <label className="block text-indigo-900 font-extrabold text-sm mb-1 text-left flex items-center gap-1.5">
            <User className="w-4 h-4 text-purple-600" /> What is your name, explorer?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name here..."
            className="w-full text-2xl font-black text-purple-700 bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-2 text-center focus:outline-none focus:ring-4 focus:ring-purple-400"
            maxLength={15}
          />
        </div>

        {/* Avatar Picker */}
        <div className="w-full">
          <p className="text-indigo-900 font-extrabold text-sm mb-3 flex items-center justify-center gap-1.5">
            <Smile className="w-4 h-4 text-purple-600" /> Choose your favorite Buddy Avatar:
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => handleSelectAvatar(av.id)}
                className={`p-3 rounded-2xl border-4 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                  selectedAvatar === av.id
                    ? 'bg-amber-300 border-purple-600 shadow-xl scale-110 ring-4 ring-purple-300'
                    : 'bg-white border-slate-200 hover:bg-amber-100'
                }`}
                title={av.name}
              >
                {av.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Bonus Claim Button */}
        {!claimedBonus ? (
          <button
            onClick={handleClaimBonus}
            className="w-full max-w-md bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 border-4 border-white text-white font-black text-lg py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 animate-pulse hover:scale-105 active:scale-95 transition-transform"
          >
            <Gift className="w-7 h-7 text-amber-200 fill-amber-300" />
            <span>Claim Daily Bonus Gift (+50 Stars & +10 Gems)!</span>
          </button>
        ) : (
          <div className="w-full max-w-md bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black py-2 px-4 rounded-2xl text-center shadow flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Daily Bonus Claimed! (+50 Stars & +10 Gems)</span>
          </div>
        )}

        {/* START GAME BUTTON */}
        <button
          onClick={handleStartGame}
          className="w-full max-w-md bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-4 border-amber-300 text-white font-black text-2xl md:text-3xl py-4 px-8 rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all transform flex items-center justify-center gap-3 tracking-wider uppercase mt-2"
        >
          <PlayCircle className="w-8 h-8 text-amber-300 fill-amber-400" />
          <span>START ADVENTURE!</span>
          <Sparkles className="w-7 h-7 text-amber-300 fill-amber-300" />
        </button>

      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-white/80 font-bold text-sm text-center flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>Created for young learners • Safe, fun & ad-free!</span>
      </div>
    </div>
  );
};

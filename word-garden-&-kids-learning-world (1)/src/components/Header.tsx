import React, { useState } from 'react';
import { Volume2, Sparkles, HelpCircle, Star, Gem, Home, Trophy, Smile, Sparkle } from 'lucide-react';
import { GUIDE_AVATAR_IMG } from '../data/flashcards';
import { speakText, playSound } from '../utils/audio';

interface HeaderProps {
  stars: number;
  gems: number;
  playerName?: string;
  playerAvatar?: string;
  onOpenRoom: () => void;
  onOpenAskMaya: () => void;
  onOpenStartScreen?: () => void;
  activeTabTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  gems,
  playerName = 'Explorer',
  playerAvatar = '🐰',
  onOpenRoom,
  onOpenAskMaya,
  onOpenStartScreen,
  activeTabTitle = 'Word Garden'
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayGreeting = () => {
    setIsPlayingAudio(true);
    playSound('pop');
    speakText(`Hello ${playerName}! Let's learn something new today!`, () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <header className="relative w-full flex items-center justify-between px-2 sm:px-4 py-1 sm:py-1.5 select-none z-20 shrink-0">
      {/* Left: Guide Avatar Maya & Speech Bubble */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <button
          onClick={onOpenAskMaya}
          title="Click to ask Maya a question!"
          className="relative group focus:outline-none transition-transform hover:scale-105 active:scale-95 shrink-0"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full p-0.5 sm:p-1 bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 shadow-md border-2 border-white flex items-center justify-center overflow-hidden">
            <img
              src={GUIDE_AVATAR_IMG}
              alt="Maya Guide"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-purple-600 text-white rounded-full p-0.5 sm:p-1 shadow border border-white text-[10px] sm:text-xs flex items-center justify-center animate-bounce">
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </button>

        {/* Speech Bubble & Live Voice API Badge */}
        <div className="hidden xs:flex relative bg-white/95 backdrop-blur-sm border-2 border-indigo-200 rounded-xl sm:rounded-2xl px-2.5 py-1 sm:px-3 sm:py-2 shadow-md max-w-[200px] sm:max-w-xs md:max-w-md items-center gap-2">
          {/* Bubble tail */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] sm:border-y-[8px] border-y-transparent border-r-[8px] sm:border-r-[10px] border-r-white/95" />

          <div className="flex items-center justify-between gap-1.5 w-full">
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs md:text-sm font-bold text-indigo-950 flex items-center gap-1 truncate">
                Hi {playerName}! <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400 inline shrink-0" />
              </p>
              <p className="text-[10px] sm:text-[11px] md:text-xs text-indigo-700 font-medium leading-tight truncate">
                Let's learn & play!
              </p>
            </div>

            {/* Live Voice Chat Quick Launcher */}
            <button
              onClick={onOpenAskMaya}
              className="px-2 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-[10px] sm:text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 animate-pulse"
              title="Talk in real-time with Maya using Gemini Live API"
            >
              <span>🎙️ Live Voice</span>
            </button>

            {/* Interactive Audio Waveform Button */}
            <button
              onClick={handlePlayGreeting}
              disabled={isPlayingAudio}
              className={`p-1 sm:p-1.5 rounded-lg transition-all shrink-0 ${
                isPlayingAudio
                  ? 'bg-purple-500 text-white animate-pulse shadow-inner'
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700 active:scale-95 shadow-sm'
              }`}
              title="Hear Maya speak"
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Center: Wood Wooden Sign Banner */}
      <div className="hidden lg:flex items-center justify-center relative my-0.5">
        <div className="relative px-4 sm:px-6 py-1 sm:py-1.5 rounded-2xl bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-2 sm:border-4 border-amber-600 shadow-lg flex items-center justify-center min-w-[160px] text-center">
          <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-amber-300 animate-pulse" />
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-300 animate-pulse delay-300" />
          
          <h1 className="text-base sm:text-lg md:text-xl font-black text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide font-sans">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Right: Stats Counter (Stars, Gems) & My Room */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        {/* Stars Counter */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl border-2 border-amber-300 shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 flex items-center justify-center shadow text-amber-900 font-bold text-xs">
            <Star className="w-3 h-3 text-amber-900 fill-amber-400" />
          </div>
          <span className="font-extrabold text-amber-900 text-xs sm:text-sm md:text-base">
            {stars}
          </span>
        </div>

        {/* Gems Counter */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl border-2 border-purple-300 shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center shadow text-white font-bold text-xs">
            <Gem className="w-3 h-3 text-white fill-purple-200" />
          </div>
          <span className="font-extrabold text-purple-900 text-xs sm:text-sm md:text-base">
            {gems}
          </span>
        </div>

        {/* My Room Button */}
        <button
          onClick={() => {
            playSound('pop');
            onOpenRoom();
          }}
          className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800 hover:from-purple-400 hover:to-purple-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl border-2 border-purple-300 shadow-md transition-all group"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-200 border border-white flex items-center justify-center text-indigo-900 group-hover:scale-110 transition-transform">
            <Trophy className="w-3 h-3 text-purple-900" />
          </div>
          <span className="hidden sm:inline font-sans drop-shadow-sm">Room</span>
        </button>

        {/* Start Screen Button */}
        {onOpenStartScreen && (
          <button
            onClick={() => {
              playSound('click');
              onOpenStartScreen();
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 active:scale-95 text-indigo-950 font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl border-2 border-white shadow-md transition-all"
            title="Go to Start Screen"
          >
            <Home className="w-3.5 h-3.5 text-indigo-950" />
            <span className="hidden sm:inline">Start</span>
          </button>
        )}
      </div>
    </header>
  );
};

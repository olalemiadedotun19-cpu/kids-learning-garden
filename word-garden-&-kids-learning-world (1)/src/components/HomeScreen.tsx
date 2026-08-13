import React, { useEffect, useState } from 'react';
import { NavTab } from '../types';
import { speakText, playSound } from '../utils/audio';
import { 
  Settings,
  Door,
  HelpCircle,
  Home
} from 'lucide-react';

interface HomeScreenProps {
  playerName: string;
  playerAvatar: string;
  stars: number;
  gems: number;
  onSelectTab: (tab: NavTab) => void;
  onOpenRoom: () => void;
  onOpenVoiceSettings: () => void;
  onOpenAskMaya: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  playerName,
  playerAvatar,
  stars,
  gems,
  onSelectTab,
  onOpenRoom,
  onOpenVoiceSettings,
  onOpenAskMaya,
}) => {
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    if (!hasSpoken) {
      const timer = setTimeout(() => {
        speakText(`Welcome back, ${playerName}! Ready to explore the Word Garden today?`);
        setHasSpoken(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [hasSpoken, playerName]);

  const handleSelectArea = (tab: NavTab) => {
    playSound('pop');
    onSelectTab(tab);
  };

  const handleOpenSettings = () => {
    playSound('pop');
    onOpenVoiceSettings();
  };

  const handleOpenRoom = () => {
    playSound('pop');
    onOpenRoom();
  };

  const handleOpenAskMaya = () => {
    playSound('pop');
    onOpenAskMaya();
  };

  const learningAreas = [
    { tab: 'word-garden' as NavTab, name: 'Word Garden', icon: '🌻', color: 'from-yellow-300 to-amber-400', description: 'Learn letters & words!' },
    { tab: 'story-house' as NavTab, name: 'Story House', icon: '📚', color: 'from-purple-300 to-pink-400', description: 'Explore magical stories!' },
    { tab: 'sentence-street' as NavTab, name: 'Sentence Street', icon: '✍️', color: 'from-indigo-300 to-purple-400', description: 'Build sentences!' },
    { tab: 'number-town' as NavTab, name: 'Number Town', icon: '🔢', color: 'from-cyan-300 to-blue-400', description: 'Count & calculate!' },
    { tab: 'brain-park' as NavTab, name: 'Brain Park', icon: '🧩', color: 'from-green-300 to-emerald-400', description: 'Solve puzzles!' },
    { tab: 'rhyme-time' as NavTab, name: 'Rhyme Time', icon: '🎵', color: 'from-pink-300 to-red-400', description: 'Discover rhymes!' },
    { tab: 'cocomelon-tv' as NavTab, name: 'CoComelon TV', icon: '🍉', color: 'from-orange-300 to-red-400', description: 'Watch & learn!' },
    { tab: 'music-room' as NavTab, name: 'Music Room', icon: '🎹', color: 'from-rose-300 to-pink-400', description: 'Make music!' },
    { tab: 'art-corner' as NavTab, name: 'Art Corner', icon: '🎨', color: 'from-fuchsia-300 to-purple-400', description: 'Create art!' },
  ];

  return (
    <div className="absolute inset-0 z-30 overflow-auto">
      {/* Home Screen Background */}
      <div className="min-h-[100dvh] w-full bg-gradient-to-b from-sky-300 via-emerald-100 to-yellow-100 p-4 sm:p-6 md:p-8">
        
        {/* Welcome Section */}
        <div className="max-w-6xl mx-auto">
          {/* Top Header Bar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 shadow-lg border-4 border-cyan-300">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-4xl sm:text-5xl">{playerAvatar}</div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Welcome, {playerName}! 🏠
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">Ready for today's learning adventure?</p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-3 sm:gap-4 justify-start flex-wrap">
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border-2 border-yellow-400 shadow-md">
                <div className="text-xs sm:text-sm font-bold text-yellow-900">⭐ Stars</div>
                <div className="text-xl sm:text-2xl font-black text-yellow-700">{stars}</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-200 to-cyan-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border-2 border-cyan-400 shadow-md">
                <div className="text-xs sm:text-sm font-bold text-cyan-900">💎 Gems</div>
                <div className="text-xl sm:text-2xl font-black text-cyan-700">{gems}</div>
              </div>
            </div>
          </div>

          {/* Main Content: Learning Areas Grid */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-center text-purple-900 mb-4 flex items-center justify-center gap-2">
              <Home className="w-8 h-8" />
              Explore Learning Areas
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {learningAreas.map((area) => (
                <button
                  key={area.tab}
                  onClick={() => handleSelectArea(area.tab)}
                  className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${area.color} border-4 border-white shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
                  
                  <div className="relative z-10 text-center">
                    <div className="text-5xl sm:text-6xl mb-2 inline-block transform group-hover:scale-110 transition-transform duration-200">
                      {area.icon}
                    </div>
                    <h3 className="font-black text-lg sm:text-xl text-white drop-shadow-lg mb-1">
                      {area.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-bold drop-shadow">
                      {area.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-center text-purple-900 mb-3 flex items-center justify-center gap-2">
              <Settings className="w-6 h-6" />
              Quick Settings
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* My Room Button */}
              <button
                onClick={handleOpenRoom}
                className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-indigo-300 to-purple-400 border-3 border-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 text-center">
                  <Door className="w-8 h-8 text-white drop-shadow-lg mx-auto mb-1" />
                  <p className="font-black text-white drop-shadow-lg text-sm">My Room 🏠</p>
                  <p className="text-xs text-white/90 font-bold">Shop & Decorate</p>
                </div>
              </button>

              {/* Voice Settings Button */}
              <button
                onClick={handleOpenSettings}
                className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-orange-300 to-red-400 border-3 border-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 text-center">
                  <Settings className="w-8 h-8 text-white drop-shadow-lg mx-auto mb-1" />
                  <p className="font-black text-white drop-shadow-lg text-sm">Voice Settings 🎤</p>
                  <p className="text-xs text-white/90 font-bold">Choose Teacher</p>
                </div>
              </button>

              {/* Ask Maya Button */}
              <button
                onClick={handleOpenAskMaya}
                className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-emerald-300 to-teal-400 border-3 border-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 text-center">
                  <HelpCircle className="w-8 h-8 text-white drop-shadow-lg mx-auto mb-1" />
                  <p className="font-black text-white drop-shadow-lg text-sm">Ask Maya 🤔</p>
                  <p className="text-xs text-white/90 font-bold">Get Help</p>
                </div>
              </button>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center py-4">
            <p className="text-sm sm:text-base text-purple-900 font-bold drop-shadow-lg">
              Click any area to start exploring! Have fun learning! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

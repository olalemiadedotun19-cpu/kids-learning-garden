import React from 'react';
import { NavTab } from '../types';
import { playSound } from '../utils/audio';
import { 
  Home, 
  BookOpen, 
  Type, 
  Calculator, 
  Brain, 
  Mic, 
  Palette, 
  Music,
  Tv
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

interface TabConfig {
  id: NavTab;
  label: string;
  icon: React.ReactNode;
  color: string;
  badgeBg: string;
}

const TABS: TabConfig[] = [
  {
    id: 'word-garden',
    label: 'Word Garden',
    icon: <Home className="w-5 h-5" />,
    color: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'story-house',
    label: 'Story House',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'sentence-street',
    label: 'Sentence Street',
    icon: <Type className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'number-town',
    label: 'Number Town',
    icon: <Calculator className="w-5 h-5" />,
    color: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-100 text-sky-700'
  },
  {
    id: 'brain-park',
    label: 'Brain Park',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'rhyme-time',
    label: 'Rhyme Time',
    icon: <Mic className="w-5 h-5" />,
    color: 'from-pink-500 to-purple-600',
    badgeBg: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'cocomelon-tv',
    label: 'CoComelon TV 🍉',
    icon: <Tv className="w-5 h-5 text-red-500" />,
    color: 'from-red-500 to-pink-600',
    badgeBg: 'bg-red-100 text-red-700'
  },
  {
    id: 'art-corner',
    label: 'Art Corner',
    icon: <Palette className="w-5 h-5" />,
    color: 'from-fuchsia-500 to-purple-600',
    badgeBg: 'bg-fuchsia-100 text-fuchsia-700'
  },
  {
    id: 'music-room',
    label: 'Music Room',
    icon: <Music className="w-5 h-5" />,
    color: 'from-violet-500 to-purple-700',
    badgeBg: 'bg-violet-100 text-violet-700'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="flex flex-row md:flex-col gap-1 sm:gap-1.5 md:gap-2 p-1 sm:p-1.5 md:p-2 bg-amber-100/90 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-amber-300 shadow-md select-none max-w-full overflow-x-auto md:overflow-visible shrink-0 scrollbar-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              playSound('click');
              onSelectTab(tab.id);
            }}
            className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-200 shrink-0 ${
              isActive
                ? `bg-gradient-to-r ${tab.color} text-white shadow-md border-2 border-amber-200 scale-102`
                : 'bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-200 hover:border-amber-300 shadow-sm'
            }`}
          >
            {/* Icon Circle */}
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-sm sm:text-base shrink-0 shadow-sm ${
                isActive ? 'bg-white/20 border border-white/30 text-white' : 'bg-amber-200/60'
              }`}
            >
              {tab.icon}
            </div>

            {/* Label */}
            <span className="font-extrabold tracking-wide whitespace-nowrap drop-shadow-sm">
              {tab.label}
            </span>

            {/* Right chevron or indicator for active tab */}
            {isActive && (
              <div className="hidden md:flex absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-200 rotate-45 border-r-2 border-t-2 border-amber-300 shadow-sm" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

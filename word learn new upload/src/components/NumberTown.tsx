import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakText, playSound } from '../utils/audio';

interface NumberTownProps {
  onEarnReward: (stars: number, gems: number) => void;
}

const ITEMS = ['🍎', '⭐', '🎈', '🦆', '🦋', '🌸', '🍪', '🚗'];

export const NumberTown: React.FC<NumberTownProps> = ({ onEarnReward }) => {
  const [currentNum, setCurrentNum] = useState(5);
  const [selectedEmoji, setSelectedEmoji] = useState('🍎');
  const [countedCount, setCountedCount] = useState(0);

  const handleSpeakNumber = () => {
    playSound('pop');
    speakText(`${currentNum}! Let's count ${currentNum} ${selectedEmoji}!`);
  };

  const handleTapItem = (index: number) => {
    playSound('note', 300 + index * 50);
    speakText(`${index + 1}`);
    setCountedCount(Math.max(countedCount, index + 1));

    if (index + 1 === currentNum) {
      playSound('fanfare');
      confetti({ particleCount: 50, spread: 50 });
      onEarnReward(5, 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-4xl mx-auto px-1 sm:px-3 py-1 select-none h-full min-h-0 overflow-y-auto">
      <div className="w-full bg-[#FFFDF5] border-4 sm:border-6 border-sky-400 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-xl p-3 sm:p-5 flex flex-col items-center gap-3 sm:gap-5 flex-1 min-h-0">
        {/* Number Selector Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => {
              playSound('click');
              setCurrentNum(Math.max(1, currentNum - 1));
              setCountedCount(0);
            }}
            className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-2xl flex items-center justify-center shadow"
          >
            -
          </button>

          <div className="text-center">
            <span className="text-7xl md:text-8xl font-black text-sky-600 font-sans tracking-tight drop-shadow">
              {currentNum}
            </span>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setCurrentNum(Math.min(20, currentNum + 1));
              setCountedCount(0);
            }}
            className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-2xl flex items-center justify-center shadow"
          >
            +
          </button>
        </div>

        {/* Emoji Object Selector */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full p-2 bg-sky-50 rounded-2xl border border-sky-200">
          {ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => {
                playSound('pop');
                setSelectedEmoji(item);
                setCountedCount(0);
              }}
              className={`text-2xl md:text-3xl p-2 rounded-xl transition-transform ${
                selectedEmoji === item ? 'bg-sky-300 scale-125 shadow-md' : 'hover:bg-sky-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Countable Grid */}
        <div className="w-full min-h-[220px] bg-sky-50/80 border-2 border-sky-200 rounded-3xl p-6 flex flex-wrap items-center justify-center gap-4 shadow-inner">
          {Array.from({ length: currentNum }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleTapItem(idx)}
              className={`text-4xl md:text-6xl p-3 rounded-2xl transition-all transform hover:scale-125 active:scale-95 ${
                idx < countedCount
                  ? 'bg-amber-300 shadow-lg border-2 border-amber-400 scale-105'
                  : 'bg-white shadow hover:bg-sky-100'
              }`}
            >
              {selectedEmoji}
            </button>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={handleSpeakNumber}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-lg shadow-lg"
        >
          <Volume2 className="w-6 h-6" />
          <span>Count Out Loud</span>
        </button>
      </div>
    </div>
  );
};

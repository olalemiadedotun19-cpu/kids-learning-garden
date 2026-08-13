import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakText, playSound } from '../utils/audio';

interface SentenceStreetProps {
  onEarnReward: (stars: number, gems: number) => void;
}

interface SentencePuzzle {
  id: string;
  targetSentence: string[];
  scrambledWords: string[];
  translation: string;
}

const PUZZLES: SentencePuzzle[] = [
  {
    id: 's1',
    targetSentence: ['The', 'red', 'apple', 'is', 'sweet'],
    scrambledWords: ['apple', 'is', 'The', 'sweet', 'red'],
    translation: 'The red apple is sweet!'
  },
  {
    id: 's2',
    targetSentence: ['A', 'happy', 'bunny', 'can', 'hop'],
    scrambledWords: ['can', 'bunny', 'A', 'hop', 'happy'],
    translation: 'A happy bunny can hop!'
  },
  {
    id: 's3',
    targetSentence: ['Cats', 'like', 'to', 'drink', 'milk'],
    scrambledWords: ['milk', 'Cats', 'drink', 'to', 'like'],
    translation: 'Cats like to drink milk!'
  }
];

export const SentenceStreet: React.FC<SentenceStreetProps> = ({ onEarnReward }) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const puzzle = PUZZLES[currentPuzzleIdx];
  const [constructed, setConstructed] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(puzzle.scrambledWords);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddWord = (word: string, index: number) => {
    playSound('pop');
    const newConstructed = [...constructed, word];
    const newAvailable = availableWords.filter((_, i) => i !== index);
    setConstructed(newConstructed);
    setAvailableWords(newAvailable);

    // Check if sentence is complete
    if (newAvailable.length === 0) {
      if (newConstructed.join(' ') === puzzle.targetSentence.join(' ')) {
        setIsSuccess(true);
        playSound('fanfare');
        confetti({ particleCount: 70, spread: 60 });
        speakText(puzzle.translation);
        onEarnReward(10, 2);
      } else {
        playSound('note', 200);
      }
    }
  };

  const handleRemoveWord = (word: string, index: number) => {
    playSound('pop');
    const newConstructed = constructed.filter((_, i) => i !== index);
    setConstructed(newConstructed);
    setAvailableWords([...availableWords, word]);
    setIsSuccess(false);
  };

  const handleReset = () => {
    playSound('click');
    setConstructed([]);
    setAvailableWords(puzzle.scrambledWords);
    setIsSuccess(false);
  };

  const handleNext = () => {
    playSound('click');
    const nextIdx = (currentPuzzleIdx + 1) % PUZZLES.length;
    setCurrentPuzzleIdx(nextIdx);
    setConstructed([]);
    setAvailableWords(PUZZLES[nextIdx].scrambledWords);
    setIsSuccess(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-4xl mx-auto px-1 sm:px-3 py-1 select-none h-full min-h-0 overflow-y-auto">
      <div className="w-full bg-[#FFFDF5] border-4 sm:border-6 border-emerald-400 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-xl p-3 sm:p-5 flex flex-col items-center gap-3 sm:gap-5 flex-1 min-h-0">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-emerald-950 font-sans text-center">
          Tap words to build the sentence! 🔤
        </h2>

        {/* Drop Zone */}
        <div className="w-full min-h-[70px] sm:min-h-[90px] bg-emerald-50 border-3 border-dashed border-emerald-300 rounded-2xl sm:rounded-3xl p-3 flex flex-wrap items-center justify-center gap-2 shadow-inner">
          {constructed.length === 0 ? (
            <p className="text-emerald-400 font-bold text-base md:text-lg">Tap words below to place them here...</p>
          ) : (
            constructed.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleRemoveWord(word, idx)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-rose-500 text-white font-black text-lg md:text-xl shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                {word}
              </button>
            ))
          )}
        </div>

        {/* Word Options */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-2">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleAddWord(word, idx)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 font-black text-lg md:text-2xl shadow-lg border-2 border-white transition-transform hover:scale-110 active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="animate-bounce bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 font-black text-lg shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <span>Great job building the sentence! +10 Stars ⭐</span>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => speakText(puzzle.translation)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg"
          >
            Next Sentence ➔
          </button>
        </div>
      </div>
    </div>
  );
};

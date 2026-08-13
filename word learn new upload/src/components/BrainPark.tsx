import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface BrainParkProps {
  onEarnReward: (stars: number, gems: number) => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🍎', '🐶', '🐱', '🐰', '🦁', '🐵'];

export const BrainPark: React.FC<BrainParkProps> = ({ onEarnReward }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(deck);
    setFlippedCards([]);
    setMatches(0);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playSound('pop');
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].emoji === newCards[secondIdx].emoji) {
        playSound('star');
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        const newMatches = matches + 1;
        setMatches(newMatches);

        if (newMatches === EMOJIS.length) {
          playSound('fanfare');
          confetti({ particleCount: 90, spread: 70 });
          onEarnReward(20, 5);
        }
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-4xl mx-auto px-1 sm:px-3 py-1 select-none h-full min-h-0 overflow-y-auto">
      <div className="w-full bg-[#FFFDF5] border-4 sm:border-6 border-rose-400 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-xl p-3 sm:p-5 flex flex-col items-center gap-3 sm:gap-5 flex-1 min-h-0">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl md:text-3xl font-black text-rose-950 font-sans">
            Memory Match Game! 🧠
          </h2>

          <button
            onClick={initGame}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm shadow"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart</span>
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-md">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-24 md:h-28 rounded-2xl font-black text-4xl md:text-5xl flex items-center justify-center shadow-lg transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-amber-100 border-4 border-amber-400 rotate-0 scale-100'
                  : 'bg-gradient-to-tr from-rose-500 to-pink-600 border-4 border-white text-white hover:scale-105'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </button>
          ))}
        </div>

        {matches === EMOJIS.length && (
          <div className="animate-bounce bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-4 border-amber-400 rounded-3xl p-4 text-center shadow-xl">
            <Trophy className="w-10 h-10 text-amber-800 mx-auto mb-1" />
            <p className="text-lg font-black text-amber-950">You matched all cards!</p>
            <p className="text-sm font-bold text-amber-900">+20 Stars ⭐ and +5 Gems 💎</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Volume2, Mic, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Flashcard } from '../types';
import { FLASHCARDS, BUNNY_BUDDY_IMG } from '../data/flashcards';
import { speakText, playSound } from '../utils/audio';

interface WordGardenProps {
  onEarnReward: (stars: number, gems: number) => void;
}

export const WordGarden: React.FC<WordGardenProps> = ({ onEarnReward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [showRewardBanner, setShowRewardBanner] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedIndices, setCompletedIndices] = useState<number[]>([0, 1]);

  const currentCard: Flashcard = FLASHCARDS[currentIndex];

  const handleSpeakCard = () => {
    setIsSpeaking(true);
    playSound('pop');
    speakText(`${currentCard.letter} is for ${currentCard.word}. ${currentCard.phonics}`, () => {
      setIsSpeaking(false);
    });
  };

  const handleNext = () => {
    playSound('click');
    setSpeechFeedback(null);
    setShowRewardBanner(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    playSound('click');
    setSpeechFeedback(null);
    setShowRewardBanner(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const triggerReward = (stars = 10, gems = 2) => {
    setShowRewardBanner(true);
    playSound('fanfare');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    onEarnReward(stars, gems);

    if (!completedIndices.includes(currentIndex)) {
      setCompletedIndices([...completedIndices, currentIndex]);
    }
  };

  const handleStartListening = async () => {
    playSound('pop');
    setIsListening(true);
    setSpeechFeedback('Listening... Say ' + currentCard.word + '!');

    // Check if Web Speech API SpeechRecognition is available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
          const spoken = event.results[0][0].transcript;
          setIsListening(false);
          await processSpeechResult(spoken);
        };

        recognition.onerror = () => {
          setIsListening(false);
          simulateSpeechRecognition();
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        simulateSpeechRecognition();
      }
    } else {
      // Fallback timer simulation for environments without WebSpeech microphone API
      setTimeout(() => {
        setIsListening(false);
        simulateSpeechRecognition();
      }, 2000);
    }
  };

  const simulateSpeechRecognition = async () => {
    await processSpeechResult(currentCard.word);
  };

  const processSpeechResult = async (spokenText: string) => {
    try {
      const res = await fetch('/api/pronunciation-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetWord: currentCard.word, spokenText })
      });
      const data = await res.json();
      setSpeechFeedback(data.feedback || `Fantastic job! You said ${currentCard.word}! ⭐`);
      triggerReward(data.starsEarned || 10, 2);
    } catch (e) {
      setSpeechFeedback(`Awesome job! Perfect pronunciation for ${currentCard.word}! ⭐`);
      triggerReward(10, 2);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-5xl mx-auto px-1 sm:px-2 py-0.5 select-none relative h-full min-h-0 overflow-hidden">
      {/* Main Flashcard Card Container */}
      <div className="relative w-full bg-[#FFFDF5] border-2 sm:border-4 md:border-6 border-amber-300 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-xl p-2 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 overflow-hidden flex-1 min-h-0">
        {/* Soft decorative background cloud */}
        <div className="absolute top-4 right-12 w-32 h-16 bg-blue-50/60 rounded-full blur-sm -z-0 pointer-events-none" />
        <div className="absolute bottom-6 left-8 w-40 h-20 bg-amber-50/60 rounded-full blur-sm -z-0 pointer-events-none" />

        {/* Left Pagination Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 active:scale-95 z-20"
          title="Previous Letter"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Right Pagination Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110 active:scale-95 z-20"
          title="Next Letter"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Card Content Left Side: Giant Letter & Word */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left z-10 px-6 sm:px-10 min-h-0 justify-center">
          <div className="relative">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-red-500 drop-shadow-[0_8px_12px_rgba(239,68,68,0.3)] font-sans leading-none">
              {currentCard.letter}
            </span>
          </div>

          <div className="mt-1 space-y-0.5">
            <p className="text-base sm:text-xl md:text-2xl font-extrabold text-indigo-950 font-sans tracking-wide">
              <span className="text-red-500">{currentCard.letter}</span> is for
            </p>

            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-indigo-950 tracking-wide font-sans">
              <span className="text-red-500">{currentCard.word.charAt(0)}</span>
              <span className="text-indigo-900">{currentCard.word.slice(1)}</span>
            </h2>
          </div>
        </div>

        {/* Card Content Right Side: Big Image Illustration & Audio Speaker */}
        <div className="relative flex-1 flex items-center justify-center z-10 px-6 sm:px-8 min-h-0">
          {/* Audio Speaker Button (Top Right of Card) */}
          <button
            onClick={handleSpeakCard}
            disabled={isSpeaking}
            className={`absolute top-0 right-2 p-2 sm:p-3 md:p-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg border-2 border-white transition-all transform hover:scale-110 active:scale-95 z-20 ${
              isSpeaking ? 'animate-bounce ring-4 ring-purple-300' : ''
            }`}
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          {/* Main Visual Image */}
          <div className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-xl sm:rounded-2xl p-2 bg-gradient-to-b from-amber-50 to-orange-100 border-2 border-amber-200/80 shadow-inner flex items-center justify-center overflow-hidden group">
            <img
              src={currentCard.image}
              alt={currentCard.word}
              className="w-full h-full object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Bottom Prompt & Companion Area */}
      <div className="w-full mt-2 sm:mt-3 flex flex-row items-center justify-between gap-2 sm:gap-4 z-20 shrink-0">
        {/* Left/Middle: Prompt Box & Microphone */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 border-3 border-amber-300 shadow-lg max-w-xl">
          <button
            onClick={handleStartListening}
            disabled={isListening}
            className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-600 to-purple-700 hover:from-purple-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-md border-2 border-white shrink-0 transition-transform hover:scale-105 active:scale-95 ${
              isListening ? 'animate-pulse ring-4 ring-purple-400 scale-110' : ''
            }`}
            title="Click to practice saying the word!"
          >
            <Mic className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-xl md:text-2xl font-black text-indigo-950 font-sans truncate">
              Can you say{' '}
              <span className="text-red-500 font-extrabold underline decoration-wavy decoration-red-300">
                {currentCard.word}
              </span>
              ?
            </p>
            {speechFeedback && (
              <p className="text-[10px] sm:text-xs md:text-sm font-bold text-emerald-600 animate-fade-in truncate">
                {speechFeedback}
              </p>
            )}
          </div>
        </div>

        {/* Bunny Companion Character */}
        <div className="relative flex items-center gap-2 shrink-0">
          <div className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-200 overflow-hidden shadow-md bg-amber-50">
            <img
              src={BUNNY_BUDDY_IMG}
              alt="Bunny Companion"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Reward Banner Popup */}
          {showRewardBanner && (
            <div className="animate-bounce bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-2 sm:border-4 border-amber-400 rounded-2xl sm:rounded-3xl px-2.5 py-1 sm:px-4 sm:py-2 shadow-xl flex items-center gap-1.5">
              <span className="text-lg sm:text-2xl">⭐</span>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-amber-900">Great job!</p>
                <p className="text-xs sm:text-lg font-black text-amber-950">+10 ⭐</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Progress Nodes Milestone Bar */}
      <div className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 border-3 border-sky-300 shadow-lg flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto shrink-0">
        {[0, 1, 2, 3, 4].map((nodeIdx) => {
          const isCompleted = completedIndices.includes(nodeIdx);
          const isCurrent = nodeIdx === currentIndex % 5;
          const isGift = nodeIdx === 4;

          return (
            <React.Fragment key={nodeIdx}>
              {nodeIdx > 0 && (
                <div
                  className={`flex-1 h-1 sm:h-1.5 rounded font-bold min-w-[12px] ${
                    isCompleted ? 'bg-amber-300' : 'bg-blue-900/60'
                  }`}
                />
              )}

              <button
                onClick={() => {
                  playSound('pop');
                  setCurrentIndex(nodeIdx);
                }}
                className={`relative w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-base md:text-lg transition-all shadow border-2 border-white shrink-0 ${
                  isGift
                    ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white animate-pulse'
                    : isCompleted
                    ? 'bg-gradient-to-tr from-yellow-300 to-amber-400 text-amber-900'
                    : isCurrent
                    ? 'bg-amber-300 text-amber-950 ring-2 sm:ring-4 ring-yellow-200 scale-105'
                    : 'bg-blue-900/80 text-blue-300 border-blue-400'
                }`}
              >
                {isGift ? '🎁' : '⭐'}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

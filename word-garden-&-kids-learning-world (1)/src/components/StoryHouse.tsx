import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { STORIES } from '../data/flashcards';
import { speakText, playSound } from '../utils/audio';

interface StoryHouseProps {
  onEarnReward: (stars: number, gems: number) => void;
}

export const StoryHouse: React.FC<StoryHouseProps> = ({ onEarnReward }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const currentStory = STORIES[selectedStoryIndex];
  const currentPage = currentStory.pages[pageIndex];

  const handleReadPage = () => {
    setIsReading(true);
    playSound('pop');
    speakText(currentPage.text, () => {
      setIsReading(false);
    });
  };

  const handleNextPage = () => {
    playSound('click');
    if (pageIndex < currentStory.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      playSound('fanfare');
      onEarnReward(15, 3);
      alert('🌟 You completed the story! You earned +15 Stars and +3 Gems!');
      setPageIndex(0);
    }
  };

  const handlePrevPage = () => {
    playSound('click');
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 select-none relative h-full min-h-0 overflow-y-auto">
      {/* Story Selector Header */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto w-full justify-start md:justify-center shrink-0 py-1 scrollbar-none px-1">
        {STORIES.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => {
              playSound('pop');
              setSelectedStoryIndex(idx);
              setPageIndex(0);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-base transition-all shrink-0 shadow-sm ${
              selectedStoryIndex === idx
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg border-2 border-white scale-105'
                : 'bg-white/90 hover:bg-white text-amber-950 border border-amber-300'
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            <span>{story.title}</span>
          </button>
        ))}
      </div>

      {/* Main Storybook Frame Container - Strictly Constrained with overflow-hidden */}
      <div className="relative w-full bg-[#FFFDF5] border-4 sm:border-8 border-amber-400 rounded-3xl sm:rounded-[3rem] shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 sm:gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Side: Storybook Illustration */}
        <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center shrink-0">
          <div className="relative w-full h-44 sm:h-60 md:h-72 lg:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl group">
            <img
              src={currentPage.image}
              alt={currentStory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-md border border-white">
              Page {pageIndex + 1} of {currentStory.pages.length}
            </div>
          </div>
        </div>

        {/* Right Side: Large Story Text & Controls */}
        <div className="flex-1 flex flex-col justify-between w-full gap-3 sm:gap-4 min-h-0 overflow-hidden">
          <div className="bg-amber-50/90 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-200/90 shadow-inner flex-1 min-h-0 overflow-y-auto">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-950 leading-relaxed font-sans tracking-wide">
              {currentPage.text.split(currentPage.highlightWord).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-amber-600 font-black underline decoration-wavy decoration-amber-400 px-2 bg-amber-200/70 rounded-xl">
                      {currentPage.highlightWord}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Action Bar: Read Aloud & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 shrink-0 pt-1">
            <button
              onClick={handleReadPage}
              disabled={isReading}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl border-2 border-white transition-transform active:scale-95 ${
                isReading ? 'animate-bounce ring-4 ring-purple-300' : ''
              }`}
            >
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{isReading ? 'Reading Story...' : 'Read Aloud'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pageIndex === 0}
                className="p-3 rounded-2xl bg-amber-200 hover:bg-amber-300 disabled:opacity-40 text-amber-950 font-black shadow-md border border-white transition-all active:scale-95"
                title="Previous Page"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={handleNextPage}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-sm sm:text-base shadow-xl border-2 border-white transition-all active:scale-95"
              >
                <span>{pageIndex < currentStory.pages.length - 1 ? 'Next Page' : 'Finish Story 🎉'}</span>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

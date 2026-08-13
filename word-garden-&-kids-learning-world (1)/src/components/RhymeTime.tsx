import React, { useState, useEffect } from 'react';
import { NURSERY_RHYMES } from '../data/rhymes';
import { NurseryRhyme } from '../types';
import { playSound, speakText, playNurseryRhymeMelody, stopNurseryRhymeMelody } from '../utils/audio';
import rhymeStageBg from '../assets/images/rhyme_stage_bg_1786587925137.jpg';
import { 
  Mic, 
  Music, 
  Star, 
  Sun, 
  Heart, 
  Smile, 
  ShieldCheck, 
  Cloud, 
  Bell, 
  Radio, 
  Crown, 
  Volume2, 
  Play, 
  Square, 
  Gift, 
  Trophy, 
  Sparkles, 
  CheckCircle2,
  Volume2 as VolumeIcon,
  VolumeX,
  Disc,
  BookOpen
} from 'lucide-react';

interface RhymeTimeProps {
  onEarnReward: (stars: number, gems: number) => void;
}

export const RhymeTime: React.FC<RhymeTimeProps> = ({ onEarnReward }) => {
  const [selectedRhyme, setSelectedRhyme] = useState<NurseryRhyme>(NURSERY_RHYMES[0]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [completedRhymes, setCompletedRhymes] = useState<string[]>([]);

  const [showVideoMode, setShowVideoMode] = useState<boolean>(false);

  // Reset playback when rhyme changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    stopNurseryRhymeMelody();
    setIsPlayingMusic(false);
    setIsPlayingVoice(false);
    setCurrentLineIndex(-1);
  }, [selectedRhyme]);

  const renderRhymeIcon = (iconKey: string, className = "w-6 h-6") => {
    switch (iconKey) {
      case 'music': return <Music className={className} />;
      case 'star': return <Star className={className} />;
      case 'bus': return <Radio className={className} />;
      case 'sun': return <Sun className={className} />;
      case 'heart': return <Heart className={className} />;
      case 'smile': return <Smile className={className} />;
      case 'shield': return <ShieldCheck className={className} />;
      case 'cloud': return <Cloud className={className} />;
      case 'bell': return <Bell className={className} />;
      case 'radio': return <Radio className={className} />;
      case 'mic': return <Mic className={className} />;
      case 'crown': return <Crown className={className} />;
      case 'volume': return <Volume2 className={className} />;
      default: return <Music className={className} />;
    }
  };

  const handleSelectRhyme = (rhyme: NurseryRhyme) => {
    playSound('pop');
    setSelectedRhyme(rhyme);
  };

  const handleStartMusic = () => {
    window.speechSynthesis?.cancel();
    stopNurseryRhymeMelody();
    setIsPlayingVoice(false);
    setIsPlayingMusic(true);
    setCurrentLineIndex(0);

    const totalLyrics = selectedRhyme.lyrics.length;

    // Play Web Audio multi-track melody
    const totalDurationSec = playNurseryRhymeMelody(selectedRhyme.id, (noteIndex, totalNotes) => {
      // Calculate active lyric line based on music progress
      const lineIdx = Math.min(Math.floor((noteIndex / totalNotes) * totalLyrics), totalLyrics - 1);
      setCurrentLineIndex(lineIdx);
    });

    // Handle end of song
    setTimeout(() => {
      setIsPlayingMusic(false);
      setCurrentLineIndex(-1);
      if (!completedRhymes.includes(selectedRhyme.id)) {
        setCompletedRhymes((prev) => [...prev, selectedRhyme.id]);
        onEarnReward(20, 5);
        playSound('fanfare');
        if ((window as any).confetti) {
          (window as any).confetti({ particleCount: 80, spread: 70 });
        }
      }
    }, totalDurationSec * 1000 + 500);
  };

  const speakLineSequentially = (index: number) => {
    if (index >= selectedRhyme.lyrics.length) {
      setIsPlayingVoice(false);
      setCurrentLineIndex(-1);
      if (!completedRhymes.includes(selectedRhyme.id)) {
        setCompletedRhymes((prev) => [...prev, selectedRhyme.id]);
        onEarnReward(20, 5);
        playSound('fanfare');
        speakText("Hooray! Great reading!");
        if ((window as any).confetti) {
          (window as any).confetti({ particleCount: 80, spread: 70 });
        }
      }
      return;
    }

    setCurrentLineIndex(index);
    speakText(selectedRhyme.lyrics[index], () => {
      setTimeout(() => {
        speakLineSequentially(index + 1);
      }, 400);
    });
  };

  const handleStartVoice = () => {
    stopNurseryRhymeMelody();
    setIsPlayingMusic(false);
    setIsPlayingVoice(true);
    speakLineSequentially(0);
  };

  const handleStopAll = () => {
    window.speechSynthesis?.cancel();
    stopNurseryRhymeMelody();
    setIsPlayingMusic(false);
    setIsPlayingVoice(false);
    setCurrentLineIndex(-1);
  };

  const handleSoundEffect = (effect: { iconKey: string; label: string; text: string }) => {
    playSound('pop');
    speakText(effect.text);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4 select-none pb-6 px-1 sm:px-3 h-full min-h-0 overflow-y-auto">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-3 sm:border-4 border-amber-300 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-amber-300 text-indigo-950 font-black flex items-center justify-center shadow-md animate-bounce shrink-0">
            <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-purple-900" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black drop-shadow-md flex items-center gap-2">
              Rhyme Time Jukebox <Music className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" />
            </h1>
            <p className="text-purple-100 font-extrabold text-xs sm:text-sm">
              Listen to full musical nursery rhymes, sing along, or read with natural human voice!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 font-extrabold text-xs sm:text-base shrink-0">
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>Completed: {completedRhymes.length} / {NURSERY_RHYMES.length}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 w-full max-w-full">
        
        {/* Left Column: Rhyme Selector Cards */}
        <div className="lg:col-span-4 flex flex-col gap-2.5 w-full min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-indigo-950 flex items-center gap-2 px-1">
            <Music className="w-5 h-5 text-purple-600 shrink-0" /> Choose a Nursery Rhyme:
          </h2>
          <div className="flex flex-col gap-2.5 max-h-[360px] sm:max-h-[440px] lg:max-h-[520px] overflow-y-auto overflow-x-hidden pr-1.5 w-full">
            {NURSERY_RHYMES.map((rhyme) => {
              const isSelected = rhyme.id === selectedRhyme.id;
              const isDone = completedRhymes.includes(rhyme.id);

              return (
                <button
                  key={rhyme.id}
                  onClick={() => handleSelectRhyme(rhyme)}
                  className={`w-full shrink-0 p-3 sm:p-3.5 rounded-2xl border-3 sm:border-4 text-left transition-all flex items-center justify-between shadow-md overflow-hidden ${
                    isSelected
                      ? 'bg-amber-300 border-purple-600 ring-2 sm:ring-4 ring-purple-300 text-indigo-950 scale-[1.01]'
                      : 'bg-white border-indigo-100 hover:border-amber-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="p-2 sm:p-2.5 bg-amber-100 rounded-xl sm:rounded-2xl shadow-inner border border-amber-200 text-purple-900 shrink-0">
                      {renderRhymeIcon(rhyme.iconKey, "w-5 h-5 sm:w-6 sm:h-6")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-sm sm:text-base leading-snug truncate">{rhyme.title}</h3>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-500 truncate">
                        {rhyme.lyrics.length} Verses • Musical Melody
                      </p>
                    </div>
                  </div>
                  {isDone && (
                    <span className="bg-emerald-500 text-white font-black text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow flex items-center gap-1 shrink-0 ml-1">
                      <Star className="w-3 h-3 fill-white" /> Done
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stage & Audio Player */}
        <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4 w-full min-w-0">
          
          <div className={`w-full rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border-4 sm:border-6 md:border-8 border-amber-300 p-3 sm:p-5 md:p-6 shadow-2xl bg-gradient-to-br ${selectedRhyme.bgGradient} text-white relative overflow-hidden flex flex-col justify-between`}>
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img src={rhymeStageBg} alt="Stage Backdrop" className="w-full h-full object-cover" />
            </div>

            {/* Header / Title */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-5 border-b border-white/20 pb-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 shrink-0">
                  {renderRhymeIcon(selectedRhyme.iconKey, "w-6 h-6 sm:w-8 sm:h-8 text-amber-300")}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black drop-shadow truncate">{selectedRhyme.title}</h2>
                  <p className="text-white/90 font-extrabold text-xs sm:text-sm truncate">Select Music Mode or Voice Reading!</p>
                </div>
              </div>

              {/* Play / Stop / Video Control Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    handleStopAll();
                    setShowVideoMode(!showVideoMode);
                  }}
                  className={`flex-1 sm:flex-initial text-white font-black text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-2 border-white flex items-center justify-center gap-2 ${
                    showVideoMode ? 'bg-red-600 ring-2 ring-amber-300' : 'bg-red-500 hover:bg-red-400'
                  }`}
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{showVideoMode ? '📖 Hide Video' : '📺 Watch Real Song Video'}</span>
                </button>

                {!isPlayingMusic && !isPlayingVoice ? (
                  <>
                    <button
                      onClick={() => {
                        setShowVideoMode(false);
                        handleStartMusic();
                      }}
                      className="flex-1 sm:flex-initial bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-2 border-white flex items-center justify-center gap-2"
                    >
                      <Disc className="w-5 h-5 text-indigo-950 fill-amber-300 animate-spin" />
                      <span>Play Music Song</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowVideoMode(false);
                        handleStartVoice();
                      }}
                      className="flex-1 sm:flex-initial bg-purple-500 hover:bg-purple-400 text-white font-black text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-2 border-white flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-5 h-5 text-white" />
                      <span>Read Lyrics</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleStopAll}
                    className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-black text-sm sm:text-base px-6 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-2 border-white flex items-center justify-center gap-2 animate-pulse"
                  >
                    <Square className="w-5 h-5 fill-white" /> Stop Audio
                  </button>
                )}
              </div>
            </div>

            {/* Stage Body: Video Mode vs Karaoke Lyrics Display */}
            {showVideoMode && selectedRhyme.youtubeId ? (
              <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl bg-black border-4 border-amber-300 shadow-2xl overflow-hidden aspect-video">
                <iframe
                  key={selectedRhyme.youtubeId}
                  src={`https://www.youtube.com/embed/${selectedRhyme.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  title={selectedRhyme.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-white/30 w-full max-w-full min-h-[160px] sm:min-h-[220px] max-h-[260px] sm:max-h-[300px] flex flex-col justify-start gap-2 overflow-y-auto overflow-x-hidden">
                {selectedRhyme.lyrics.map((line, idx) => {
                  const isCurrent = idx === currentLineIndex;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        playSound('pop');
                        speakText(line);
                        setCurrentLineIndex(idx);
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer font-black text-xs sm:text-base md:text-lg flex items-center gap-2 sm:gap-3 w-full shrink-0 ${
                        isCurrent
                          ? 'bg-amber-300 text-indigo-950 shadow-lg border-2 border-white animate-pulse'
                          : 'hover:bg-white/10 text-white/90'
                      }`}
                    >
                      <div className="shrink-0">
                        {isCurrent ? (
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-950 fill-amber-400 shrink-0" />
                        ) : (
                          <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 shrink-0" />
                        )}
                      </div>
                      <span className="break-words min-w-0 flex-1">{line}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Interactive Soundboard Buttons */}
            <div className="relative z-10 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20">
              <p className="font-extrabold text-xs sm:text-sm mb-2 sm:mb-3 text-amber-200 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-300" /> Sound Effects Soundboard:
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedRhyme.soundEffects.map((effect, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSoundEffect(effect)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/40 text-white font-extrabold py-2 px-3.5 rounded-2xl shadow flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform text-xs sm:text-sm min-h-[44px]"
                  >
                    {renderRhymeIcon(effect.iconKey, "w-4 h-4 text-amber-200")}
                    <span>{effect.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Reward Footer Callout */}
          <div className="bg-amber-50 border-4 border-amber-300 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between text-indigo-950 font-black shadow-lg gap-3">
            <div className="flex items-center gap-3">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 fill-amber-300 shrink-0" />
              <div>
                <p className="text-xs sm:text-base leading-snug">Listen or read all verses to earn +20 Stars & +5 Gems!</p>
                <p className="text-[11px] sm:text-xs text-indigo-700 font-bold">You can sing or read as many times as you like!</p>
              </div>
            </div>
            <button
              onClick={() => {
                onEarnReward(20, 5);
                playSound('fanfare');
                speakText("Good job!");
                if ((window as any).confetti) {
                  (window as any).confetti({ particleCount: 50 });
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow hover:scale-105 active:scale-95 transition-transform whitespace-nowrap min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> Claim Star Bonus
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

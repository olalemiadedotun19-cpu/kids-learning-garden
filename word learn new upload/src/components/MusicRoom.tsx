import React, { useState } from 'react';
import { Play, Music, Sparkles, Volume2, Star, Trophy, Disc, Award } from 'lucide-react';
import { playSound } from '../utils/audio';

interface MusicRoomProps {
  onEarnReward: (stars: number, gems: number) => void;
}

interface Note {
  key: string;
  noteName: string;
  freq: number;
  color: string;
}

const XYLOPHONE_NOTES: Note[] = [
  { key: 'C4', noteName: 'Do', freq: 261.63, color: 'bg-red-500 border-red-600' },
  { key: 'D4', noteName: 'Re', freq: 293.66, color: 'bg-orange-500 border-orange-600' },
  { key: 'E4', noteName: 'Mi', freq: 329.63, color: 'bg-yellow-400 border-yellow-500' },
  { key: 'F4', noteName: 'Fa', freq: 349.23, color: 'bg-green-500 border-green-600' },
  { key: 'G4', noteName: 'Sol', freq: 392.00, color: 'bg-teal-500 border-teal-600' },
  { key: 'A4', noteName: 'La', freq: 440.00, color: 'bg-blue-500 border-blue-600' },
  { key: 'B4', noteName: 'Ti', freq: 493.88, color: 'bg-indigo-500 border-indigo-600' },
  { key: 'C5', noteName: 'Do', freq: 523.25, color: 'bg-purple-500 border-purple-600' }
];

interface SongSheet {
  id: string;
  title: string;
  badge: string;
  sequence: number[]; // index in XYLOPHONE_NOTES
  tempoMs: number;
}

const DEMO_SONGS: SongSheet[] = [
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star',
    badge: 'Classic Star Tune',
    sequence: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0, 4, 4, 3, 3, 2, 2, 1, 4, 4, 3, 3, 2, 2, 1, 0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
    tempoMs: 340
  },
  {
    id: 'mary-lamb',
    title: 'Mary Had a Little Lamb',
    badge: 'Fleece White as Snow',
    sequence: [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 2, 4, 4, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0],
    tempoMs: 350
  },
  {
    id: 'row-boat',
    title: 'Row, Row, Row Your Boat',
    badge: 'Gentle River Tune',
    sequence: [0, 0, 0, 1, 2, 2, 1, 2, 3, 4, 7, 7, 7, 4, 4, 4, 2, 2, 2, 0, 0, 0, 4, 3, 2, 1, 0],
    tempoMs: 320
  },
  {
    id: 'abc-song',
    title: 'The Alphabet Song',
    badge: 'A to Z Music',
    sequence: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0, 4, 4, 3, 3, 2, 2, 1, 4, 4, 3, 3, 2, 2, 1],
    tempoMs: 360
  },
  {
    id: 'london-bridge',
    title: 'London Bridge Is Falling Down',
    badge: 'Royal Bridge Rhyme',
    sequence: [4, 5, 4, 3, 2, 3, 4, 1, 2, 3, 2, 3, 4, 4, 5, 4, 3, 2, 3, 4, 1, 4, 2, 0],
    tempoMs: 330
  }
];

export const MusicRoom: React.FC<MusicRoomProps> = ({ onEarnReward }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [completedSongs, setCompletedSongs] = useState<string[]>([]);

  const handlePlayKey = (note: Note) => {
    setActiveKey(note.key);
    playSound('note', note.freq);
    setTimeout(() => setActiveKey(null), 200);
  };

  const handlePlaySongDemo = (song: SongSheet) => {
    if (playingSongId) return;
    setPlayingSongId(song.id);
    playSound('fanfare');

    song.sequence.forEach((noteIdx, idx) => {
      setTimeout(() => {
        handlePlayKey(XYLOPHONE_NOTES[noteIdx]);
      }, idx * song.tempoMs);
    });

    const totalDuration = song.sequence.length * song.tempoMs + 300;
    setTimeout(() => {
      setPlayingSongId(null);
      if (!completedSongs.includes(song.id)) {
        setCompletedSongs((prev) => [...prev, song.id]);
        onEarnReward(15, 3);
        if ((window as any).confetti) {
          (window as any).confetti({ particleCount: 60 });
        }
      }
    }, totalDuration);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-5xl mx-auto px-1 sm:px-3 py-1 select-none pb-6 h-full min-h-0 overflow-y-auto">
      
      {/* Container */}
      <div className="w-full bg-[#FFFDF5] border-4 sm:border-6 border-violet-400 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-xl p-3 sm:p-5 flex flex-col items-center gap-3 sm:gap-5 flex-1 min-h-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 border-b-2 border-violet-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-100 rounded-2xl text-violet-900 border border-violet-300">
              <Music className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-violet-950 font-sans">
                Kids Interactive Xylophone Pad
              </h2>
              <p className="text-xs md:text-sm font-bold text-violet-700">
                Play keys manually or listen to complete nursery rhyme song sheets!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-2 rounded-2xl text-amber-950 font-black text-sm shadow">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Mastered: {completedSongs.length} / {DEMO_SONGS.length} Songs</span>
          </div>
        </div>

        {/* Xylophone Instrument */}
        <div className="w-full bg-amber-100/90 border-4 border-amber-300 rounded-3xl p-6 shadow-inner flex items-end justify-center gap-2 md:gap-3 overflow-x-auto min-h-[260px]">
          {XYLOPHONE_NOTES.map((note, idx) => {
            const heightPercent = 100 - idx * 6; // Stepped bar heights

            return (
              <button
                key={note.key}
                onClick={() => handlePlayKey(note)}
                style={{ height: `${heightPercent}%`, minHeight: '190px' }}
                className={`w-12 md:w-16 rounded-2xl ${note.color} border-b-8 text-white font-black text-lg md:text-xl flex flex-col items-center justify-between py-4 shadow-xl transition-all duration-150 transform hover:scale-105 active:scale-95 ${
                  activeKey === note.key ? 'ring-4 ring-amber-300 scale-95 shadow-inner' : ''
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-white/40 border border-white/60 shadow-inner" />
                <span>{note.noteName}</span>
                <div className="w-3 h-3 rounded-full bg-white/40 border border-white/60 shadow-inner" />
              </button>
            );
          })}
        </div>

        {/* Nursery Rhymes Song Sheets */}
        <div className="w-full flex flex-col gap-3 pt-2">
          <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
            <Disc className="w-5 h-5 text-purple-600" /> Play Nursery Rhymes Song Sheets:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DEMO_SONGS.map((song) => {
              const isPlayingThis = playingSongId === song.id;
              const isDone = completedSongs.includes(song.id);

              return (
                <div
                  key={song.id}
                  className={`p-4 rounded-3xl border-4 flex flex-col justify-between gap-3 shadow-md transition-all ${
                    isPlayingThis
                      ? 'bg-amber-200 border-purple-600 ring-4 ring-purple-300 animate-pulse'
                      : 'bg-white border-violet-100 hover:border-amber-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        {song.badge}
                      </span>
                      {isDone && (
                        <span className="bg-emerald-500 text-white font-black text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" /> Done
                        </span>
                      )}
                    </div>
                    <h4 className="font-black text-indigo-950 text-base leading-tight">{song.title}</h4>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {song.sequence.length} Notes melody sequence
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlaySongDemo(song)}
                    disabled={playingSongId !== null}
                    className={`w-full py-2.5 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-transform shadow ${
                      isPlayingThis
                        ? 'bg-purple-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white active:scale-95'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isPlayingThis ? 'Playing Song...' : 'Play Tune (+15 Stars)'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

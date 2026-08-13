import React, { useState, useMemo } from 'react';
import { Tv, Play, Sparkles, Star, Film, CheckCircle2, Search, X, Music, SkipForward, RotateCcw, ListMusic, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface CocomelonVideo {
  id: string;
  title: string;
  category: 'CoComelon Hits' | 'Nursery Rhymes' | 'Bedtime' | 'Dance & Play';
  youtubeId: string;
  thumbnail: string;
  duration: string;
  starsReward: number;
}

const COCOMELON_VIDEOS: CocomelonVideo[] = [
  {
    id: 'coco-1',
    title: 'Wheels on the Bus - CoComelon Nursery Rhymes & Kids Songs',
    category: 'CoComelon Hits',
    youtubeId: 'e_04ZrNroTo',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    duration: '3:45',
    starsReward: 10
  },
  {
    id: 'coco-2',
    title: 'Bath Song - CoComelon Official Kids Video',
    category: 'CoComelon Hits',
    youtubeId: 'WRVsOCh907o',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    duration: '2:40',
    starsReward: 10
  },
  {
    id: 'coco-3',
    title: 'Yes Yes Vegetables Song - CoComelon Healthy Habits',
    category: 'CoComelon Hits',
    youtubeId: '08Qf26pU24U',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    duration: '3:15',
    starsReward: 10
  },
  {
    id: 'coco-4',
    title: 'Baby Shark Song - CoComelon Dance & Sing',
    category: 'Dance & Play',
    youtubeId: 'XqZsoesa55w',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    duration: '2:10',
    starsReward: 10
  },
  {
    id: 'coco-5',
    title: 'ABC Song & Phonics Song - CoComelon Alphabet Learning',
    category: 'CoComelon Hits',
    youtubeId: 'ezmsrB69760',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    duration: '3:30',
    starsReward: 10
  },
  {
    id: 'coco-6',
    title: 'Twinkle Twinkle Little Star - Bedtime Lullaby',
    category: 'Bedtime',
    youtubeId: 'yCjJyiqpAuU',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    duration: '3:15',
    starsReward: 10
  },
  {
    id: 'coco-7',
    title: 'Old MacDonald Had A Farm - Animal Sounds',
    category: 'Nursery Rhymes',
    youtubeId: '_6HzoUre3h8',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    duration: '3:10',
    starsReward: 10
  },
  {
    id: 'coco-8',
    title: 'Itsy Bitsy Spider - Kids Rhymes',
    category: 'Nursery Rhymes',
    youtubeId: 'w_lCi8U49mY',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    duration: '2:50',
    starsReward: 10
  },
  {
    id: 'coco-9',
    title: 'If You\'re Happy and You Know It - Dance & Clap',
    category: 'Dance & Play',
    youtubeId: '71hqRT9U0wg',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    duration: '2:40',
    starsReward: 10
  },
  {
    id: 'coco-10',
    title: 'Baa Baa Black Sheep - CoComelon',
    category: 'Nursery Rhymes',
    youtubeId: '39InxW5X4G8',
    thumbnail: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80',
    duration: '3:05',
    starsReward: 10
  },
  {
    id: 'coco-11',
    title: 'Sick Song - CoComelon Caring & Boo-Boo Song',
    category: 'CoComelon Hits',
    youtubeId: '433X90_n8pU',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    duration: '3:20',
    starsReward: 10
  },
  {
    id: 'coco-12',
    title: 'Clean Up Song - CoComelon Helping Hands',
    category: 'CoComelon Hits',
    youtubeId: 'v1p1S5vThA4',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    duration: '2:45',
    starsReward: 10
  },
  {
    id: 'coco-13',
    title: 'Head Shoulders Knees & Toes - Exercise Song',
    category: 'Dance & Play',
    youtubeId: 'QA48wTGbU7A',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    duration: '2:30',
    starsReward: 10
  },
  {
    id: 'coco-14',
    title: 'Five Little Monkeys Jumping on the Bed',
    category: 'Nursery Rhymes',
    youtubeId: 'b0NHrFNZWh0',
    thumbnail: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
    duration: '3:00',
    starsReward: 10
  },
  {
    id: 'coco-15',
    title: 'Row Row Row Your Boat - Water Adventure',
    category: 'Nursery Rhymes',
    youtubeId: '7otAJa3jui8',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    duration: '2:55',
    starsReward: 10
  }
];

interface CocomelonTVProps {
  onEarnReward: (stars: number, gems: number) => void;
}

export const CocomelonTV: React.FC<CocomelonTVProps> = ({ onEarnReward }) => {
  const [activeVideo, setActiveVideo] = useState<CocomelonVideo>(COCOMELON_VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const categories = ['All', 'CoComelon Hits', 'Nursery Rhymes', 'Dance & Play', 'Bedtime', 'Favorites'];

  // Filter logic based on search input and selected category
  const filteredVideos = useMemo(() => {
    return COCOMELON_VIDEOS.filter((video) => {
      const matchesSearch = searchQuery.trim() === '' || 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Favorites') return favoriteIds.includes(video.id);
      return video.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory, favoriteIds]);

  const handleSelectVideo = (video: CocomelonVideo) => {
    playSound('pop');
    setActiveVideo(video);

    if (!watchedVideoIds.includes(video.id)) {
      setWatchedVideoIds(prev => [...prev, video.id]);
      setShowCelebration(true);
      playSound('fanfare');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      onEarnReward(video.starsReward, 2);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleNextSong = () => {
    const currentIndex = COCOMELON_VIDEOS.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % COCOMELON_VIDEOS.length;
    handleSelectVideo(COCOMELON_VIDEOS[nextIndex]);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playSound('pop');
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4 p-2 sm:p-4 pb-6 select-none h-full min-h-0 overflow-y-auto">
      
      {/* Search & Header Bar */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-white shadow-xl border-2 sm:border-4 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
        
        {/* Title Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-300 rounded-xl flex items-center justify-center text-red-600 shadow border-2 border-white transform -rotate-3 shrink-0">
            <Tv className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight drop-shadow-md flex items-center gap-1.5">
              CoComelon Music TV 🍉
            </h1>
            <p className="text-[11px] sm:text-xs text-red-100 font-medium hidden sm:block">
              Pick your music, search songs & play nursery rhymes!
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 max-w-md w-full">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-amber-700 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search music e.g. Bath Song, Wheels on Bus..."
              className="w-full pl-9 pr-8 py-2 bg-white/95 backdrop-blur-md rounded-full text-xs sm:text-sm font-extrabold text-amber-950 placeholder:text-amber-700/60 border-2 border-amber-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full hover:bg-amber-100 text-amber-700"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Stats Counter */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 font-extrabold text-xs shrink-0">
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Watched: {watchedVideoIds.length} / {COCOMELON_VIDEOS.length}</span>
        </div>
      </div>

      {/* Main Theater Arrangement (Player + Music Picker Playlist) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start flex-1 min-h-0">
        
        {/* Left Column (8 cols on lg): Video Player & Stage */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-2 sm:gap-3 bg-amber-100/90 border-3 sm:border-4 border-amber-300 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-xl shrink-0">
          
          {/* Main Frame Player Screen */}
          <div className="relative w-full rounded-xl sm:rounded-2xl bg-black border-2 sm:border-4 border-slate-800 shadow-xl overflow-hidden aspect-video flex items-center justify-center">
            <iframe
              key={activeVideo.youtubeId}
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {showCelebration && (
              <div className="absolute top-3 right-3 bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-1.5 rounded-full border border-white shadow-lg animate-bounce flex items-center gap-1.5 z-20">
                <Star className="w-4 h-4 fill-amber-300 text-amber-900" /> +10 Stars Earned! 🎉
              </div>
            )}
          </div>

          {/* Now Playing Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-3 rounded-xl sm:rounded-2xl border border-amber-200 shadow-sm">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-red-100 text-red-700 font-extrabold text-[10px] sm:text-xs rounded-full border border-red-200">
                  NOW PLAYING • {activeVideo.category}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-700">Duration: {activeVideo.duration}</span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-amber-950 truncate">
                {activeVideo.title}
              </h2>
            </div>

            {/* Quick Play Control Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  playSound('pop');
                  handleSelectVideo(activeVideo);
                }}
                className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
                title="Replay Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextSong}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                title="Play Next Song"
              >
                <span>Next</span>
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  confetti({ particleCount: 50, spread: 50 });
                }}
                className="px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 font-extrabold rounded-xl border border-amber-300 shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" /> Clap!
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols on lg): Song Picker & Music Playlist */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2.5 bg-amber-50/90 border-2 sm:border-3 border-amber-300 rounded-2xl sm:rounded-3xl p-3 shadow-lg h-full min-h-0">
          
          {/* Playlist Header & Categories */}
          <div className="flex flex-col gap-2 shrink-0 border-b border-amber-200 pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                <ListMusic className="w-4 h-4 text-red-500" />
                Pick Music ({filteredVideos.length})
              </h2>
              <span className="text-[11px] font-bold text-amber-700">
                Tap to play
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playSound('click');
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded-xl font-extrabold text-[11px] whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-red-500 text-white border-amber-300 shadow-sm scale-102'
                      : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Result or Music Song List */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[50vh] lg:max-h-[56vh] pr-1">
            {filteredVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4 bg-white/60 rounded-2xl border border-dashed border-amber-300">
                <Music className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                <p className="text-xs font-bold text-amber-900">No songs found matching "{searchQuery}"</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-2 px-3 py-1 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow hover:bg-amber-600"
                >
                  Show All Music
                </button>
              </div>
            ) : (
              filteredVideos.map((video) => {
                const isSelected = activeVideo.id === video.id;
                const isWatched = watchedVideoIds.includes(video.id);
                const isFav = favoriteIds.includes(video.id);

                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectVideo(video);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className={`w-full group flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isSelected
                        ? 'bg-red-50 border-red-500 shadow-md scale-[1.01]'
                        : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-sm'
                    }`}
                  >
                    {/* Song Thumbnail */}
                    <div className="relative w-16 h-12 rounded-lg bg-amber-100 overflow-hidden shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-red-500 text-white' : 'bg-white/90 text-red-600'
                        }`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[8px] font-bold px-1 rounded">
                        {video.duration}
                      </span>
                    </div>

                    {/* Song Title & Meta */}
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-xs font-extrabold leading-snug truncate ${
                        isSelected ? 'text-red-600' : 'text-amber-950'
                      }`}>
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-semibold text-amber-700">
                          {video.category}
                        </span>
                        {isWatched && (
                          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Watched
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, video.id)}
                      className={`p-1.5 rounded-full transition-colors shrink-0 focus:outline-none ${
                        isFav ? 'text-rose-500 fill-rose-500' : 'text-amber-300 hover:text-rose-400'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


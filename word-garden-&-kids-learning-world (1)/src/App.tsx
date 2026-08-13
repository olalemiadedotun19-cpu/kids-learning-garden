import React, { useState } from 'react';
import { NavTab, UserStats, ShopItem } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WordGarden } from './components/WordGarden';
import { StoryHouse } from './components/StoryHouse';
import { SentenceStreet } from './components/SentenceStreet';
import { NumberTown } from './components/NumberTown';
import { BrainPark } from './components/BrainPark';
import { RhymeTime } from './components/RhymeTime';
import { CocomelonTV } from './components/CocomelonTV';
import { ArtCorner } from './components/ArtCorner';
import { MusicRoom } from './components/MusicRoom';
import { MyRoomModal } from './components/MyRoomModal';
import { MayaAskModal } from './components/MayaAskModal';
import { StartScreen } from './components/StartScreen';
import { KidsLoadingScreen } from './components/KidsLoadingScreen';
import { playSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('word-garden');
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isAskMayaOpen, setIsAskMayaOpen] = useState(false);

  // Kids experience flow states
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Getting your fun garden ready...');

  const [stats, setStats] = useState<UserStats>({
    playerName: 'Explorer',
    playerAvatar: '🐰',
    stars: 125,
    gems: 30,
    completedCards: ['A', 'B'],
    unlockedItems: [],
    equippedHat: '',
    equippedSticker: '',
    roomBg: 'garden',
    dailyBonusClaimed: false,
    soundEnabled: true,
  });

  const handleStartFromScreen = (name: string, avatar: string) => {
    setStats((prev) => ({
      ...prev,
      playerName: name,
      playerAvatar: avatar,
    }));
    setShowStartScreen(false);
    setLoadingMessage(`Welcome ${name}! Preparing the Word Garden...`);
    setIsLoading(true);
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === activeTab) return;
    setLoadingMessage(`Loading ${getTabTitle(tab)}...`);
    setIsLoading(true);
    setActiveTab(tab);
  };

  const handleEarnReward = (starsToEarn: number, gemsToEarn: number) => {
    setStats((prev) => ({
      ...prev,
      stars: prev.stars + starsToEarn,
      gems: prev.gems + gemsToEarn
    }));
  };

  const handleBuyItem = (item: ShopItem) => {
    if (item.currency === 'stars' && stats.stars >= item.price) {
      playSound('fanfare');
      setStats((prev) => ({
        ...prev,
        stars: prev.stars - item.price,
        unlockedItems: [...(prev.unlockedItems || []), item.id]
      }));
    } else if (item.currency === 'gems' && stats.gems >= item.price) {
      playSound('fanfare');
      setStats((prev) => ({
        ...prev,
        gems: prev.gems - item.price,
        unlockedItems: [...(prev.unlockedItems || []), item.id]
      }));
    } else {
      playSound('note', 200);
      alert(`You need more ${item.currency} to buy ${item.name}! Keep learning to earn more! ⭐`);
    }
  };

  const handleEquipItem = (item: ShopItem) => {
    playSound('pop');
    setStats((prev) => ({
      ...prev,
      equippedHat: item.category === 'hat' ? (prev.equippedHat === item.icon ? '' : item.icon) : prev.equippedHat,
      equippedSticker: item.category === 'sticker' ? (prev.equippedSticker === item.icon ? '' : item.icon) : prev.equippedSticker
    }));
  };

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'word-garden': return 'Word Garden';
      case 'story-house': return 'Story House';
      case 'sentence-street': return 'Sentence Street';
      case 'number-town': return 'Number Town';
      case 'brain-park': return 'Brain Park';
      case 'rhyme-time': return 'Rhyme Time';
      case 'cocomelon-tv': return 'CoComelon TV 🍉';
      case 'art-corner': return 'Art Corner';
      case 'music-room': return 'Music Room';
      default: return 'Word Garden';
    }
  };

  const getTabBackgroundImage = (tab: NavTab) => {
    switch (tab) {
      case 'word-garden':
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80'; // Lush flower garden
      case 'story-house':
        return 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1920&q=80'; // Fairytale garden park
      case 'sentence-street':
        return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80'; // Storybook village street
      case 'number-town':
        return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80'; // Rolling green hills
      case 'brain-park':
        return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80'; // Enchanted forest garden
      case 'rhyme-time':
        return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'; // Sunny rainbow garden
      case 'cocomelon-tv':
      case 'music-room':
        return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80'; // Garden stage
      case 'art-corner':
        return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80'; // Creative colorful studio
      default:
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80';
    }
  };

  return (
    <div className="relative h-[100dvh] max-h-[100dvh] w-full bg-slate-900 flex flex-col font-sans overflow-hidden selection:bg-amber-200 justify-between select-none">
      
      {/* 1. START ADVENTURE SCREEN */}
      {showStartScreen && (
        <StartScreen
          playerName={stats.playerName}
          playerAvatar={stats.playerAvatar}
          onStart={handleStartFromScreen}
          stars={stats.stars}
          gems={stats.gems}
        />
      )}

      {/* 2. KIDS FUN LOADING OVERLAY */}
      {isLoading && (
        <KidsLoadingScreen
          message={loadingMessage}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Dynamic Full-Bleed Garden Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={activeTab}
          src={getTabBackgroundImage(activeTab)}
          alt="Scenic Garden Background"
          className="w-full h-full object-cover transition-all duration-700 opacity-55 scale-105 filter brightness-105 contrast-105"
        />
        {/* Soft vibrant gradient overlay for UI legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/40 via-emerald-300/30 to-amber-200/40 backdrop-blur-[1px]" />

        {/* Soft floating clouds */}
        <div className="absolute top-6 left-10 w-48 h-16 bg-white/60 rounded-full blur-sm" />
        <div className="absolute top-12 right-20 w-64 h-20 bg-white/50 rounded-full blur-sm" />

        {/* Picket fence overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-emerald-500/20 backdrop-blur-[1px] border-t-4 border-emerald-400/30 flex items-end justify-around">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-4 h-14 bg-white/30 border-x border-white/50 rounded-t-lg shadow-sm" />
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto p-1 sm:p-2 md:p-3 overflow-hidden min-h-0">
        {/* Top Navigation Header */}
        <Header
          stars={stats.stars}
          gems={stats.gems}
          playerName={stats.playerName}
          playerAvatar={stats.playerAvatar}
          onOpenRoom={() => setIsRoomOpen(true)}
          onOpenAskMaya={() => setIsAskMayaOpen(true)}
          onOpenStartScreen={() => setShowStartScreen(true)}
          activeTabTitle={getTabTitle(activeTab)}
        />

        {/* Main Body Area: Left Sidebar + Center View */}
        <main className="flex-1 flex flex-col md:flex-row gap-1.5 sm:gap-2.5 md:gap-3 mt-1 sm:mt-1.5 items-stretch overflow-hidden min-h-0">
          {/* Left Sidebar Menu */}
          <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

          {/* Center Dynamic Screen View */}
          <div className="flex-1 w-full h-full min-h-0 flex items-center justify-center overflow-hidden">
            {activeTab === 'word-garden' && <WordGarden onEarnReward={handleEarnReward} />}
            {activeTab === 'story-house' && <StoryHouse onEarnReward={handleEarnReward} />}
            {activeTab === 'sentence-street' && <SentenceStreet onEarnReward={handleEarnReward} />}
            {activeTab === 'number-town' && <NumberTown onEarnReward={handleEarnReward} />}
            {activeTab === 'brain-park' && <BrainPark onEarnReward={handleEarnReward} />}
            {activeTab === 'rhyme-time' && <RhymeTime onEarnReward={handleEarnReward} />}
            {activeTab === 'cocomelon-tv' && <CocomelonTV onEarnReward={handleEarnReward} />}
            {activeTab === 'art-corner' && <ArtCorner onEarnReward={handleEarnReward} />}
            {activeTab === 'music-room' && <MusicRoom onEarnReward={handleEarnReward} />}
          </div>
        </main>
      </div>

      {/* Modals */}
      <MyRoomModal
        isOpen={isRoomOpen}
        onClose={() => setIsRoomOpen(false)}
        stats={stats}
        onBuyItem={handleBuyItem}
        onEquipItem={handleEquipItem}
      />

      <MayaAskModal
        isOpen={isAskMayaOpen}
        onClose={() => setIsAskMayaOpen(false)}
        currentTopic={getTabTitle(activeTab)}
      />
    </div>
  );
}

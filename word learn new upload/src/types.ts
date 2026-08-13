export type NavTab = 
  | 'word-garden' 
  | 'story-house' 
  | 'sentence-street' 
  | 'number-town' 
  | 'brain-park' 
  | 'rhyme-time'
  | 'cocomelon-tv'
  | 'art-corner' 
  | 'music-room';

export interface Flashcard {
  letter: string;
  word: string;
  phonics: string;
  image: string;
  color: string;
  exampleSentence: string;
  category: string;
}

export interface UserStats {
  playerName: string;
  playerAvatar: string;
  stars: number;
  gems: number;
  completedCards: string[]; // e.g. ['A', 'B']
  unlockedItems: string[];
  equippedHat: string;
  equippedSticker: string;
  roomBg: string;
  dailyBonusClaimed: boolean;
  soundEnabled: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  currency: 'stars' | 'gems';
  category: 'hat' | 'sticker' | 'wallpaper';
  icon: string;
  image: string;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  highlightWord: string;
  image: string;
}

export interface Story {
  id: string;
  title: string;
  coverImage: string;
  pages: StoryPage[];
}

export interface NurseryRhyme {
  id: string;
  title: string;
  iconKey: 'music' | 'star' | 'bus' | 'sun' | 'heart' | 'smile' | 'shield' | 'cloud' | 'bell' | 'radio' | 'mic' | 'crown';
  bgGradient: string;
  lyrics: string[];
  youtubeId?: string;
  soundEffects: { iconKey: string; label: string; text: string }[];
}


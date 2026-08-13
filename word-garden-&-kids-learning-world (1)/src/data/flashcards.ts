import { Flashcard, Story, ShopItem } from '../types';
import guideAvatar from '../assets/images/guide_avatar_1786586645342.jpg';
import wordApple from '../assets/images/word_apple_1786586656297.jpg';
import bunnyBuddy from '../assets/images/bunny_buddy_1786586673129.jpg';

// Custom generated image references bundled via Vite ESM imports
export const GUIDE_AVATAR_IMG = guideAvatar;
export const WORD_APPLE_IMG = wordApple;
export const BUNNY_BUDDY_IMG = bunnyBuddy;

export const FLASHCARDS: Flashcard[] = [
  {
    letter: 'A',
    word: 'Apple',
    phonics: 'Ah, ah, Apple!',
    image: WORD_APPLE_IMG,
    color: 'from-red-500 to-rose-600',
    exampleSentence: 'An apple a day keeps the doctor away!',
    category: 'Fruits'
  },
  {
    letter: 'B',
    word: 'Ball',
    phonics: 'Buh, buh, Ball!',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80',
    color: 'from-blue-500 to-indigo-600',
    exampleSentence: 'Bounce the colorful ball high in the sky!',
    category: 'Toys'
  },
  {
    letter: 'C',
    word: 'Cat',
    phonics: 'Cuh, cuh, Cat!',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500 to-orange-600',
    exampleSentence: 'The soft fluffy cat says meow!',
    category: 'Animals'
  },
  {
    letter: 'D',
    word: 'Dog',
    phonics: 'Duh, duh, Dog!',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    color: 'from-yellow-500 to-amber-600',
    exampleSentence: 'The playful puppy wags his happy tail!',
    category: 'Animals'
  },
  {
    letter: 'E',
    word: 'Elephant',
    phonics: 'Eh, eh, Elephant!',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-500 to-indigo-600',
    exampleSentence: 'The big friendly elephant has a long trunk!',
    category: 'Animals'
  },
  {
    letter: 'F',
    word: 'Flower',
    phonics: 'Fuh, fuh, Flower!',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
    color: 'from-pink-500 to-rose-500',
    exampleSentence: 'A pretty yellow flower blooms in the garden!',
    category: 'Nature'
  },
  {
    letter: 'G',
    word: 'Giraffe',
    phonics: 'Juh, juh, Giraffe!',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-400 to-yellow-600',
    exampleSentence: 'The tall giraffe reaches the high tree leaves!',
    category: 'Animals'
  },
  {
    letter: 'H',
    word: 'House',
    phonics: 'Huh, huh, House!',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-500 to-teal-600',
    exampleSentence: 'Welcome to our cozy little story house!',
    category: 'Places'
  },
  {
    letter: 'I',
    word: 'Ice Cream',
    phonics: 'Eye, eye, Ice Cream!',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
    color: 'from-pink-400 to-purple-500',
    exampleSentence: 'Sweet strawberry ice cream on a sunny day!',
    category: 'Food'
  },
  {
    letter: 'J',
    word: 'Juice',
    phonics: 'Juh, juh, Juice!',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80',
    color: 'from-orange-400 to-amber-500',
    exampleSentence: 'A cold cup of fresh orange juice!',
    category: 'Drinks'
  },
  {
    letter: 'K',
    word: 'Kite',
    phonics: 'Kuh, kuh, Kite!',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
    color: 'from-cyan-400 to-blue-500',
    exampleSentence: 'Fly your diamond kite high in the sky!',
    category: 'Toys'
  },
  {
    letter: 'L',
    word: 'Lion',
    phonics: 'Luh, luh, Lion!',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=600&q=80',
    color: 'from-yellow-600 to-amber-700',
    exampleSentence: 'The brave lion lets out a big roar!',
    category: 'Animals'
  },
  {
    letter: 'M',
    word: 'Monkey',
    phonics: 'Muh, muh, Monkey!',
    image: 'https://images.unsplash.com/photo-1540573133985-778788170483?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-600 to-orange-700',
    exampleSentence: 'The silly monkey swings through the tall trees!',
    category: 'Animals'
  },
  {
    letter: 'N',
    word: 'Nest',
    phonics: 'Nuh, nuh, Nest!',
    image: 'https://images.unsplash.com/photo-1516570161787-2fd962225a2e?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500 to-stone-600',
    exampleSentence: 'The mother bird rests inside her warm nest!',
    category: 'Nature'
  },
  {
    letter: 'O',
    word: 'Orange',
    phonics: 'Ah, ah, Orange!',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80',
    color: 'from-orange-500 to-amber-600',
    exampleSentence: 'A juicy round orange filled with vitamin C!',
    category: 'Fruits'
  },
  {
    letter: 'P',
    word: 'Panda',
    phonics: 'Puh, puh, Panda!',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=600&q=80',
    color: 'from-slate-700 to-slate-900',
    exampleSentence: 'The cute panda loves eating green bamboo!',
    category: 'Animals'
  },
  {
    letter: 'Q',
    word: 'Queen',
    phonics: 'Kwuh, kwuh, Queen!',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-600 to-pink-600',
    exampleSentence: 'The royal queen wears a sparkling gold crown!',
    category: 'People'
  },
  {
    letter: 'R',
    word: 'Rabbit',
    phonics: 'Ruh, ruh, Rabbit!',
    image: BUNNY_BUDDY_IMG,
    color: 'from-rose-400 to-pink-500',
    exampleSentence: 'Bunny Buddy hops around with a crunchy carrot!',
    category: 'Animals'
  },
  {
    letter: 'S',
    word: 'Star',
    phonics: 'Suh, suh, Star!',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    color: 'from-yellow-400 to-amber-500',
    exampleSentence: 'Shine bright like a golden star!',
    category: 'Sky'
  },
  {
    letter: 'T',
    word: 'Tiger',
    phonics: 'Tuh, tuh, Tiger!',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-600 to-orange-600',
    exampleSentence: 'The striped tiger walks proudly in the jungle!',
    category: 'Animals'
  },
  {
    letter: 'U',
    word: 'Umbrella',
    phonics: 'Uh, uh, Umbrella!',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    color: 'from-cyan-500 to-blue-600',
    exampleSentence: 'Open your rainbow umbrella when it rains!',
    category: 'Objects'
  },
  {
    letter: 'V',
    word: 'Violin',
    phonics: 'Vuh, vuh, Violin!',
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-700 to-orange-800',
    exampleSentence: 'Listen to the beautiful music played on the violin!',
    category: 'Music'
  },
  {
    letter: 'W',
    word: 'Watermelon',
    phonics: 'Wuh, wuh, Watermelon!',
    image: 'https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-500 to-rose-600',
    exampleSentence: 'A big slice of sweet cold watermelon!',
    category: 'Fruits'
  },
  {
    letter: 'X',
    word: 'Xylophone',
    phonics: 'Eks, eks, Xylophone!',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80',
    color: 'from-violet-500 to-purple-600',
    exampleSentence: 'Tap the colorful keys on the musical xylophone!',
    category: 'Music'
  },
  {
    letter: 'Y',
    word: 'Yak',
    phonics: 'Yuh, yuh, Yak!',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    color: 'from-stone-600 to-amber-800',
    exampleSentence: 'The fluffy yak lives high in the snowy mountains!',
    category: 'Animals'
  },
  {
    letter: 'Z',
    word: 'Zebra',
    phonics: 'Zuh, zuh, Zebra!',
    image: 'https://images.unsplash.com/photo-1526095179574-86e5458425de?auto=format&fit=crop&w=600&q=80',
    color: 'from-slate-800 to-zinc-900',
    exampleSentence: 'The zebra has beautiful black and white stripes!',
    category: 'Animals'
  }
];

export const STORIES: Story[] = [
  {
    id: 'apple-tree',
    title: 'The Little Apple Tree',
    coverImage: WORD_APPLE_IMG,
    pages: [
      {
        pageNumber: 1,
        text: 'In the middle of Word Garden stood a tiny green seedling dreaming of big juicy apples.',
        highlightWord: 'seedling',
        image: WORD_APPLE_IMG
      },
      {
        pageNumber: 2,
        text: 'Every morning, gentle sunshine warmed its leaves and raindrops refreshed its soil.',
        highlightWord: 'sunshine',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 3,
        text: 'Bunny Buddy and Maya watered the little tree with love every day!',
        highlightWord: 'watered',
        image: BUNNY_BUDDY_IMG
      },
      {
        pageNumber: 4,
        text: 'Soon, bright red apples grew on the branches! Everyone celebrated with a picnic! 🧺🍎',
        highlightWord: 'apples',
        image: WORD_APPLE_IMG
      }
    ]
  },
  {
    id: 'bunny-adventure',
    title: 'Bunny Buddy\'s Big Day',
    coverImage: BUNNY_BUDDY_IMG,
    pages: [
      {
        pageNumber: 1,
        text: 'Bunny Buddy woke up early today to find glowing golden stars hidden in the garden!',
        highlightWord: 'golden stars',
        image: BUNNY_BUDDY_IMG
      },
      {
        pageNumber: 2,
        text: 'He checked behind the red Apple tree and found his first star! ⭐',
        highlightWord: 'Apple',
        image: WORD_APPLE_IMG
      },
      {
        pageNumber: 3,
        text: 'Monkey cheered from the treetops and showered purple gems all over the garden! 💎',
        highlightWord: 'Monkey',
        image: 'https://images.unsplash.com/photo-1540573133985-778788170483?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 4,
        text: 'Together they shared all the gems and stars with all their friends!',
        highlightWord: 'shared',
        image: GUIDE_AVATAR_IMG
      }
    ]
  },
  {
    id: 'rainbow-bridge',
    title: 'The Magical Rainbow',
    coverImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        text: 'After a gentle spring shower, a glowing colorful rainbow appeared over Word Garden!',
        highlightWord: 'rainbow',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 2,
        text: 'Red, yellow, green, and blue colors danced in the sky like magical ribbons.',
        highlightWord: 'colors',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 3,
        text: 'Bunny Buddy and all the animals walked across the soft rainbow bridge together.',
        highlightWord: 'bridge',
        image: BUNNY_BUDDY_IMG
      },
      {
        pageNumber: 4,
        text: 'At the end of the rainbow, they found a chest full of shiny golden stars! 🌈⭐',
        highlightWord: 'stars',
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'friendly-lion',
    title: 'Leo the Kind Lion',
    coverImage: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        text: 'Leo the lion had a big, loud roar, but he wanted to make gentle music instead!',
        highlightWord: 'music',
        image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 2,
        text: 'He practiced humming sweet lullabies every evening under the twinkling stars.',
        highlightWord: 'lullabies',
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 3,
        text: 'Soon, all the forest animals gathered around to sing along with Leo\'s gentle melody.',
        highlightWord: 'melody',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 4,
        text: 'Everyone cheered and crowned Leo the songbird king of the jungle! 👑🦁',
        highlightWord: 'songbird',
        image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'space-rocket',
    title: 'Journey to the Moon',
    coverImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        text: 'Maya built a silver rocket ship with shiny buttons to explore outer space!',
        highlightWord: 'rocket',
        image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 2,
        text: 'Three, two, one, blast off! The rocket zoomed past bright glowing planets.',
        highlightWord: 'planets',
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 3,
        text: 'They landed softly on the friendly moon and bounced weightlessly in the air!',
        highlightWord: 'moon',
        image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 4,
        text: 'Maya collected cosmic moon dust and brought sparkling souvenirs back home! 🚀✨',
        highlightWord: 'sparkling',
        image: GUIDE_AVATAR_IMG
      }
    ]
  },
  {
    id: 'clever-dolphin',
    title: 'Splash the Dolphin',
    coverImage: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80',
    pages: [
      {
        pageNumber: 1,
        text: 'Splash the dolphin loved playing in the warm blue ocean waves with sea turtles.',
        highlightWord: 'dolphin',
        image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 2,
        text: 'One sunny day, Splash helped a little lost sea star find its way back to coral reef.',
        highlightWord: 'coral reef',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 3,
        text: 'The ocean creatures threw a joyful underwater bubble party to thank Splash!',
        highlightWord: 'bubble',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        pageNumber: 4,
        text: 'Splash leaped high into the air with a happy spin and a big splash! 🐬🌊',
        highlightWord: 'splash',
        image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'hat-crown', name: 'Golden Crown', price: 50, currency: 'stars', category: 'hat', icon: '👑', image: '' },
  { id: 'hat-party', name: 'Party Cone Hat', price: 30, currency: 'stars', category: 'hat', icon: '🥳', image: '' },
  { id: 'hat-flower', name: 'Flower Wreath', price: 20, currency: 'gems', category: 'hat', icon: '🌸', image: '' },
  { id: 'sticker-rainbow', name: 'Rainbow Badge', price: 15, currency: 'stars', category: 'sticker', icon: '🌈', image: '' },
  { id: 'sticker-sparkle', name: 'Sparkle Gem', price: 10, currency: 'gems', category: 'sticker', icon: '✨', image: '' },
  { id: 'bg-sunset', name: 'Sunset Meadow', price: 100, currency: 'stars', category: 'wallpaper', icon: '🌅', image: '' },
  { id: 'bg-night', name: 'Starry Night', price: 40, currency: 'gems', category: 'wallpaper', icon: '🌌', image: '' }
];

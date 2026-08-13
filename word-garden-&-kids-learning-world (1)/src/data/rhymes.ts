import { NurseryRhyme } from '../types';

export const NURSERY_RHYMES: NurseryRhyme[] = [
  {
    id: 'abc-song',
    title: 'The Alphabet Song',
    iconKey: 'music',
    bgGradient: 'from-purple-600 via-indigo-600 to-purple-900',
    youtubeId: 'ezmsrB69760',
    lyrics: [
      'A - B - C - D - E - F - G,',
      'H - I - J - K - L - M - N - O - P,',
      'Q - R - S, T - U - V,',
      'W - X, Y and Z!',
      'Now I know my A - B - Cs,',
      'Next time won\'t you sing with me!',
      'Great job singing the alphabet!'
    ],
    soundEffects: [
      { iconKey: 'mic', label: 'Clap!', text: 'Clap clap clap!' },
      { iconKey: 'star', label: 'Star!', text: 'Twinkle twinkle!' },
      { iconKey: 'crown', label: 'Cheer!', text: 'Yay! Hurray!' }
    ]
  },
  {
    id: 'twinkle-star',
    title: 'Twinkle, Twinkle, Little Star',
    iconKey: 'star',
    bgGradient: 'from-amber-500 via-yellow-600 to-amber-700',
    youtubeId: 'yCjJyiqpAuU',
    lyrics: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky.',
      'When the blazing sun is gone,',
      'When he nothing shines upon,',
      'Then you show your little light,',
      'Twinkle, twinkle, all the night.',
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!'
    ],
    soundEffects: [
      { iconKey: 'star', label: 'Sparkle!', text: 'Shine bright star!' },
      { iconKey: 'cloud', label: 'Night!', text: 'Goodnight stars!' },
      { iconKey: 'crown', label: 'Diamond!', text: 'Bling bling!' }
    ]
  },
  {
    id: 'wheels-on-bus',
    title: 'The Wheels on the Bus',
    iconKey: 'bus',
    bgGradient: 'from-yellow-500 via-amber-600 to-orange-700',
    youtubeId: 'e_04ZrNroTo',
    lyrics: [
      'The wheels on the bus go round and round,',
      'Round and round, round and round!',
      'The wheels on the bus go round and round,',
      'All through the town!',
      'The wipers on the bus go swish, swish, swish,',
      'Swish, swish, swish, swish, swish, swish!',
      'The horn on the bus goes beep, beep, beep,',
      'All through the town!',
      'The driver on the bus says "Move on back!",',
      'All through the town!',
      'The babies on the bus go "Wah, wah, wah!",',
      'All through the town!',
      'The parents on the bus go "Shh, shh, shh!",',
      'All through the town!'
    ],
    soundEffects: [
      { iconKey: 'volume', label: 'Beep Beep!', text: 'Beep beep!' },
      { iconKey: 'radio', label: 'Vroom!', text: 'Swish swish swish!' },
      { iconKey: 'smile', label: 'Wave!', text: 'Bye bye friends!' }
    ]
  },
  {
    id: 'old-macdonald',
    title: 'Old MacDonald Had a Farm',
    iconKey: 'sun',
    bgGradient: 'from-emerald-600 via-green-600 to-teal-800',
    youtubeId: '_6HzoUre3h8',
    lyrics: [
      'Old MacDonald had a farm, E-I-E-I-O!',
      'And on his farm he had a cow, E-I-E-I-O!',
      'With a moo-moo here, and a moo-moo there,',
      'Here a moo, there a moo, everywhere a moo-moo!',
      'Old MacDonald had a farm, E-I-E-I-O!',
      'And on his farm he had a duck, E-I-E-I-O!',
      'With a quack-quack here, and a quack-quack there,',
      'Here a quack, there a quack, everywhere a quack-quack!',
      'And on his farm he had a pig, E-I-E-I-O!',
      'With an oink-oink here, and an oink-oink there!',
      'Old MacDonald had a farm, E-I-E-I-O!'
    ],
    soundEffects: [
      { iconKey: 'volume', label: 'Moo!', text: 'Moo moo!' },
      { iconKey: 'smile', label: 'Quack!', text: 'Quack quack!' },
      { iconKey: 'heart', label: 'Oink!', text: 'Oink oink!' }
    ]
  },
  {
    id: 'itsy-spider',
    title: 'The Itsy Bitsy Spider',
    iconKey: 'shield',
    bgGradient: 'from-blue-600 via-indigo-600 to-purple-800',
    youtubeId: 'w_lCi8U49mY',
    lyrics: [
      'The itsy bitsy spider climbed up the waterspout,',
      'Down came the rain and washed the spider out!',
      'Out came the sun and dried up all the rain,',
      'And the itsy bitsy spider climbed up the spout again!',
      'Climbing high, climbing strong,',
      'All day long!'
    ],
    soundEffects: [
      { iconKey: 'cloud', label: 'Rain!', text: 'Pitter patter rain!' },
      { iconKey: 'sun', label: 'Sunshine!', text: 'Warm bright sun!' },
      { iconKey: 'crown', label: 'Climb!', text: 'Up up again!' }
    ]
  },
  {
    id: 'row-boat',
    title: 'Row, Row, Row Your Boat',
    iconKey: 'cloud',
    bgGradient: 'from-sky-500 via-blue-600 to-cyan-700',
    youtubeId: '7otAJa3jui8',
    lyrics: [
      'Row, row, row your boat, gently down the stream,',
      'Merrily, merrily, merrily, merrily, life is but a dream!',
      'Row, row, row your boat, gently down the stream,',
      'If you see a crocodile, don\'t forget to scream! Ahh!',
      'Row, row, row your boat, gently to the shore,',
      'If you see a lion, don\'t forget to roar! Roar!'
    ],
    soundEffects: [
      { iconKey: 'volume', label: 'Splash!', text: 'Splash in stream!' },
      { iconKey: 'smile', label: 'Scream!', text: 'Eek crocodile!' },
      { iconKey: 'crown', label: 'Roar!', text: 'Roar lion!' }
    ]
  },
  {
    id: 'mary-lamb',
    title: 'Mary Had a Little Lamb',
    iconKey: 'heart',
    bgGradient: 'from-pink-500 via-rose-600 to-purple-700',
    youtubeId: 'fS3aN_A1P7k',
    lyrics: [
      'Mary had a little lamb, little lamb, little lamb,',
      'Mary had a little lamb, its fleece was white as snow!',
      'And everywhere that Mary went, Mary went, Mary went,',
      'Everywhere that Mary went, the lamb was sure to go!',
      'It followed her to school one day, school one day, school one day,',
      'Which was against the rule!',
      'It made the children laugh and play, laugh and play, laugh and play,',
      'To see a lamb at school!'
    ],
    soundEffects: [
      { iconKey: 'heart', label: 'Baa!', text: 'Baa baa white lamb!' },
      { iconKey: 'smile', label: 'Laugh!', text: 'Ha ha ha!' },
      { iconKey: 'star', label: 'School!', text: 'School time fun!' }
    ]
  },
  {
    id: 'baa-baa-black-sheep',
    title: 'Baa, Baa, Black Sheep',
    iconKey: 'smile',
    bgGradient: 'from-slate-700 via-purple-900 to-indigo-950',
    youtubeId: '39InxW5X4G8',
    lyrics: [
      'Baa, baa, black sheep, have you any wool?',
      'Yes sir, yes sir, three bags full!',
      'One for the master, and one for the dame,',
      'And one for the little boy who lives down the lane.',
      'Baa, baa, white sheep, have you any wool?',
      'Yes sir, yes sir, three bags full!',
      'Soft and warm for everyone!'
    ],
    soundEffects: [
      { iconKey: 'volume', label: 'Baa!', text: 'Baa baa!' },
      { iconKey: 'star', label: 'Wool Bag!', text: 'Three bags full!' },
      { iconKey: 'heart', label: 'Soft!', text: 'Warm soft wool!' }
    ]
  },
  {
    id: 'london-bridge',
    title: 'London Bridge Is Falling Down',
    iconKey: 'crown',
    bgGradient: 'from-red-600 via-rose-700 to-purple-900',
    youtubeId: '_992Y1y9Otw',
    lyrics: [
      'London Bridge is falling down, falling down, falling down,',
      'London Bridge is falling down, my fair lady!',
      'Build it up with wood and clay, wood and clay, wood and clay,',
      'Wood and clay will wash away, my fair lady!',
      'Build it up with iron and steel, iron and steel, iron and steel,',
      'Iron and steel will bend and bow, my fair lady!',
      'Build it up with gold and silver, gold and silver, gold and silver,',
      'Gold and silver shine so bright, my fair lady!'
    ],
    soundEffects: [
      { iconKey: 'crown', label: 'Build!', text: 'Build it up!' },
      { iconKey: 'star', label: 'Gold!', text: 'Shine so bright!' },
      { iconKey: 'smile', label: 'Hooray!', text: 'Fair lady!' }
    ]
  },
  {
    id: 'if-youre-happy',
    title: 'If You\'re Happy and You Know It',
    iconKey: 'radio',
    bgGradient: 'from-rose-500 via-pink-600 to-purple-700',
    youtubeId: '71hqRT9U0wg',
    lyrics: [
      'If you\'re happy and you know it, clap your hands!',
      'If you\'re happy and you know it, clap your hands!',
      'If you\'re happy and you know it, and you really want to show it,',
      'If you\'re happy and you know it, clap your hands!',
      'If you\'re happy and you know it, stomp your feet!',
      'If you\'re happy and you know it, stomp your feet!',
      'If you\'re happy and you know it, shout hooray! Hooray!',
      'If you\'re happy and you know it, do all three!'
    ],
    soundEffects: [
      { iconKey: 'mic', label: 'Clap!', text: 'Clap your hands!' },
      { iconKey: 'volume', label: 'Stomp!', text: 'Stomp stomp!' },
      { iconKey: 'star', label: 'Hooray!', text: 'Hooray!' }
    ]
  }
];

export const FILTER_CLASSES = {
  Normal: "",
  Lembut: "contrast-75 brightness-110 saturate-50",
  Bright: "brightness-125 contrast-110 saturate-125",
  Warm: "sepia-[.3] contrast-110 saturate-150",
  Cool: "hue-rotate-15 contrast-105 saturate-110",
  "B&W": "grayscale",
  "B&W Dark": "grayscale contrast-125 brightness-75",
  Sepia: "sepia",
  Retro:
    "sepia-[.5] hue-rotate-[-30deg] contrast-110 saturate-150 brightness-90",
  Faded: "contrast-50 brightness-125 saturate-50",
  Vintage: "sepia-[.4] contrast-125 brightness-90 saturate-50",
  Cinematic: "contrast-125 saturate-50 brightness-90 hue-rotate-15",
  Neon: "saturate-200 contrast-125 hue-rotate-45",
  Sunset: "sepia-[.4] saturate-200 contrast-110 hue-rotate-[-15deg]",
  Matte: "contrast-90 brightness-105 saturate-75 brightness-95",
  Chrome: "contrast-150 saturate-200 brightness-110",
  Dreamy: "brightness-115 contrast-85 saturate-80 blur-[0.3px]",
  Amber: "sepia-[.6] saturate-150 contrast-105 brightness-105",
  Winter: "hue-rotate-180 saturate-50 brightness-110 contrast-90",
  Velvet: "contrast-130 saturate-130 brightness-85 hue-rotate-[-10deg]",
  Tokyo: "hue-rotate-45 saturate-150 contrast-110 brightness-95",
  Rose: "sepia-[.2] hue-rotate-[-20deg] saturate-150 contrast-105 brightness-105",
};

export const SOLID_COLORS = [
  // Basic & Neutral
  "bg-white",
  "bg-black",
  "bg-gray-200",
  "bg-slate-800",

  // Pastels
  "bg-[#ffb6c1]",
  "bg-[#add8e6]",
  "bg-[#e6e6fa]",
  "bg-[#fffacd]",
  "bg-[#ffebcd]",
  "bg-[#ffc0cb]",
  "bg-rose-100",
  "bg-purple-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",

  // Deep / Dark Colors
  "bg-[#2e8b57]",
  "bg-[#191970]",
  "bg-[#800000]",
  "bg-[#3e2723]",
  "bg-indigo-900",
  "bg-emerald-900",
  "bg-rose-900",

  // Vibrant Colors
  "bg-rose-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-fuchsia-400",
  "bg-pink-400",
];

export const PATTERN_COLORS = [
  // Pastel Gradients
  "bg-gradient-to-r from-pink-200 to-pink-100",
  "bg-gradient-to-tr from-green-200 to-blue-200",
  "bg-gradient-to-br from-blue-300 to-purple-400",
  "bg-gradient-to-tl from-yellow-200 to-green-200",
  "bg-gradient-to-r from-purple-300 to-pink-300",
  "bg-gradient-to-bl from-rose-200 to-orange-200",
  "bg-gradient-to-b from-teal-200 to-emerald-200",
  "bg-gradient-to-t from-cyan-200 to-blue-200",
  "bg-gradient-to-r from-fuchsia-200 to-pink-200",
  "bg-gradient-to-bl from-yellow-100 to-amber-200",

  // Vibrant Gradients
  "bg-gradient-to-r from-rose-400 to-red-500",
  "bg-gradient-to-br from-orange-400 to-rose-400",
  "bg-gradient-to-tr from-yellow-400 to-orange-500",
  "bg-gradient-to-bl from-lime-400 to-green-500",
  "bg-gradient-to-r from-emerald-400 to-cyan-400",
  "bg-gradient-to-b from-cyan-500 to-blue-500",
  "bg-gradient-to-tl from-indigo-500 to-purple-500",
  "bg-gradient-to-r from-fuchsia-500 to-pink-500",
  "bg-gradient-to-bl from-violet-400 to-fuchsia-500",

  // Dark / Elegant Gradients
  "bg-gradient-to-bl from-gray-700 to-black",
  "bg-gradient-to-r from-slate-900 to-slate-700",
  "bg-gradient-to-b from-zinc-800 to-zinc-900",
  "bg-gradient-to-br from-indigo-900 to-slate-900",
  "bg-gradient-to-bl from-rose-900 to-black",
  "bg-gradient-to-tr from-emerald-900 to-black",

  // Monochromatin Gradients
  "bg-gradient-to-r from-gray-100 to-gray-300",
  "bg-gradient-to-b from-slate-300 to-slate-400",
  "bg-gradient-to-tr from-zinc-200 to-zinc-400",

  // Specialty / Aesthetic Mixes (3 Colors)
  "bg-gradient-to-br from-rose-100 via-purple-200 to-blue-200",
  "bg-gradient-to-tr from-orange-100 via-rose-100 to-purple-200",
  "bg-gradient-to-bl from-green-100 via-teal-100 to-cyan-200",
  "bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400",
  "bg-gradient-to-t from-indigo-200 via-purple-200 to-pink-200",
];

export const PATTERN_LIST = [
  {
    id: "hearts",
    label: "Hearts",
    src: "/patterns/hearts.svg",
    emoji: "💗",
  },
  {
    id: "stars",
    label: "Stars",
    src: "/patterns/stars.svg",
    emoji: "⭐",
  },
  {
    id: "flowers",
    label: "Flowers",
    src: "/patterns/flowers.svg",
    emoji: "🌸",
  },
  {
    id: "polka",
    label: "Polka Dot",
    src: "/patterns/polka.svg",
    emoji: "🔵",
  },
  {
    id: "stripes",
    label: "Stripes",
    src: "/patterns/stripes.svg",
    emoji: "〰️",
  },
  {
    id: "checks",
    label: "Checks",
    src: "/patterns/checks.svg",
    emoji: "🔲",
  },
  {
    id: "snowflakes",
    label: "Snowflakes",
    src: "/patterns/snowflakes.svg",
    emoji: "❄️",
  },
  {
    id: "zigzag",
    label: "Zigzag",
    src: "/patterns/zigzag.svg",
    emoji: "〽️",
  },
  {
    id: "sparkles",
    label: "Sparkles",
    src: "/patterns/sparkles.svg",
    emoji: "✨",
  },
  {
    id: "bubbles",
    label: "Bubbles",
    src: "/patterns/bubbles.svg",
    emoji: "🫧",
  },
  {
    id: "clouds",
    label: "Clouds",
    src: "/patterns/clouds.svg",
    emoji: "☁️",
  },
  {
    id: "pororo",
    label: "Pororo",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifPororo.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifPororo.png",
      default: "/patterns/3-Vertikal-P/MotifPororo.png",
    },
    thumbnail: "/icon/Thumbnail-Motif-Pororo.png",
  },
  {
    id: "marvel",
    label: "Marvel",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifMarvel.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifMarvel.png",
      default: "/patterns/3-Vertikal-P/MotifMarvel.png",
    },
    thumbnail: "icon/Thumbnail-Motif-Marvel.png",
  },
  {
    id: "bluepink",
    label: "BluePink",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifBluePink.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifBluePink.png",
      default: "/patterns/3-Vertikal-P/MotifBluePink.png",
    },
    thumbnail: "/icon/BluePink.png",
  },
  {
    id: "nailong",
    label: "Nailong",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifNailong.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifNailong.png",
      default: "/patterns/3-Vertikal-P/MotifNailong.png",
    },
    thumbnail: "/icon/Nailong.png",
  },
  {
    id: "pinkwhite",
    label: "PinkWhite",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifPinkWhite.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifPinkWhite.png",
      default: "/patterns/3-Vertikal-P/MotifPinkWhite.png",
    },
    thumbnail: "/icon/PinkWhite.png",
  },
  {
    id: "polkadotcrong",
    label: "PolkadotCrong",
    src: {
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifPolkadotCrong.png",
      "2-horizontal": "/patterns/2-Horizontal/MotifPolkadotCrong.png",
      default: "/patterns/3-Vertikal-P/MotifPolkadotCrong.png",
    },
    thumbnail: "/icon/Crong.png",
  },
];

export const THEME_META = {
  filmNoir: {
    defaultColor: "bg-[#000000]",
    thumbnail: "/icon/FilmNoir.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/3Vertikal-FilmNoir.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-FilmNoir.png",
    },
  },

  pinklove: {
    defaultColor: "bg-[#ff9fbb]",
    thumbnail: "/icon/PinkLove.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-PinkLove.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-PinkLove.png",
      "3-vertical-p": "/themes/3-Vertikal-P/PinkLove.png",
    },
  },

  nailong: {
    defaultColor: "bg-[#FFDE59]",
    thumbnail: "/icon/Nailong.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-Nailong.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-Nailong.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-Nailong.png",
    },
    background: {
      "2-horizontal": "/patterns/2-Horizontal/2Horizontal-MotifNailong.png",
      "3-vertical": "/patterns/3-Vertikal/3Vertikal-MotifNailong.png",
      "3-vertical-p": "/patterns/3-Vertikal-P/3VertikalP-MotifNailong.png",
    },
  },

  crong: {
    defaultColor: "bg-[#B2D234]",
    thumbnail: "/icon/Crong.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-Crong.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-Crong.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-Crong.png",
    },
    background: {
      "2-horizontal":
        "/patterns/2-Horizontal/2Horizontal-MotifPolkadotCrong.png",
      "3-vertical": "/patterns/3-Vertikal/3Vertikal-MotifPolkadotCrong.png",
      "3-vertical-p":
        "/patterns/3-Vertikal-P/3VertikalP-MotifPolkadotCrong.png",
    },
  },

  spiderman: {
    defaultColor: "bg-[#E63234]",
    thumbnail: "icon/Spiderman.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-Spiderman.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-Spiderman.png",
    },
    background: {
      "2-horizontal": "/patterns/2-Horizontal/2Horizontal-MotifMarvel.png",
      "3-vertical-p": "/patterns/3-Vertikal-P/3VertikalP-MotifMarvel.png",
    },
  },

  pinkWhite: {
    defaultColor: "bg-[#FFC0CB]",
    thumbnail: "icon/PinkWhite.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-PinkWhite.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-PinkWhite.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3Vertikal-PinkWhite.png",
    },
    background: {
      "2-horizontal": "/patterns/2-Horizontal/2Horizontal-MotifPinkWhite.png",
      "3-vertical": "/patterns/3-Vertikal/3Vertikal-MotifPinkWhite.png",
      "3-vertical-p": "/patterns/3-Vertikal-P/3VertikalP-MotifPinkWhite.png",
    },
  },

  bemine: {
    defaultColor: "bg-[#FFEDEE]",
    thumbnail: "/icon/BeMine.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-BeMine.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-BeMine.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-BeMine.png",
    },
  },

  bluepink: {
    defaultColor: "bg-[#D6EAF8]",
    thumbnail: "/icon/BluePink.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-BluePink.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-BluePink.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-BluePink.png",
    },
    background: {
      "2-horizontal": "/patterns/2-Horizontal/2Horizontal-BluePink.png",
      "3-horizontal": "/patterns/3-Vertikal/MotifBluePink.png",
      "3-vertical-p": "/patterns/3-Vertikal-P/MotifBluePink.png",
    },
  },

  y2k1: {
    defaultColor: "bg-[cyan]",
    thumbnail: "/icon/Y2K1.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-Y2K1.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-Y2K1.png",
      "3-vertical-p": "/themes/3-Vertikal-P/3VertikalP-Y2K1.png",
    },
  },

  oceanwave: {
    defaultColor: "bg-[blue]",
    thumbnail: "/icon/OceanWave.png",
    files: {
      "3-vertikal": "/themes/3-Vertikal/3Vertikal-OceanWave.png",
    },
  },

  gardenFloral: {
    defaultColor: "bg-gradient-to-br from-blue-300 to-purple-400",
    thumbnail: "/icon/3-Vertikal/GardenFloral.svg",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-GardenFloral.png",
    },
  },

  purpleMoon: {
    defaultColor: "bg-[#1a0a2e]",
    thumbnail: "/icon/4-Vertikal/PurpleMoon.svg",
    files: { "4-vertical": "/themes/4-Vertikal/PurpleMoon.svg" },
  },

  goldenHour: {
    defaultColor: "bg-[#ffa000]",
    thumbnail: "/icon/4-Vertikal/GoldenHour.svg",
    files: { "4-vertical": "/themes/4-Vertikal/GoldenHour.svg" },
  },

  pastelPop: {
    defaultColor: "bg-[#fce4ec]",
    thumbnail: "/icon/Grid-2x2/PastelPop.svg",
    files: { "4-grid": "/themes/Grid-2x2/PastelPop.svg" },
  },

  midnightGridTheme: {
    defaultColor: "bg-[#0a0f1e]",
    thumbnail: "/icon/Grid-2x2/MidnightGrid.svg",
    files: { "4-grid": "/themes/Grid-2x2/MidnightGrid.svg" },
  },

  vintageRose: {
    defaultColor: "bg-[#efebe9]",
    thumbnail: "/icon/Grid-2x3/VintageRose.svg",
    files: { "6-grid": "/themes/Grid-2x3/VintageRose.svg" },
  },

  neonNight: {
    defaultColor: "bg-[#0a0010]",
    thumbnail: "/icon/Grid-2x3/NeonNight.svg",
    files: { "6-grid": "/themes/Grid-2x3/NeonNight.svg" },
  },

  contactSheet: {
    defaultColor: "bg-[#1a1a1a]",
    thumbnail: "/icon/Grid-3x3/ContactSheet.svg",
    files: { "9-grid": "/themes/Grid-3x3/ContactSheet.svg" },
  },

  candyPop: {
    defaultColor: "bg-[#fce4ec]",
    thumbnail: "/icon/Grid-3x3/CandyPop.svg",
    files: { "9-grid": "/themes/Grid-3x3/CandyPop.svg" },
  },

  kawaiiPink: {
    defaultColor: "bg-[#fff0f5]",
    thumbnail: "/icon/3-Vertikal/KawaiiPink.svg",
    files: {
      "2-horizontal": "/themes/2-Horizontal/2Horizontal-KawaiPink.png",
      "3-vertical": "/themes/3-Vertikal/3Vertikal-KawaiiPink.png",
    },
  },

  neon80s: {
    defaultColor: "bg-[#050010]",
    thumbnail: "/icon/4-Vertikal/Neon80s.svg",
    files: { "4-vertical": "/themes/4-Vertikal/Neon80s.svg" },
  },

  auroraGrid: {
    defaultColor: "bg-[#1a0533]",
    thumbnail: "/icon/Grid-2x2/AuroraGrid.svg",
    files: { "4-grid": "/themes/Grid-2x2/AuroraGrid.svg" },
  },
};

export const EMOJI_STICKERS = [
  "❤️",
  "🎀",
  "✨",
  "🌸",
  "🦋",
  "🧸",
  "🐶",
  "🐱",
  "🐰",
  "🐻",
  "🍓",
  "🍉",
  "🌈",
  "🔥",
  "😍",
  "💋",
  "🎉",
  "👑",
  "🍀",
  "💎",
  "⭐",
  "🎵",
  "🎧",
  "💙",
  "❄️",
  "🩷",
  "💌",
  "🌙",
  "🌺",
  "🌻",
  "🦄",
  "🎠",
  "🍭",
  "🧁",
  "🎪",
  "💫",
  "🌟",
  "🎆",
  "🍒",
  "🏵️",
];

export const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72";
export const IMAGE_STICKERS = [
  { label: "Crown", src: `${TWEMOJI_BASE}/1f451.png` },
  { label: "Diamond", src: `${TWEMOJI_BASE}/1f48e.png` },
  { label: "Heart", src: `${TWEMOJI_BASE}/2764.png` },
  { label: "PinkHeart", src: `${TWEMOJI_BASE}/1fa77.png` },
  { label: "Star", src: `${TWEMOJI_BASE}/2b50.png` },
  { label: "Sparkles", src: `${TWEMOJI_BASE}/2728.png` },
  { label: "Bow", src: `${TWEMOJI_BASE}/1f380.png` },
  { label: "Flower", src: `${TWEMOJI_BASE}/1f338.png` },
  { label: "Sunflower", src: `${TWEMOJI_BASE}/1f33b.png` },
  { label: "Cherry", src: `${TWEMOJI_BASE}/1f352.png` },
  { label: "Strawberry", src: `${TWEMOJI_BASE}/1f353.png` },
  { label: "Lollipop", src: `${TWEMOJI_BASE}/1f36d.png` },
  { label: "Cupcake", src: `${TWEMOJI_BASE}/1f9c1.png` },
  { label: "Butterfly", src: `${TWEMOJI_BASE}/1f98b.png` },
];

export const LOCAL_PROJECT_STICKERS = [
  {
    label: "Spiderman",
    src: "/stickers/Spiderman1.png",
    thumbnail: "/icon/Spiderman.png",
  },
  {
    label: "Spiderman",
    src: "/stickers/Spiderman2.png",
    thumbnail: "/icon/Spiderman.png",
  },
  {
    label: "Spiderman",
    src: "/stickers/Spiderman3.png",
    thumbnail: "/icon/Spiderman.png",
  },
  {
    label: "Spiderman",
    src: "/stickers/Spiderman4.png",
    thumbnail: "/icon/Spiderman.png",
  },
  {
    label: "JaringSpiderman",
    src: "/stickers/JaringSpiderman1.png",
    thumbnail: "/icon/Spiderman.png",
  },

  { label: "Crong", src: "/stickers/Crong1.png" },
  { label: "Crong", src: "/stickers/Crong2.png" },
  { label: "Crong", src: "/stickers/Crong3.png" },
  { label: "Crong", src: "/stickers/Crong4.png" },

  { label: "Loppy", src: "/stickers/Loppy1.png" },
  { label: "Loppy", src: "/stickers/Loppy2.png" },
  { label: "Loppy", src: "/stickers/Loppy3.png" },
  { label: "Loppy", src: "/stickers/Loppy4.png" },
  { label: "Loppy", src: "/stickers/Loppy5.png" },

  { label: "Pororo", src: "/stickers/Pororo1.png" },
  { label: "Pororo", src: "/stickers/Pororo2.png" },
  { label: "Pororo", src: "/stickers/Pororo3.png" },

  { label: "Poby", src: "/stickers/Poby1.png" },

  { label: "The Pororo", src: "/stickers/ThePororo.png" },

  { label: "PororoTitle", src: "/stickers/PororoTitle.png" },
];

export const STRIP_PAD = 12;
export const STRIP_SIZES = {
  "2-horizontal": { w: 304, cols: 2, gap: 8 },
  "3-vertical": { w: 180, cols: 1, gap: 6 },
  "3-vertical-p": { w: 144, cols: 1, gap: 6 },
  "4-vertical": { w: 180, cols: 1, gap: 6 },
  "4-grid": { w: 240, cols: 2, gap: 6 },
  "6-grid": { w: 240, cols: 2, gap: 6 },
  "9-grid": { w: 284, cols: 3, gap: 4 },
};

export const GLOBAL_SHAPES = [
  { id: "none", label: "Normal", icon: "⬜" },
  { id: "rounded", label: "Rounded", icon: "▢" },
  { id: "circle", label: "Lingkaran", icon: "⭕" },
  { id: "love", label: "Love", icon: "❤️" },
  { id: "star", label: "Bintang", icon: "⭐" },
  { id: "hexagon", label: "Hexagon", icon: "⬡" },
];

export const getClipPath = (shape, radius = 16) => {
  switch (shape) {
    case "none":
      return { borderRadius: 0, clipPath: "none" };
    case "rounded":
      return { borderRadius: `${radius}px`, clipPath: "none" };
    case "circle":
      return { borderRadius: "50%", clipPath: "none" };
    case "love":
      return { borderRadius: 0, clipPath: "url(#bs-clip-love)" };
    case "star":
      return {
        borderRadius: 0,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      };
    case "hexagon":
      return {
        borderRadius: 0,
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      };
    default:
      return { borderRadius: 0, clipPath: "none" };
  }
};

export const getStripContainerStyle = (layoutId) => {
  const s = STRIP_SIZES[layoutId] || STRIP_SIZES["3-vertical"];
  return { width: `${s.w}px`, maxWidth: "100%", padding: `${STRIP_PAD}px` };
};

export const getPhotosGridStyle = (layoutId) => {
  const s = STRIP_SIZES[layoutId] || STRIP_SIZES["3-vertical"];
  if (s.cols === 1)
    return { display: "flex", flexDirection: "column", gap: `${s.gap}px` };
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${s.cols}, 1fr)`,
    gap: `${s.gap}px`,
  };
};

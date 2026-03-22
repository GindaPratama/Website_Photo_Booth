import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import { toPng } from "html-to-image";
import { getAspectRatioClass } from "./Capture";
import Themes from "../components/Themes";

const FILTER_CLASSES = {
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

const SOLID_COLORS = [
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

const PATTERN_COLORS = [
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

  // Monochromatic Gradients
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

// ── PATTERN / MOTIF LIST ──
const PATTERN_LIST = [
  { id: "hearts", label: "Hearts", src: "/patterns/hearts.svg", emoji: "💗" },
  { id: "stars", label: "Stars", src: "/patterns/stars.svg", emoji: "⭐" },
  {
    id: "flowers",
    label: "Flowers",
    src: "/patterns/flowers.svg",
    emoji: "🌸",
  },
  { id: "polka", label: "Polka Dot", src: "/patterns/polka.svg", emoji: "🔵" },
  {
    id: "stripes",
    label: "Stripes",
    src: "/patterns/stripes.svg",
    emoji: "〰️",
  },
  { id: "checks", label: "Checks", src: "/patterns/checks.svg", emoji: "🔲" },
  {
    id: "snowflakes",
    label: "Snowflakes",
    src: "/patterns/snowflakes.svg",
    emoji: "❄️",
  },
  { id: "zigzag", label: "Zigzag", src: "/patterns/zigzag.svg", emoji: "〽️" },
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
  { id: "clouds", label: "Clouds", src: "/patterns/clouds.svg", emoji: "☁️" },
];

const THEME_META = {
  // Label: "" untuk memberikan nama tema
  midnightGold: {
    defaultColor: "bg-[#0d1b2a]",
    thumbnail: "/icon/2-Horizontal/MidnightGold.svg",
    files: { "2-horizontal": "/themes/2-Horizontal/MidnightGold.svg" },
  },

  sakuraBlossom: {
    defaultColor: "bg-[#fce4ec]",
    thumbnail: "/icon/2-Horizontal/SakuraBlossom.svg",
    files: { "2-horizontal": "/themes/2-Horizontal/SakuraBlossom.svg" },
  },

  filmNoir: {
    defaultColor: "bg-[#000000]",
    thumbnail: "/icon/FilmNoir.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/FilmNoir.svg",
      "3-vertical": "/themes/3-Vertikal/FilmNoir.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/FilmsNoir.png",
    },
  },

  summerCoral: {
    defaultColor: "bg-[#ff7043]",
    thumbnail: "/icon/2-Horizontal/SummerCoral.svg",
    files: { "2-horizontal": "/themes/2-Horizontal/SummerCoral.svg" },
  },

  pinklove: {
    defaultColor: "bg-[#ff9fbb]",
    thumbnail: "/icon/PinkLove.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/PinkLove.png",
      "3-vertical": "/themes/3-Vertikal/PinkLove.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/PinkLove.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifPinkLove.svg",
    },
  },

  nailong: {
    defaultColor: "bg-[#FFDE59]",
    thumbnail: "/icon/Nailong.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/Nailong.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/Nailong.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifNailong.svg",
    },
  },

  crong: {
    defaultColor: "bg-[#B2D234]",
    thumbnail: "/icon/Crong.png",
    files: {
      "3-vertical-p": "/themes/3-Vertikal-P/Crong.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifPolkadotCrong.png",
    },
  },

  spiderman: {
    defaultColor: "bg-[#E63234]",
    thumbnail: "icon/Spiderman.png",
    files: {
      "3-vertical-p": "/themes/3-Vertikal-P/Spiderman.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifMarvel.png",
    },
  },

  pinkWhite: {
    defaultColor: "bg-[#FFC0CB]",
    thumbnail: "icon/PinkWhite.png",
    files: {
      "3-vertical-p": "/themes/3-Vertikal-P/PinkWhite.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifPinkWhite.png",
    },
  },

  bemine: {
    defaultColor: "bg-[#FFEDEE]",
    thumbnail: "/icon/BeMine.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/BeMine.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/BeMine.png",
    },
  },

  bluepink: {
    defaultColor: "bg-[#D6EAF8]",
    thumbnail: "/icon/BluePink.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/BluePink.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/BluePink.png",
    },
    background: {
      "3-vertical-p": "/themes/3-Vertikal-P/MotifBluePink.png",
    },
  },

  gold: {
    defaultColor: "bg-[#FFDE59]",
    thumbnail: "/icon/3-Vertikal/Gold.svg",
    files: {
      "3-vertical": "/themes/3-Vertikal/Gold.svg",
    },
  },

  y2k1: {
    defaultColor: "bg-[cyan]",
    thumbnail: "/icon/Y2K1.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/y2k1.svg",
      "3-vertical-p": "/themes/3-Vertikal-P/Y2K1.png",
    },
  },

  starryNight: {
    defaultColor: "bg-[#0d1b2a]",
    thumbnail: "/icon/3-Vertikal/StarryNight.svg",
    files: {
      "3-vertical": "/themes/3-Vertikal/StarryNight.svg",
    },
  },

  gardenFloral: {
    defaultColor: "bg-[#c8e6c9]",
    thumbnail: "/icon/3-Vertikal/GardenFloral.svg",
    files: {
      "3-vertical": "/themes/3-Vertikal/GardenFloral.svg",
    },
  },

  oceanWave: {
    defaultColor: "bg-[#006994]",
    thumbnail: "/icon/3-Vertikal/OceanWave.svg",
    files: {
      "3-vertical": "/themes/3-Vertikal/OceanWave.svg",
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
      "3-vertical": "/themes/3-Vertikal/KawaiiPink.svg",
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

// Sticker emoji biasa
const EMOJI_STICKERS = [
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

// Sticker gambar dari CDN bebas (Twemoji via CDN, OpenMoji, Google Noto Emoji)
const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72";
const IMAGE_STICKERS = [
  // Nailong / Cute yellow duck style
  {
    label: "Nailong",
    src: "https://em-content.zobj.net/source/telegram/386/duck_1f986.webp",
  },
  {
    label: "Chick",
    src: "https://em-content.zobj.net/source/telegram/386/hatching-chick_1f423.webp",
  },
  {
    label: "Bear",
    src: "https://em-content.zobj.net/source/telegram/386/teddy-bear_1f9f8.webp",
  },
  {
    label: "Frog",
    src: "https://em-content.zobj.net/source/telegram/386/frog_1f438.webp",
  },
  {
    label: "Cat",
    src: "https://em-content.zobj.net/source/telegram/386/cat-face_1f431.webp",
  },
  {
    label: "Dog",
    src: "https://em-content.zobj.net/source/telegram/386/dog-face_1f436.webp",
  },
  {
    label: "Bunny",
    src: "https://em-content.zobj.net/source/telegram/386/rabbit-face_1f430.webp",
  },
  {
    label: "Hamster",
    src: "https://em-content.zobj.net/source/telegram/386/hamster_1f439.webp",
  },
  {
    label: "Penguin",
    src: "https://em-content.zobj.net/source/telegram/386/penguin_1f427.webp",
  },
  {
    label: "Unicorn",
    src: "https://em-content.zobj.net/source/telegram/386/unicorn_1f984.webp",
  },
  {
    label: "Fox",
    src: "https://em-content.zobj.net/source/telegram/386/fox_1f98a.webp",
  },
  {
    label: "Panda",
    src: "https://em-content.zobj.net/source/telegram/386/panda_1f43c.webp",
  },
  {
    label: "Koala",
    src: "https://em-content.zobj.net/source/telegram/386/koala_1f428.webp",
  },
  {
    label: "Sloth",
    src: "https://em-content.zobj.net/source/telegram/386/sloth_1f9a5.webp",
  },
  {
    label: "Alien",
    src: "https://em-content.zobj.net/source/telegram/386/alien_1f47d.webp",
  },
  {
    label: "Ghost",
    src: "https://em-content.zobj.net/source/telegram/386/ghost_1f47b.webp",
  },
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

const STRIP_PAD = 12;
const STRIP_SIZES = {
  "2-horizontal": { w: 300, cols: 2, gap: 8 },
  "3-vertical": { w: 180, cols: 1, gap: 6 },
  "3-vertical-p": { w: 140, cols: 1, gap: 6 },
  "4-vertical": { w: 180, cols: 1, gap: 6 },
  "4-grid": { w: 240, cols: 2, gap: 6 },
  "6-grid": { w: 240, cols: 2, gap: 6 },
  "9-grid": { w: 280, cols: 3, gap: 4 },
};

// ── SHAPE DEFINITIONS ──
const GLOBAL_SHAPES = [
  { id: "none", label: "Normal", icon: "⬜" },
  { id: "rounded", label: "Rounded", icon: "▢" },
  { id: "circle", label: "Lingkaran", icon: "⭕" },
  { id: "love", label: "Love", icon: "❤️" },
  { id: "star", label: "Bintang", icon: "⭐" },
  { id: "hexagon", label: "Hexagon", icon: "⬡" },
];

// Clip-paths untuk shape
// Love menggunakan SVG clipPath dengan objectBoundingBox agar selalu scale
// sesuai ukuran element (tidak fixed pixel seperti path())
const getClipPath = (shape, radius = 16) => {
  switch (shape) {
    case "none":
      return { borderRadius: 0, clipPath: "none" };
    case "rounded":
      return { borderRadius: `${radius}px`, clipPath: "none" };
    case "circle":
      return { borderRadius: "50%", clipPath: "none" };
    case "love":
      // Pakai url() referensi ke SVG <clipPath> yang ada di dalam photo-strip
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

const getStripContainerStyle = (layoutId) => {
  const s = STRIP_SIZES[layoutId] || STRIP_SIZES["3-vertical"];
  return { width: `${s.w}px`, maxWidth: "100%", padding: `${STRIP_PAD}px` };
};

const getPhotosGridStyle = (layoutId) => {
  const s = STRIP_SIZES[layoutId] || STRIP_SIZES["3-vertical"];
  if (s.cols === 1)
    return { display: "flex", flexDirection: "column", gap: `${s.gap}px` };
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${s.cols}, 1fr)`,
    gap: `${s.gap}px`,
  };
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { capturedImages, activeFilter, layoutId } = location.state || {
    capturedImages: [],
    activeFilter: "Normal",
    layoutId: "3-vertical",
  };

  const [frameColor, setFrameColor] = useState("bg-[#ffb6c1]");
  const [activeTheme, setActiveTheme] = useState("none");
  const [activePattern, setActivePattern] = useState(null); // id pattern terpilih
  const [patternOpacity, setPatternOpacity] = useState(60); // 0-100
  const [placedStickers, setPlacedStickers] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [customStickers, setCustomStickers] = useState([]);
  const [stickerTab, setStickerTab] = useState("emoji");

  // ── Bentuk State ──
  const [globalShape, setGlobalShape] = useState("none");
  const [radiusAmount, setRadiusAmount] = useState(16);
  const [globalScale, setGlobalScale] = useState(100);
  const [perFrameShapes, setPerFrameShapes] = useState({});
  const [perFrameAmounts, setPerFrameAmounts] = useState({});
  const [perFrameScales, setPerFrameScales] = useState({});
  const [selectedFrame, setSelectedFrame] = useState(null);

  const [activeSection, setActiveSection] = useState("desain");
  const [isDownloading, setIsDownloading] = useState(false);

  const stripRef = useRef(null);
  const stickerInputRef = useRef(null);

  // Cari pattern yang aktif
  const activePatternMeta = PATTERN_LIST.find((p) => p.id === activePattern);

  // Hitung style per foto: prioritas per-frame > global
  const getPhotoStyle = (index) => {
    const frameShape = perFrameShapes[index];
    const shape = frameShape !== undefined ? frameShape : globalShape;

    const frameAmount = perFrameAmounts[index];
    const amount = frameAmount !== undefined ? frameAmount : radiusAmount;

    return getClipPath(shape, amount);
  };

  const getPhotoScale = (index) => {
    const frameScale = perFrameScales[index];
    return frameScale !== undefined ? frameScale : globalScale;
  };

  // ── Stiker: Add ──
  const addSticker = (emoji, src = null) => {
    const newSticker = {
      id: Date.now(),
      emoji,
      src,
      top: 40,
      left: 40,
      size: 60,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  // ── Stiker: Upload ──
  const handleStickerUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        setCustomStickers((prev) => [
          ...prev,
          { label: file.name, src: dataUrl },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  // ── Stiker: Resize ──
  const resizeSticker = (id, delta) => {
    setPlacedStickers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, size: Math.max(20, Math.min(200, s.size + delta)) }
          : s,
      ),
    );
  };
  const setStickerSize = (id, size) => {
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, size } : s)),
    );
  };

  // ── Stiker: Drag ──
  const handleStickerMouseDown = useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      const strip = stripRef.current;
      if (!strip) return;
      const rect = strip.getBoundingClientRect();
      const sticker = placedStickers.find((s) => s.id === id);
      if (!sticker) return;
      const offsetX = e.clientX - rect.left - (sticker.left / 100) * rect.width;
      const offsetY = e.clientY - rect.top - (sticker.top / 100) * rect.height;
      setDraggingId(id);
      setDragOffset({ x: offsetX, y: offsetY });
    },
    [placedStickers],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (draggingId === null) return;
      const strip = stripRef.current;
      if (!strip) return;
      const rect = strip.getBoundingClientRect();
      const newLeft =
        ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const newTop =
        ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
      setPlacedStickers((prev) =>
        prev.map((s) =>
          s.id === draggingId
            ? {
                ...s,
                left: Math.max(0, Math.min(95, newLeft)),
                top: Math.max(0, Math.min(95, newTop)),
              }
            : s,
        ),
      );
    },
    [draggingId, dragOffset],
  );

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  // ── Stiker: Delete ──
  const deleteSticker = (id) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDownload = async () => {
    const el = document.getElementById("photo-strip");
    if (!el) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(el, { pixelRatio: 3 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `PictStrip-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("Gagal download, coba lagi!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleThemeSelect = (key) => {
    const newTheme = activeTheme === key ? "none" : key;
    setActiveTheme(newTheme);
    if (newTheme !== "none" && THEME_META[newTheme]) {
      setFrameColor(THEME_META[newTheme].defaultColor);
    }
  };

  if (!capturedImages || capturedImages.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{
          background:
            "linear-gradient(180deg,#fff5f7 0%,#ffffff 30%,#fdf9ff 70%,#fff5f7 100%)",
        }}
      >
        <p className="text-rose-300">Tidak ada foto. Silakan foto dulu.</p>
        <button
          onClick={() => navigate("/capture")}
          className="px-6 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white text-sm font-medium"
        >
          Ke Halaman Kamera
        </button>
      </div>
    );
  }

  const TABS = [
    { id: "warna", label: "Warna", icon: "🎨" },
    { id: "desain", label: "Desain", icon: "✨" },
    { id: "motif", label: "Motif", icon: "🌸" },
    { id: "bentuk", label: "Bentuk", icon: "⬜" },
    { id: "stiker", label: "Stiker", icon: "🎀" },
  ];

  return (
    <div
      className="min-h-screen font-sans flex flex-col"
      style={{
        background:
          "linear-gradient(180deg,#fff5f7 0%,#ffffff 30%,#fdf9ff 70%,#fff5f7 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Navbar />

      <div className="w-full text-center mt-24 mb-6 px-4">
        <h1 className="text-base font-semibold text-zinc-800 tracking-tight">
          Hasil Foto Strip
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Edit &amp; unduh foto strip kamu
        </p>
      </div>

      <main className="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-10 px-4 md:px-10 pb-12 max-w-6xl mx-auto w-full">
        {/* ── PREVIEW STRIP ── */}
        <div className="w-full md:w-auto flex flex-col items-center gap-4 shrink-0">
          <div className="relative">
            <div
              className="absolute inset-0 -m-6 blur-3xl opacity-20 rounded-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg,#fda4af,#c084fc,#60a5fa)",
              }}
            />
            <div
              id="photo-strip"
              ref={stripRef}
              className={`relative overflow-hidden shadow-md ${
                frameColor.startsWith("bg-") ? frameColor : ""
              }`}
              style={{
                ...getStripContainerStyle(layoutId),
                ...(!frameColor.startsWith("bg-")
                  ? { backgroundColor: frameColor }
                  : {}),
              }}
              onClick={() => setSelectedStickerId(null)}
            >
              {/* SVG defs untuk clip-path love — pakai objectBoundingBox agar
                  otomatis scale sesuai ukuran element, bukan fixed pixel */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id="bs-clip-love" clipPathUnits="objectBoundingBox">
                    {/* Path heart dalam koordinat 0-1 (objectBoundingBox) */}
                    <path d="M 0.5 0.9 C 0.25 0.7, 0 0.5, 0 0.3 C 0 0.12, 0.12 0.03, 0.28 0.03 C 0.38 0.03, 0.46 0.09, 0.5 0.18 C 0.54 0.09, 0.62 0.03, 0.72 0.03 C 0.88 0.03, 1 0.12, 1 0.3 C 1 0.5, 0.75 0.7, 0.5 0.9 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* ── PATTERN MOTIF LAYER (di bawah foto, di atas frame color) ── */}
              {activePatternMeta && (
                <img
                  src={activePatternMeta.src}
                  alt={activePatternMeta.label}
                  className="absolute inset-0 w-full h-full pointer-events-none object-cover z-4"
                  style={{ opacity: patternOpacity / 100 }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}

              <div style={getPhotosGridStyle(layoutId)}>
                {capturedImages.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden relative z-10 w-full ${getAspectRatioClass(layoutId)}`}
                    style={getPhotoStyle(i)}
                  >
                    <img
                      src={src}
                      alt={`Foto ${i + 1}`}
                      className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
                      style={{
                        transform: `scale(${getPhotoScale(i) / 100})`,
                        transformOrigin: "center",
                      }}
                    />
                  </div>
                ))}
              </div>

              {activeTheme !== "none" && (
                <Themes
                  activeTheme={activeTheme}
                  themeMeta={THEME_META[activeTheme]}
                  layoutId={layoutId}
                />
              )}

              {/* ── STIKER OVERLAY ── */}
              {placedStickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className={`absolute z-40 group cursor-grab active:cursor-grabbing select-none ${selectedStickerId === sticker.id ? "ring-2 ring-white ring-offset-1" : ""}`}
                  style={{
                    top: `${sticker.top}%`,
                    left: `${sticker.left}%`,
                    fontSize: sticker.src ? undefined : `${sticker.size}px`,
                    width: sticker.src ? `${sticker.size}px` : undefined,
                    height: sticker.src ? `${sticker.size}px` : undefined,
                    lineHeight: 1,
                    userSelect: "none",
                    borderRadius: sticker.src ? "4px" : undefined,
                  }}
                  onMouseDown={(e) => {
                    handleStickerMouseDown(e, sticker.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStickerId(sticker.id);
                  }}
                >
                  {sticker.src ? (
                    <img
                      src={sticker.src}
                      alt={sticker.emoji}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        pointerEvents: "none",
                      }}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <span style={{ display: "block" }}>{sticker.emoji}</span>
                  )}
                  {/* Tombol hapus */}
                  <button
                    className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold items-center justify-center hidden group-hover:flex z-50 shadow"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSticker(sticker.id);
                    }}
                  >
                    ×
                  </button>
                  {/* Tombol resize kecil */}
                  {selectedStickerId === sticker.id && (
                    <>
                      <button
                        className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          resizeSticker(sticker.id, -8);
                        }}
                      >
                        −
                      </button>
                      <button
                        className="absolute -bottom-2 -right-5 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          resizeSticker(sticker.id, 8);
                        }}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="w-full md:w-[400px] shrink-0 flex flex-col bg-white/80 border border-pink-100 rounded-2xl shadow-sm backdrop-blur-sm overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-5 border-b border-pink-50">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-all duration-150 ${
                  activeSection === tab.id
                    ? "bg-rose-50 text-rose-500 border-b-2 border-rose-400"
                    : "text-rose-300 hover:text-rose-400 hover:bg-rose-50/50"
                }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="p-5 overflow-y-auto flex-1"
            style={{ maxHeight: "calc(100vh - 300px)", scrollbarWidth: "none" }}
          >
            {/* ══════════ TAB WARNA ══════════ */}
            {activeSection === "warna" && (
              <div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
                  Warna Frame
                </p>
                <div className="flex flex-wrap gap-2">
                  {/* Color picker */}
                  <div
                    className={`relative w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 shrink-0 cursor-pointer overflow-hidden ${
                      !frameColor.startsWith("bg-")
                        ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
                        : "border border-black/5"
                    }`}
                  >
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background:
                          "conic-gradient(#ffadad,#ffd6a5,#fdffb6,#caffbf,#9bf6ff,#bdb2ff,#ffc6ff,#ffadad)",
                      }}
                    />
                    <input
                      type="color"
                      value={
                        !frameColor.startsWith("bg-") ? frameColor : "#ffffff"
                      }
                      onChange={(e) => setFrameColor(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {SOLID_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFrameColor(c)}
                      className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${c} ${
                        frameColor === c
                          ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
                          : "border border-black/5"
                      }`}
                    />
                  ))}
                  {PATTERN_COLORS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setFrameColor(p)}
                      className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${p} ${
                        frameColor === p
                          ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
                          : "border border-black/5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ══════════ TAB DESAIN (TEMA) ══════════ */}
            {activeSection === "desain" && (
              <div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
                  Tema Spesial
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3">
                  <button
                    onClick={() => handleThemeSelect("none")}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium ${
                      activeTheme === "none"
                        ? "border-rose-400 bg-rose-50 shadow-sm"
                        : "border-pink-100 hover:border-rose-200 bg-white/60"
                    }`}
                  >
                    <span className="text-rose-400">None</span>
                  </button>
                  {Object.entries(THEME_META).map(([id, theme]) => {
                    if (!theme.files?.[layoutId]) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handleThemeSelect(id)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors duration-200 ${
                          activeTheme === id
                            ? "border-rose-400 shadow-md ring-2 ring-rose-200/50"
                            : "border-pink-100 hover:border-rose-200"
                        }`}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={theme.thumbnail}
                            alt={theme.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/placeholder-theme.png";
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent py-1">
                            <p className="text-[9px] sm:text-[10px] font-medium text-white text-center drop-shadow-sm">
                              {theme.label}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══════════ TAB MOTIF / PATTERN ══════════ */}
            {activeSection === "motif" && (
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3 flex items-center justify-between">
                    Motif Background
                    <button
                      onClick={() => setActivePattern(null)}
                      className="text-xs text-rose-400 hover:text-rose-500 normal-case"
                    >
                      Hapus Motif
                    </button>
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {PATTERN_LIST.map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => setActivePattern(pattern.id)}
                        className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 border-2 ${
                          activePattern === pattern.id
                            ? "bg-rose-50 border-rose-400 shadow-md ring-2 ring-rose-200/50 scale-105"
                            : "bg-white border-pink-100 hover:border-rose-200 hover:bg-rose-50/50"
                        }`}
                      >
                        <span className="text-xl">{pattern.emoji}</span>
                        <span className="text-[9px] font-medium text-rose-400">
                          {pattern.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opacity Control */}
                {activePattern && (
                  <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-rose-400">
                        Transparansi Motif
                      </p>
                      <span className="text-xs text-rose-300">
                        {patternOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={patternOpacity}
                      onChange={(e) =>
                        setPatternOpacity(Number(e.target.value))
                      }
                      className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* ══════════ TAB BENTUK ══════════ */}
            {activeSection === "bentuk" && (
              <div className="flex flex-col gap-5">
                {/* -- Radius Slider -- */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
                      Kelengkungan
                    </p>
                    <span className="text-[11px] font-medium text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                      {radiusAmount}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={64}
                    value={radiusAmount}
                    onChange={(e) => setRadiusAmount(Number(e.target.value))}
                    className="w-full accent-rose-400 h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-rose-200 mt-1">
                    <span>Lurus</span>
                    <span>Melengkung</span>
                  </div>
                </div>

                {/* -- Global Shape -- */}
                <div>
                  <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-2">
                    Bentuk Semua Foto
                  </p>
                  {/* Tombol Global Shape */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {GLOBAL_SHAPES.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setGlobalShape(shape.id)}
                        className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 ${
                          globalShape === shape.id
                            ? "border-rose-400 bg-rose-50 text-rose-500 shadow-md ring-2 ring-rose-200/50 scale-105"
                            : "border-pink-100 text-rose-300 hover:border-rose-200 hover:bg-rose-50/50"
                        }`}
                      >
                        <span className="text-xl leading-none">
                          {shape.icon}
                        </span>
                        <span className="text-[10px] font-medium">
                          {shape.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* -- Global Scale -- */}
                {["love", "star", "hexagon", "circle"].includes(
                  globalShape,
                ) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
                        Zoom / Ukuran Foto
                      </p>
                      <span className="text-[11px] font-medium text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                        {globalScale}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={200}
                      value={globalScale}
                      onChange={(e) => setGlobalScale(Number(e.target.value))}
                      className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                    />
                  </div>
                )}

                {/* -- Per-Frame Shape (kalau lebih dari 1 foto) -- */}
                {capturedImages.length > 1 && (
                  <div>
                    <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-1">
                      Bentuk Per Foto
                    </p>
                    <p className="text-[9px] text-rose-200 mb-3">
                      Pilih foto → lalu pilih bentuknya
                    </p>

                    {/* Miniatur pilih frame */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {capturedImages.map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setSelectedFrame(selectedFrame === idx ? null : idx)
                          }
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors duration-150 ${
                            selectedFrame === idx
                              ? "border-rose-400 ring-2 ring-rose-200 shadow-md"
                              : "border-pink-100 hover:border-rose-200"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`Frame ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[8px] text-white text-center py-0.5">
                            {idx + 1}
                          </div>
                          {perFrameShapes[idx] && (
                            <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-rose-500 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Shape selector untuk frame terpilih */}
                    {selectedFrame !== null && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-[9px] font-medium text-rose-400 mb-2">
                            Bentuk Foto #{selectedFrame + 1}:
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {/* Tombol reset ke global */}
                            <button
                              onClick={() => {
                                setPerFrameShapes((prev) => {
                                  const next = { ...prev };
                                  delete next[selectedFrame];
                                  return next;
                                });
                                setPerFrameAmounts((prev) => {
                                  const next = { ...prev };
                                  delete next[selectedFrame];
                                  return next;
                                });
                                setPerFrameScales((prev) => {
                                  const next = { ...prev };
                                  delete next[selectedFrame];
                                  return next;
                                });
                              }}
                              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-[9px] font-medium transition-all duration-150 ${
                                perFrameShapes[selectedFrame] === undefined
                                  ? "border-rose-400 bg-rose-50 text-rose-500 shadow-sm"
                                  : "border-pink-100 text-rose-300 hover:border-rose-200"
                              }`}
                            >
                              <span className="text-base">↩</span>
                              <span>Global</span>
                            </button>

                            {GLOBAL_SHAPES.filter((s) => s.id !== "none").map(
                              (shape) => (
                                <button
                                  key={shape.id}
                                  onClick={() => {
                                    setPerFrameShapes((prev) => ({
                                      ...prev,
                                      [selectedFrame]: shape.id,
                                    }));
                                    // Set default amount saat bentuk dpilih
                                    setPerFrameAmounts((prev) => ({
                                      ...prev,
                                      [selectedFrame]: 16,
                                    }));
                                  }}
                                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-[9px] font-medium transition-all duration-150 ${
                                    perFrameShapes[selectedFrame] === shape.id
                                      ? "border-rose-400 bg-rose-50 text-rose-500 shadow-sm"
                                      : "border-pink-100 text-rose-300 hover:border-rose-200 hover:bg-rose-50/50"
                                  }`}
                                >
                                  <span className="text-base leading-none">
                                    {shape.icon}
                                  </span>
                                  <span>{shape.label}</span>
                                </button>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Slider Modifier Untuk Frame Terpilih */}
                        {perFrameShapes[selectedFrame] !== undefined &&
                          perFrameShapes[selectedFrame] !== "none" && (
                            <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-[10px] font-medium text-rose-400">
                                  Ukuran Lengkung / Motif (Foto #
                                  {selectedFrame + 1})
                                </p>
                                <span className="text-[10px] text-rose-300">
                                  {perFrameAmounts[selectedFrame] !== undefined
                                    ? perFrameAmounts[selectedFrame]
                                    : radiusAmount}
                                </span>
                              </div>
                              <input
                                type="range"
                                min="2"
                                max="40"
                                value={
                                  perFrameAmounts[selectedFrame] !== undefined
                                    ? perFrameAmounts[selectedFrame]
                                    : radiusAmount
                                }
                                onChange={(e) => {
                                  setPerFrameAmounts((prev) => ({
                                    ...prev,
                                    [selectedFrame]: Number(e.target.value),
                                  }));
                                }}
                                className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                              />
                            </div>
                          )}

                        {perFrameShapes[selectedFrame] &&
                          ["love", "star", "hexagon", "circle"].includes(
                            perFrameShapes[selectedFrame],
                          ) && (
                            <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100 mt-2">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-[10px] font-medium text-rose-400">
                                  Zoom Foto #{selectedFrame + 1}
                                </p>
                                <span className="text-[10px] text-rose-300">
                                  {perFrameScales[selectedFrame] !== undefined
                                    ? perFrameScales[selectedFrame]
                                    : globalScale}
                                  %
                                </span>
                              </div>
                              <input
                                type="range"
                                min="50"
                                max="200"
                                value={
                                  perFrameScales[selectedFrame] !== undefined
                                    ? perFrameScales[selectedFrame]
                                    : globalScale
                                }
                                onChange={(e) => {
                                  setPerFrameScales((prev) => ({
                                    ...prev,
                                    [selectedFrame]: Number(e.target.value),
                                  }));
                                }}
                                className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                              />
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ══════════ TAB STIKER ══════════ */}
            {activeSection === "stiker" && (
              <div className="flex flex-col gap-4">
                {/* Sub-tab: Emoji / Image / Upload */}
                <div className="flex gap-1 bg-rose-50 rounded-xl p-1">
                  {[
                    { id: "emoji", label: "😊 Emoji" },
                    { id: "image", label: "🐥 Kartun" },
                    { id: "upload", label: "📤 Upload" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setStickerTab(t.id)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                        stickerTab === t.id
                          ? "bg-white text-rose-500 shadow-sm"
                          : "text-rose-300 hover:text-rose-400"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* -- Emoji stickers -- */}
                {stickerTab === "emoji" && (
                  <div>
                    <p className="text-[9px] text-rose-200 mb-2">
                      Klik → muncul di foto. Drag untuk pindah.
                    </p>
                    <div className="grid grid-cols-8 gap-1">
                      {EMOJI_STICKERS.map((emoji, i) => (
                        <button
                          key={i}
                          onClick={() => addSticker(emoji, null)}
                          className="aspect-square flex items-center justify-center text-xl rounded-lg border border-pink-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-100 hover:scale-110 active:scale-95"
                          title={emoji}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* -- Image stickers (kartun) -- */}
                {stickerTab === "image" && (
                  <div>
                    <p className="text-[9px] text-rose-200 mb-2">
                      Stiker kartun & cute. Klik untuk tambah ke foto.
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {IMAGE_STICKERS.map((stk, i) => (
                        <button
                          key={i}
                          onClick={() => addSticker(stk.label, stk.src)}
                          className="aspect-square flex flex-col items-center justify-center gap-0.5 rounded-xl border border-pink-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-100 hover:scale-105 active:scale-95 p-1 overflow-hidden"
                          title={stk.label}
                        >
                          <img
                            src={stk.src}
                            alt={stk.label}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                            crossOrigin="anonymous"
                          />
                          <span className="text-[8px] text-rose-300 truncate w-full text-center">
                            {stk.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* -- Upload sticker -- */}
                {stickerTab === "upload" && (
                  <div>
                    <p className="text-[9px] text-rose-200 mb-2">
                      Upload gambar PNG/JPG/WebP/GIF untuk dijadikan stiker.
                    </p>
                    <button
                      onClick={() => stickerInputRef.current?.click()}
                      className="w-full py-3 rounded-xl border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50 text-rose-400 text-sm font-medium transition-all flex flex-col items-center gap-1"
                    >
                      <span className="text-2xl">📤</span>
                      <span className="text-[11px]">Pilih Gambar Stiker</span>
                      <span className="text-[9px] text-rose-300">
                        PNG, JPG, WebP, GIF
                      </span>
                    </button>
                    <input
                      ref={stickerInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleStickerUpload}
                    />
                    {customStickers.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[9px] font-semibold text-rose-300 uppercase tracking-widest mb-2">
                          Stiker Kamu ({customStickers.length})
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {customStickers.map((stk, i) => (
                            <button
                              key={i}
                              onClick={() => addSticker(stk.label, stk.src)}
                              className="relative aspect-square rounded-xl border border-pink-100 hover:border-rose-300 overflow-hidden hover:scale-105 transition-all group"
                            >
                              <img
                                src={stk.src}
                                alt={stk.label}
                                className="w-full h-full object-contain p-0.5"
                              />
                              {/* Remove from library */}
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCustomStickers((p) =>
                                    p.filter((_, idx) => idx !== i),
                                  );
                                }}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold hidden group-hover:flex items-center justify-center"
                              >
                                ×
                              </button>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Stiker aktif + resize per sticker */}
                {placedStickers.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
                        Stiker di Foto ({placedStickers.length})
                      </p>
                      <button
                        onClick={() => {
                          setPlacedStickers([]);
                          setSelectedStickerId(null);
                        }}
                        className="text-[9px] text-rose-300 hover:text-rose-500 underline transition-colors"
                      >
                        Hapus Semua
                      </button>
                    </div>

                    {/* List sticker aktif dengan kontrol resize */}
                    <div className="flex flex-col gap-2">
                      {placedStickers.map((sticker) => (
                        <div
                          key={sticker.id}
                          onClick={() =>
                            setSelectedStickerId(
                              sticker.id === selectedStickerId
                                ? null
                                : sticker.id,
                            )
                          }
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border cursor-pointer transition-all ${
                            selectedStickerId === sticker.id
                              ? "border-rose-400 bg-rose-50 shadow-sm"
                              : "border-pink-100 hover:border-rose-200 bg-white/50"
                          }`}
                        >
                          {/* Preview */}
                          <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-rose-50 rounded-lg overflow-hidden">
                            {sticker.src ? (
                              <img
                                src={sticker.src}
                                alt=""
                                className="w-8 h-8 object-contain"
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <span className="text-xl">{sticker.emoji}</span>
                            )}
                          </div>
                          {/* Resize controls */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-rose-300 mb-1 truncate">
                              {sticker.src ? sticker.emoji : sticker.emoji} ·{" "}
                              {sticker.size}px
                            </p>
                            <div className="flex items-center gap-1.5">
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resizeSticker(sticker.id, -8);
                                }}
                                className="w-6 h-6 rounded-full bg-white border border-rose-200 text-rose-400 font-bold text-sm flex items-center justify-center hover:bg-rose-50 shrink-0"
                              >
                                −
                              </button>
                              <input
                                type="range"
                                min={20}
                                max={200}
                                value={sticker.size}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setStickerSize(
                                    sticker.id,
                                    Number(e.target.value),
                                  );
                                }}
                                className="flex-1 accent-rose-400 h-1 cursor-pointer"
                              />
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resizeSticker(sticker.id, 8);
                                }}
                                className="w-6 h-6 rounded-full bg-white border border-rose-200 text-rose-400 font-bold text-sm flex items-center justify-center hover:bg-rose-50 shrink-0"
                              >
                                +
                              </button>
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSticker(sticker.id);
                                }}
                                className="w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-sm flex items-center justify-center hover:bg-red-200 shrink-0"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {placedStickers.length === 0 && (
                  <div className="text-center py-6 text-rose-200 text-xs">
                    <div className="text-3xl mb-2">🎀</div>
                    Belum ada stiker. Klik stiker di atas!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BOTTOM BAR */}
          <div className="p-4 border-t border-pink-50 bg-white/60 flex gap-2.5">
            <button
              onClick={() => navigate("/capture")}
              className="flex-1 py-2.5 rounded-xl bg-white border border-pink-100 text-rose-400 text-sm font-medium hover:border-rose-200 hover:text-rose-500 transition-all"
            >
              ↩ Foto Ulang
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm shadow-pink-200 disabled:opacity-60"
            >
              {isDownloading ? "Menyimpan..." : "Unduh"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;

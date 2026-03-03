import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import ThemeSpotifyV1 from "../components/ThemeSpotifyV1";
import ThemeSpotifyV2 from "../components/ThemeSpotifyV2";
import ThemeSpotifyV3 from "../components/ThemeSpotifyV3";
import ThemeNailongV1 from "../components/ThemeNailongV1";
import ThemeMyBoyfriend from "../components/ThemeMyBoyfriend";
import { toPng, toJpeg } from "html-to-image";

const FILTER_CLASSES = {
  Normal: "",
  Lembut: "contrast-75 brightness-110 saturate-50",
  Bright: "brightness-125 contrast-110 saturate-125",
  Warm: "sepia-[.3] contrast-110 saturate-150",
  Cool: "hue-rotate-15 contrast-105 saturate-110",
  "B&W Classic": "grayscale",
  "B&W Dark": "grayscale contrast-125 brightness-75",
  "B&W Fade": "grayscale contrast-75 brightness-125",
  Sepia: "sepia",
  Retro:
    "sepia-[.5] hue-rotate-[-30deg] contrast-110 saturate-150 brightness-90",
  Faded: "contrast-50 brightness-125 saturate-50",
  Vintage: "sepia-[.4] contrast-125 brightness-90 saturate-50",
  Cinematic: "contrast-125 saturate-50 brightness-90 hue-rotate-15",
  Neon: "saturate-200 contrast-125 hue-rotate-45",
  Sunset: "sepia-[.4] saturate-200 contrast-110 hue-rotate-[-15deg]",
};

const SOLID_COLORS = [
  "bg-white",
  "bg-black",
  "bg-[#ffb6c1]",
  "bg-[#add8e6]",
  "bg-[#e6e6fa]",
  "bg-[#fffacd]",
  "bg-[#ffebcd]",
  "bg-[#2e8b57]",
  "bg-[#808080]",
  "bg-[#000000]",
  "bg-[#191970]",
  "bg-[#800000]",
  "bg-[#ffc0cb]",
  "bg-[#3e2723]",
];

const PATTERN_COLORS = [
  "bg-gradient-to-r from-pink-200 to-pink-100",
  "bg-gradient-to-tr from-green-200 to-blue-200",
  "bg-gradient-to-bl from-gray-700 to-black",
  "bg-gradient-to-r from-gray-100 to-gray-300",
  "bg-gradient-to-br from-blue-300 to-purple-400",
  "bg-gradient-to-tl from-yellow-200 to-green-200",
  "bg-gradient-to-r from-purple-300 to-pink-300",
];

const PATTERN_DESIGNS = [
  "bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-white",
  "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blue-100",
];

const THEME_META = {
  themespotifyv1: {
    label: "Spotify Dark",
    emoji: "🎵",
    bg: "#181818",
    defaultColor: "bg-[#181818]",
  },
  themespotifyv2: {
    label: "Spotify Pink",
    emoji: "🌸",
    bg: "#ff9fbb",
    defaultColor: "bg-[#ff9fbb]",
  },
  themespotifyv3: {
    label: "Spotify Coffee",
    emoji: "☕",
    bg: "#824a41",
    defaultColor: "bg-[#cca88a]",
  },
  themenailongv1: {
    label: "Nailong",
    emoji: "🐣",
    bg: "#d4c058",
    defaultColor: "bg-[#f5e4a0]",
  },
  thememybf: {
    label: "My Boyfriend",
    emoji: "💜",
    bg: "#c9a8e0",
    defaultColor: "bg-[#e9daef]",
  },
};

const STICKER_LIST = [
  "❤️",
  "🎀",
  "✨",
  "🍒",
  "🌸",
  "🦋",
  "🧸",
  "🐶",
  "🐱",
  "🐰",
  "🍓",
  "🍉",
  "🌈",
  "🔥",
  "😎",
  "💋",
  "🎉",
  "👑",
  "🍀",
  "💎",
  "⭐",
  "🎵",
  "🎧",
  "🖤",
  "💙",
  "❄️",
  "🩷",
  "💌",
];

const THEME_PADDING_CONFIG = {
  themespotifyv1: { pt: 40, pb: 130, rounded: "rounded-lg" },
  themespotifyv2: { pt: 56, pb: 200, rounded: "rounded-2xl" },
  themespotifyv3: { pt: 56, pb: 200, rounded: "rounded-2xl" },
  themenailongv1: { pt: 44, pb: 135, rounded: "rounded-lg" },
  thememybf: { pt: 56, pb: 80, rounded: "rounded-2xl" },
};

const THEME_PADDING_HORIZONTAL = {
  themespotifyv1: { pt: 50, pb: 140, rounded: "rounded-lg" },
  themespotifyv2: { pt: 50, pb: 160, rounded: "rounded-lg" },
  themespotifyv3: { pt: 50, pb: 160, rounded: "rounded-lg" },
  themenailongv1: { pt: 50, pb: 160, rounded: "rounded-lg" },
  thememybf: { pt: 50, pb: 160, rounded: "rounded-lg" },
};

const THEME_PADDING_GRID = {
  themespotifyv1: { pt: 50, pb: 110, rounded: "" },
  themespotifyv2: { pt: 48, pb: 170, rounded: "rounded-2xl" },
  themespotifyv3: { pt: 48, pb: 170, rounded: "rounded-2xl" },
  themenailongv1: { pt: 40, pb: 110, rounded: "rounded-lg" },
  thememybf: { pt: 48, pb: 70, rounded: "rounded-2xl" },
};

const getStripPadding = (activeTheme, layoutId) => {
  let cfgMap = THEME_PADDING_CONFIG;
  if (layoutId === "2-horizontal") cfgMap = THEME_PADDING_HORIZONTAL;
  else if (["4-grid", "6-grid", "9-grid"].includes(layoutId))
    cfgMap = THEME_PADDING_GRID;

  const cfg = cfgMap[activeTheme];
  if (!cfg) return { className: "p-3 pb-12 rounded-md", style: {} };

  // FUNGSI SAKTI: Tambahin px-6 buat dorong foto ke tengah biar gak mepet pinggir
  const paddingClass = layoutId === "2-horizontal" ? "px-4 py-3" : "p-3";

  return {
    className: `${paddingClass} ${cfg.rounded}`,
    style: { paddingTop: `${cfg.pt}px`, paddingBottom: `${cfg.pb}px` },
  };
};

const getPhotoWidthClass = (activeTheme, layoutId) => {
  // Foto otomatis dikecilin jadi w-[90%] buat layout horizontal biar pas di dalam container tema
  if (
    [
      "themespotifyv2",
      "themespotifyv3",
      "themenailongv1",
      "thememybf",
    ].includes(activeTheme)
  ) {
    return layoutId === "2-horizontal" ? "w-[100%]" : "w-[88%]";
  }
  return "w-full";
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { capturedImages, activeFilter, layoutId } = location.state || {
    capturedImages: [],
    activeFilter: "Normal",
    layoutId: "3-vertical",
  };

  const [frameColor, setFrameColor] = useState("bg-[#181818]");
  const [activeTheme, setActiveTheme] = useState("themespotifyv1");
  const [placedStickers, setPlacedStickers] = useState([]);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [shapeType, setShapeType] = useState("all");
  const [radiusAmount, setRadiusAmount] = useState(8);
  const [activeSection, setActiveSection] = useState("warna");

  const stripRef = useRef(null);

  const handleDownload = async (format) => {
    setShowDownloadMenu(false);
    const el = document.getElementById("photo-strip");
    if (!el) return;
    try {
      const dataUrl =
        format === "png"
          ? await toPng(el, { pixelRatio: 3 })
          : await toJpeg(el, { quality: 0.92, pixelRatio: 3 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `BeautySnap-${Date.now()}.${format}`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("Gagal download, coba lagi!");
    }
  };

  const getDynamicPhotoStyle = (index, total) => {
    const r = `${radiusAmount}px`;
    switch (shapeType) {
      case "all":
        return { borderRadius: r };
      case "top":
        return { borderTopLeftRadius: r, borderTopRightRadius: r };
      case "bottom":
        return { borderBottomLeftRadius: r, borderBottomRightRadius: r };
      case "strip":
        if (total === 1) return { borderRadius: r };
        if (index === 0)
          return { borderTopLeftRadius: r, borderTopRightRadius: r };
        if (index === total - 1)
          return { borderBottomLeftRadius: r, borderBottomRightRadius: r };
        return { borderRadius: 0 };
      default:
        return { borderRadius: r };
    }
  };

  const addSticker = (sticker) => {
    setPlacedStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji: sticker,
        top: 20 + Math.random() * 60,
        left: 20 + Math.random() * 60,
      },
    ]);
  };

  const getStickerSize = () => {
    if (layoutId === "2-horizontal") return "text-base";
    if (layoutId === "9-grid") return "text-2xl";
    if (layoutId === "6-grid") return "text-xl";
    return "text-lg";
  };

  const getStripLayoutClass = () => {
    switch (layoutId) {
      case "2-horizontal":
        return "grid grid-cols-2 gap-3 w-[400px] max-w-full justify-center";
      case "3-vertical":
      case "4-vertical":
        return "flex flex-col gap-2 w-[240px]";
      case "4-grid":
      case "6-grid":
        return "grid grid-cols-2 gap-2 w-[320px]";
      case "9-grid":
        return "grid grid-cols-3 gap-1 w-[380px]";
      default:
        return "flex flex-col gap-2 w-[240px]";
    }
  };

  const handleThemeSelect = (key) => {
    const newTheme = activeTheme === key ? "none" : key;
    setActiveTheme(newTheme);
    if (THEME_META[newTheme]) setFrameColor(THEME_META[newTheme].defaultColor);
  };

  if (!capturedImages || capturedImages.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{
          background: "linear-gradient(135deg,#fdf4ff,#fce7f3,#ede9fe)",
        }}
      >
        <span className="text-6xl">📷</span>
        <h2 className="text-2xl font-extrabold text-gray-800">
          Belum ada foto nih!
        </h2>
        <p className="text-gray-500 text-sm">Yuk mulai sesi foto dulu.</p>
        <button
          onClick={() => navigate("/capture")}
          className="mt-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
        >
          Mulai Foto 📸
        </button>
      </div>
    );
  }

  const TABS = [
    { id: "warna", label: "Warna", icon: "🎨" },
    { id: "desain", label: "Desain", icon: "✨" },
    { id: "bentuk", label: "Bentuk", icon: "🔲" },
    { id: "stiker", label: "Stiker", icon: "🎀" },
  ];

  const stripPadding = getStripPadding(activeTheme, layoutId);
  const photoWidthClass = getPhotoWidthClass(activeTheme, layoutId);

  return (
    <div
      className="min-h-screen font-sans flex flex-col pt-8 relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg,#fdf4ff 0%,#fce7f3 50%,#ede9fe 100%)",
      }}
    >
      <Navbar />

      <div className="w-full text-center mt-20 mb-2 z-10 px-4">
        <h1 className="text-lg font-black text-gray-800 tracking-tight">
          ✨ Hasil Foto Strip Kamu
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Edit & download foto strip-mu di bawah ini
        </p>
      </div>

      <main className="flex-1 flex flex-col md:flex-row items-start justify-center gap-6 md:gap-10 px-4 md:px-8 py-6 max-w-6xl mx-auto w-full z-10">
        <div className="w-full md:w-auto flex flex-col items-center gap-4 shrink-0">
          <div className="relative">
            <div
              className="absolute inset-0 -m-8 blur-3xl opacity-25 rounded-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg,#fda4af,#c084fc,#60a5fa)",
              }}
            />

            <div
              id="photo-strip"
              ref={stripRef}
              className={`relative transition-all duration-300 overflow-hidden shadow-2xl ${getStripLayoutClass()} ${stripPadding.className} ${frameColor.startsWith("bg-") ? frameColor : ""}`}
              style={{
                ...stripPadding.style,
                ...(!frameColor.startsWith("bg-")
                  ? { backgroundColor: frameColor }
                  : {}),
              }}
            >
              {capturedImages.map((src, i) => (
                <div
                  key={i}
                  className={`mx-auto aspect-[4/3] overflow-hidden shadow-sm transition-all duration-300 relative z-10 ${photoWidthClass} ${!THEME_PADDING_CONFIG[activeTheme] ? "bg-gray-200" : ""}`}
                  style={getDynamicPhotoStyle(i, capturedImages.length)}
                >
                  {/* DI SINI object-contain BIKIN OBS NENGAH SEMPURNA */}
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
                  />
                </div>
              ))}

              {activeTheme === "themespotifyv1" && (
                <ThemeSpotifyV1 frameColor={frameColor} layoutId={layoutId} />
              )}
              {activeTheme === "themespotifyv2" && (
                <ThemeSpotifyV2 layoutId={layoutId} />
              )}
              {activeTheme === "themespotifyv3" && (
                <ThemeSpotifyV3 layoutId={layoutId} />
              )}
              {activeTheme === "themenailongv1" && (
                <ThemeNailongV1 layoutId={layoutId} />
              )}
              {activeTheme === "thememybf" && (
                <ThemeMyBoyfriend layoutId={layoutId} />
              )}

              {placedStickers.map((s) => (
                <div
                  key={s.id}
                  className={`absolute drop-shadow-md z-40 touch-none transition-transform ${getStickerSize()} ${draggingSticker === s.id ? "cursor-grabbing scale-125" : "cursor-grab hover:scale-110"}`}
                  style={{
                    top: `${s.top}%`,
                    left: `${s.left}%`,
                    transform: "translate(-50%,-50%)",
                  }}
                  onPointerDown={(e) => {
                    setDraggingSticker(s.id);
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => {
                    if (draggingSticker !== s.id || !stripRef.current) return;
                    const rect = stripRef.current.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setPlacedStickers((prev) =>
                      prev.map((item) =>
                        item.id === s.id
                          ? {
                              ...item,
                              left: Math.max(5, Math.min(95, x)),
                              top: Math.max(2, Math.min(95, y)),
                            }
                          : item,
                      ),
                    );
                  }}
                  onPointerUp={(e) => {
                    setDraggingSticker(null);
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }}
                  onPointerCancel={() => setDraggingSticker(null)}
                >
                  {s.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[420px] shrink-0 flex flex-col bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl shadow-pink-100/40 overflow-hidden">
          <div className="grid grid-cols-4 border-b border-gray-100/80">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex flex-col items-center gap-1 py-3.5 text-[11px] font-bold transition-all duration-200 ${
                  activeSection === tab.id
                    ? "bg-rose-50 text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/80"
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="p-5 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 280px)", scrollbarWidth: "none" }}
          >
            {activeSection === "warna" && (
              <div>
                <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-widest">
                  Warna Frame
                </p>
                <div className="flex flex-wrap gap-2">
                  <div
                    className={`relative w-9 h-9 rounded-full shadow-sm transition-transform hover:scale-110 shrink-0 cursor-pointer overflow-hidden ${!frameColor.startsWith("bg-") ? "ring-2 ring-offset-2 ring-rose-400 scale-110" : "border border-black/5"}`}
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
                      className={`w-9 h-9 rounded-full shadow-sm transition-all hover:scale-110 ${c} ${frameColor === c ? "ring-2 ring-offset-2 ring-rose-400 scale-110" : "border border-black/5"}`}
                    />
                  ))}
                  {PATTERN_COLORS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setFrameColor(p)}
                      className={`w-9 h-9 rounded-full shadow-sm transition-all hover:scale-110 ${p} ${frameColor === p ? "ring-2 ring-offset-2 ring-rose-400 scale-110" : "border border-black/5"}`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-300 mt-3">
                  Klik 🌈 untuk warna kustom
                </p>
              </div>
            )}

            {activeSection === "desain" && (
              <div>
                <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-widest">
                  Tema Spesial
                </p>
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {Object.entries(THEME_META).map(([key, meta]) => {
                    const isActive = activeTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleThemeSelect(key)}
                        className={`relative flex items-center gap-3 px-3.5 py-3 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${isActive ? "border-rose-400 shadow-md shadow-rose-100 scale-[1.02]" : "border-gray-100 bg-white/70 hover:border-rose-200"}`}
                        style={isActive ? { background: `${meta.bg}18` } : {}}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm"
                          style={{ backgroundColor: meta.bg }}
                        >
                          {meta.emoji}
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-gray-800 leading-tight">
                            {meta.label}
                          </div>
                          {isActive && (
                            <div className="text-[10px] text-rose-500 font-bold mt-0.5">
                              ✓ Aktif
                            </div>
                          )}
                        </div>
                        {isActive && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400" />
                        )}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setActiveTheme("none")}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl border-2 transition-all hover:scale-[1.02] ${activeTheme === "none" ? "border-gray-400 bg-gray-50 shadow-sm" : "border-gray-100 bg-white/70 hover:border-gray-300"}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0">
                      🚫
                    </div>
                    <div className="text-xs font-extrabold text-gray-600">
                      Tanpa Tema
                    </div>
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-widest">
                  Pola / Tekstur
                </p>
                <div className="flex gap-3">
                  {PATTERN_DESIGNS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setFrameColor(p);
                        setActiveTheme("none");
                      }}
                      className={`flex-1 h-12 rounded-2xl border-2 transition-all hover:scale-105 bg-cover bg-center ${p} ${frameColor === p ? "border-rose-400 scale-105 shadow-md" : "border-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeSection === "bentuk" && (
              <div>
                <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-widest">
                  Sudut Foto
                </p>
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { id: "all", label: "Semua", cls: "rounded-lg" },
                    { id: "top", label: "Atas", cls: "rounded-t-lg" },
                    { id: "bottom", label: "Bawah", cls: "rounded-b-lg" },
                    {
                      id: "strip",
                      label: "Ujung",
                      cls: "rounded-t-lg rounded-b-lg",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setShapeType(opt.id)}
                      className={`flex flex-col items-center gap-2 py-3 rounded-2xl border-2 transition-all ${shapeType === opt.id ? "border-rose-400 bg-rose-50 shadow-sm" : "border-gray-100 bg-white/70 hover:border-rose-200"}`}
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-br from-rose-300 to-pink-400 border-2 ${opt.cls} ${shapeType === opt.id ? "border-rose-400" : "border-rose-200"}`}
                      />
                      <span
                        className={`text-[10px] font-bold ${shapeType === opt.id ? "text-rose-500" : "text-gray-400"}`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-widest">
                  Kelengkungan
                </p>
                <div className="bg-white/60 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-gray-500">
                      Radius
                    </span>
                    <span className="text-xs font-black text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                      {radiusAmount}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={radiusAmount}
                    onChange={(e) => setRadiusAmount(e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-rose-500 bg-gray-200"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-gray-300">Kotak</span>
                    <span className="text-[10px] text-gray-300">Bulat</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "stiker" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                    Tambah Stiker
                  </p>
                  {placedStickers.length > 0 && (
                    <button
                      onClick={() => setPlacedStickers([])}
                      className="text-[11px] text-gray-400 hover:text-rose-500 font-bold transition-colors flex items-center gap-1"
                    >
                      🗑 Hapus Semua
                    </button>
                  )}
                </div>
                {placedStickers.length > 0 && (
                  <div className="mb-3 px-3 py-2 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-400 font-medium flex items-center gap-2">
                    ☝️ Drag stiker di foto untuk memindahkan
                  </div>
                )}
                <div className="grid grid-cols-7 gap-1.5">
                  {STICKER_LIST.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => addSticker(s)}
                      className="aspect-square flex items-center justify-center text-xl bg-white/60 rounded-xl hover:bg-rose-50 hover:scale-110 transition-all border border-gray-100 shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100/80 bg-white/40 flex gap-3">
            <button
              onClick={() => navigate("/capture")}
              className="flex-1 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 text-sm font-bold hover:border-rose-300 hover:text-rose-500 transition-all shadow-sm"
            >
              ↩ Foto Ulang
            </button>
            <div className="flex-1 relative">
              <button
                onClick={() => setShowDownloadMenu((v) => !v)}
                className="w-full py-3 rounded-2xl text-white text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#f43f5e,#ec4899)",
                  boxShadow: "0 6px 20px -4px rgba(244,63,94,0.45)",
                }}
              >
                ⬇ Unduh <span className="text-[10px] opacity-70">▼</span>
              </button>
              {showDownloadMenu && (
                <div className="absolute bottom-[110%] right-0 w-44 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden z-50">
                  <button
                    onClick={() => handleDownload("png")}
                    className="w-full text-left px-4 py-3 hover:bg-rose-50 font-bold text-gray-700 text-sm border-b border-gray-100 flex items-center gap-2"
                  >
                    🖼️ Simpan .PNG
                  </button>
                  <button
                    onClick={() => handleDownload("jpg")}
                    className="w-full text-left px-4 py-3 hover:bg-rose-50 font-bold text-gray-700 text-sm flex items-center gap-2"
                  >
                    📸 Simpan .JPG
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;

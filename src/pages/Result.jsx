import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
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

// ─────────────────────────────────────────────────────────────────
// TEMA META
//
// ATURAN PENTING:
//   - "files" → HANYA isi layout yang BENAR-BENAR punya file PNG-nya.
//   - Layout yang tidak ada di "files" = tema otomatis N/A (tidak tersedia).
//   - Path harus PERSIS sama dengan nama folder & file di /public/themes/
//   - Nama folder case-sensitive! "3-Vertikal" ≠ "3-vertikal"
//
// CARA TAMBAH TEMA BARU:
//   namatema: {
//     label: "Nama Tampil",
//     defaultColor: "bg-[#hexwarna]",
//     thumbnail: "/themes/NamaFolder/NamaFile.png",  // gambar preview 160×160px
//     files: {
//       "layout-id": "/themes/NamaFolder/NamaFile.png",
//       // hanya isi layout yang sudah punya file PNG!
//     },
//   },
// ─────────────────────────────────────────────────────────────────
const THEME_META = {
  // ✅ PinkLove — HANYA untuk layout 2-horizontal
  pinklove: {
    label: "PinkLove",
    defaultColor: "bg-[#ff9fbb]",
    thumbnail: "/themes/2-Horizontal/PinkLove.png",
    files: {
      "2-horizontal": "/themes/2-Horizontal/PinkLove.png",
    },
  },

  // ✅ Nailong — HANYA untuk layout 3-vertical
  nailong: {
    label: "Nailong",
    defaultColor: "bg-[#FFDE59]",
    thumbnail: "/themes/3-Vertikal/Nailong.png",
    files: {
      "3-vertical": "/themes/3-Vertikal/Nailong.png",
    },
  },

  // Contoh tema yang support BANYAK layout sekaligus:
  // mytheme: {
  //   label: "My Theme",
  //   defaultColor: "bg-[#ffd6e0]",
  //   thumbnail: "/themes/MyTheme/thumbnail.png",
  //   files: {
  //     "3-vertical":   "/themes/MyTheme/3-Vertikal.png",
  //     "4-vertical":   "/themes/MyTheme/4-Vertikal.png",
  //     "2-horizontal": "/themes/MyTheme/2-Horizontal.png",
  //   },
  // },
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

const STRIP_PAD = 12;

const STRIP_SIZES = {
  "2-horizontal": { w: 300, cols: 2, gap: 8 },
  "3-vertical": { w: 180, cols: 1, gap: 6 },
  "4-vertical": { w: 180, cols: 1, gap: 6 },
  "4-grid": { w: 240, cols: 2, gap: 6 },
  "6-grid": { w: 240, cols: 2, gap: 6 },
  "9-grid": { w: 280, cols: 3, gap: 4 },
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
  const [placedStickers, setPlacedStickers] = useState([]);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [shapeType, setShapeType] = useState("all");
  const [radiusAmount, setRadiusAmount] = useState(0);
  const [activeSection, setActiveSection] = useState("desain");
  const [isDownloading, setIsDownloading] = useState(false);

  const stripRef = useRef(null);

  const handleDownload = async () => {
    const el = document.getElementById("photo-strip");
    if (!el) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(el, { pixelRatio: 3 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `BeautySnap-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("Gagal download, coba lagi!");
    } finally {
      setIsDownloading(false);
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
      { id: Date.now(), emoji: sticker, top: 50, left: 50 },
    ]);
  };

  const getStickerSize = () => {
    if (layoutId === "2-horizontal") return "text-sm";
    if (layoutId === "9-grid") return "text-xl";
    if (layoutId === "6-grid") return "text-lg";
    return "text-base";
  };

  const handleThemeSelect = (key) => {
    const newTheme = activeTheme === key ? "none" : key;
    setActiveTheme(newTheme);
    if (THEME_META[newTheme] && newTheme !== "none") {
      setFrameColor(THEME_META[newTheme].defaultColor);
    }
  };

  // ✅ Tema tersedia = file PNG untuk layoutId ini ADA di "files"
  const themeAvailableForLayout = (key) => !!THEME_META[key]?.files?.[layoutId];

  if (!capturedImages || capturedImages.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{
          background:
            "linear-gradient(180deg,#fff5f7 0%,#ffffff 30%,#fdf9ff 70%,#fff5f7 100%)",
        }}
      >
        <span className="text-5xl">📷</span>
        <h2 className="text-xl font-semibold text-zinc-800">Belum ada foto</h2>
        <p className="text-sm text-rose-300">Yuk mulai foto dulu!</p>
        <button
          onClick={() => navigate("/capture")}
          className="mt-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Mulai Foto
        </button>
      </div>
    );
  }

  const TABS = [
    { id: "warna", label: "Warna", icon: "🎨" },
    { id: "desain", label: "Desain", icon: "✨" },
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
    >
      <Navbar />

      <div className="w-full text-center mt-24 mb-6 px-4">
        <h1 className="text-base font-semibold text-zinc-800 tracking-tight">
          Hasil Foto Strip
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Edit & unduh foto strip kamu
        </p>
      </div>

      <main className="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-10 px-4 md:px-10 pb-12 max-w-6xl mx-auto w-full">
        {/* ── FOTO STRIP PREVIEW ── */}
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
              className={`relative overflow-hidden shadow-md transition-all duration-300 ${
                frameColor.startsWith("bg-") ? frameColor : ""
              }`}
              style={{
                ...getStripContainerStyle(layoutId),
                ...(!frameColor.startsWith("bg-")
                  ? { backgroundColor: frameColor }
                  : {}),
              }}
            >
              <div style={getPhotosGridStyle(layoutId)}>
                {capturedImages.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden shadow-sm transition-all duration-300 relative z-10 w-full ${getAspectRatioClass(layoutId)}`}
                    style={getDynamicPhotoStyle(i, capturedImages.length)}
                  >
                    <img
                      src={src}
                      alt={`Foto ${i + 1}`}
                      className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
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

              {placedStickers.map((s) => (
                <div
                  key={s.id}
                  className={`absolute drop-shadow-sm z-40 touch-none transition-transform ${getStickerSize()} ${
                    draggingSticker === s.id
                      ? "cursor-grabbing scale-125"
                      : "cursor-grab hover:scale-110"
                  }`}
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

        {/* ── SIDEBAR EDIT ── */}
        <div className="w-full md:w-[400px] shrink-0 flex flex-col bg-white/80 border border-pink-100 rounded-2xl shadow-sm backdrop-blur-sm overflow-hidden">
          {/* Tab Header */}
          <div className="grid grid-cols-4 border-b border-pink-50">
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

          {/* Tab Content */}
          <div
            className="p-5 overflow-y-auto flex-1"
            style={{ maxHeight: "calc(100vh - 300px)", scrollbarWidth: "none" }}
          >
            {/* ── WARNA ── */}
            {activeSection === "warna" && (
              <div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
                  Warna Frame
                </p>
                <div className="flex flex-wrap gap-2">
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
                      className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${c} ${frameColor === c ? "ring-2 ring-offset-2 ring-rose-400 scale-110" : "border border-black/5"}`}
                    />
                  ))}
                  {PATTERN_COLORS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setFrameColor(p)}
                      className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${p} ${frameColor === p ? "ring-2 ring-offset-2 ring-rose-400 scale-110" : "border border-black/5"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── DESAIN ── */}
            {activeSection === "desain" && (
              <div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
                  Tema Spesial
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {/* Tombol Tanpa Tema */}
                  <button
                    onClick={() => setActiveTheme("none")}
                    title="Tanpa Tema"
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150 flex items-center justify-center bg-rose-50 ${
                      activeTheme === "none"
                        ? "border-rose-400 shadow-md shadow-rose-100"
                        : "border-transparent hover:border-rose-200"
                    }`}
                  >
                    <span className="text-2xl">🚫</span>
                    {activeTheme === "none" && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-400 shadow" />
                    )}
                  </button>

                  {/* Tombol tiap tema — hanya tampil jika tersedia untuk layout ini */}
                  {Object.entries(THEME_META)
                    .filter(([key]) => themeAvailableForLayout(key))
                    .map(([key, meta]) => {
                      const isActive = activeTheme === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleThemeSelect(key)}
                          title={meta.label}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                            isActive
                              ? "border-rose-400 shadow-md shadow-rose-100 scale-105"
                              : "border-transparent hover:border-rose-200 hover:scale-105"
                          }`}
                        >
                          <img
                            src={meta.thumbnail}
                            alt={meta.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.style.backgroundColor =
                                "#ff9fbb";
                            }}
                          />
                          {isActive && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-400 shadow" />
                          )}
                        </button>
                      );
                    })}
                </div>

                {/* Nama tema aktif */}
                {activeTheme !== "none" && THEME_META[activeTheme] && (
                  <p className="mt-3 text-[11px] text-center text-rose-400 font-semibold">
                    ✨ {THEME_META[activeTheme].label}
                  </p>
                )}
              </div>
            )}

            {/* ── BENTUK ── */}
            {activeSection === "bentuk" && (
              <div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
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
                      className={`flex flex-col items-center gap-2 py-3 rounded-xl border transition-all ${
                        shapeType === opt.id
                          ? "border-rose-300 bg-rose-50 shadow-sm"
                          : "border-pink-100 bg-white/70 hover:border-rose-200"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 bg-gradient-to-br from-rose-400 to-pink-400 ${opt.cls}`}
                      />
                      <span
                        className={`text-[10px] font-medium ${shapeType === opt.id ? "text-rose-500" : "text-rose-300"}`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
                  Kelengkungan
                </p>
                <div className="bg-rose-50/60 p-4 rounded-xl border border-pink-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-rose-400">
                      Radius
                    </span>
                    <span className="text-xs font-semibold text-rose-500 bg-white px-2.5 py-1 rounded-lg border border-pink-100">
                      {radiusAmount}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={radiusAmount}
                    onChange={(e) => setRadiusAmount(e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-rose-400 bg-pink-100"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-rose-200">Kotak</span>
                    <span className="text-[10px] text-rose-200">Bulat</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── STIKER ── */}
            {activeSection === "stiker" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
                    Tambah Stiker
                  </p>
                  {placedStickers.length > 0 && (
                    <button
                      onClick={() => setPlacedStickers([])}
                      className="text-[11px] text-rose-300 hover:text-rose-500 font-medium transition-colors"
                    >
                      Hapus Semua
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {STICKER_LIST.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => addSticker(s)}
                      className="aspect-square flex items-center justify-center text-xl bg-white/80 rounded-xl hover:bg-rose-50 hover:scale-110 transition-all border border-pink-100 shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM ACTION BAR ── */}
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
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm shadow-pink-200 disabled:opacity-60"
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

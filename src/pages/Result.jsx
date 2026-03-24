import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import { toPng } from "html-to-image";
import { getAspectRatioClass } from "./Capture";
import Themes from "../components/Themes";
import SidebarColors from "../components/ResultSidebar/SidebarColors";
import SidebarThemes from "../components/ResultSidebar/SidebarThemes";
import SidebarPatterns from "../components/ResultSidebar/SidebarPatterns";
import SidebarShapes from "../components/ResultSidebar/SidebarShapes";
import SidebarStickers from "../components/ResultSidebar/SidebarStickers";

import {
  FILTER_CLASSES,
  SOLID_COLORS,
  PATTERN_COLORS,
  PATTERN_LIST,
  THEME_META,
  EMOJI_STICKERS,
  TWEMOJI_BASE,
  IMAGE_STICKERS,
  LOCAL_PROJECT_STICKERS,
  STRIP_PAD,
  STRIP_SIZES,
  GLOBAL_SHAPES,
  getClipPath,
  getStripContainerStyle,
  getPhotosGridStyle,
} from "../utils/constants";

import React from "react";

const StickerItem = React.memo(
  ({
    sticker,
    isSelected,
    onSelect,
    onDelete,
    onResize,
    stripRef,
    onUpdatePosition,
  }) => {
    const [dragPos, setDragPos] = React.useState(null);

    const handleMouseDown = React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(sticker.id);

        const strip = stripRef.current;
        if (!strip) return;
        const rect = strip.getBoundingClientRect();
        const offsetX =
          e.clientX - rect.left - (sticker.left / 100) * rect.width;
        const offsetY =
          e.clientY - rect.top - (sticker.top / 100) * rect.height;

        const onMouseMove = (moveEvent) => {
          const currentRect = stripRef.current.getBoundingClientRect();
          const newLeft =
            ((moveEvent.clientX - currentRect.left - offsetX) /
              currentRect.width) *
            100;
          const newTop =
            ((moveEvent.clientY - currentRect.top - offsetY) /
              currentRect.height) *
            100;
          setDragPos({
            left: Math.max(-15, Math.min(100, newLeft)),
            top: Math.max(-15, Math.min(100, newTop)),
          });
        };

        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          setDragPos((prev) => {
            if (prev) {
              onUpdatePosition(sticker.id, prev.left, prev.top);
            }
            return null;
          });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      },
      [
        sticker.id,
        sticker.left,
        sticker.top,
        onSelect,
        stripRef,
        onUpdatePosition,
      ],
    );

    const currentLeft = dragPos ? dragPos.left : sticker.left;
    const currentTop = dragPos ? dragPos.top : sticker.top;

    return (
      <div
        className="absolute z-40 group cursor-grab active:cursor-grabbing select-none"
        style={{
          top: `${currentTop}%`,
          left: `${currentLeft}%`,
          fontSize: sticker.src ? undefined : `${sticker.size}px`,
          width: sticker.src ? `${sticker.size}px` : undefined,
          height: sticker.src ? `${sticker.size}px` : undefined,
          lineHeight: 1,
          userSelect: "none",
          borderRadius: sticker.src ? "4px" : undefined,
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(sticker.id);
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
        <button
          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold items-center justify-center hidden group-hover:flex z-50 shadow"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(sticker.id);
          }}
        >
          ×
        </button>
        {isSelected && (
          <>
            <button
              className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onResize(sticker.id, -8);
              }}
            >
              −
            </button>
            <button
              className="absolute -bottom-2 -right-5 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onResize(sticker.id, 8);
              }}
            >
              +
            </button>
          </>
        )}
      </div>
    );
  },
);

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
  const [selectedStickerId, setSelectedStickerId] = useState(null);

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

  // ── Stiker: Position ──
  const updateStickerPosition = useCallback((id, left, top) => {
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, left, top } : s)),
    );
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
                <StickerItem
                  key={sticker.id}
                  sticker={sticker}
                  isSelected={selectedStickerId === sticker.id}
                  onSelect={setSelectedStickerId}
                  onDelete={deleteSticker}
                  onResize={resizeSticker}
                  stripRef={stripRef}
                  onUpdatePosition={updateStickerPosition}
                />
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
                        {pattern.emoji ? (
                          <span className="text-xl">{pattern.emoji}</span>
                        ) : pattern.thumbnail ? (
                          <div className="w-10 h-10 overflow-hidden rounded-lg border border-pink-100 shadow-sm flex items-center justify-center bg-white">
                            <img
                              src={pattern.thumbnail}
                              alt={pattern.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        ) : null}
                        <span className="text-[9px] font-medium text-rose-400 text-center leading-tight">
                          {pattern.label || pattern.Label}
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
              <SidebarStickers
                addSticker={addSticker}
                placedStickers={placedStickers}
                setPlacedStickers={setPlacedStickers}
                selectedStickerId={selectedStickerId}
                setSelectedStickerId={setSelectedStickerId}
                resizeSticker={resizeSticker}
                setStickerSize={setStickerSize}
                deleteSticker={deleteSticker}
              />
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

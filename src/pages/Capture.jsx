/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import IconSnap from "../assets/IconSnap.png";
import CameraReverse from "../assets/CameraReverse.png";
import Next from "../assets/Next.png";
import { useNavigate } from "react-router-dom";

const LAYOUT_OPTIONS = [
  { id: "2-horizontal", label: "2 Side", max: 2 },
  { id: "3-vertical", label: "3 Down", max: 3 },
  { id: "3-vertical-p", label: "3 Down (P)", max: 3 },
  { id: "4-vertical", label: "4 Down", max: 4 },
  { id: "4-grid", label: "2×2", max: 4 },
  { id: "6-grid", label: "2×3", max: 6 },
  { id: "9-grid", label: "3×3", max: 9 },
];

const DELAY_OPTIONS = [
  { value: 3, label: "3s" },
  { value: 5, label: "5s" },
  { value: 8, label: "8s" },
  { value: 10, label: "10s" },
];

export const getAspectRatioClass = (layoutId) => {
  switch (layoutId) {
    case "2-horizontal":
      return "aspect-[4/3]";
    case "3-vertical":
      return "aspect-[4/3]";
    case "3-vertical-p":
      return "aspect-[3/4]";
    case "4-vertical":
      return "aspect-[4/3]";
    case "4-grid":
      return "aspect-square";
    case "6-grid":
      return "aspect-[3/4]";
    case "9-grid":
      return "aspect-square";
    default:
      return "aspect-[4/3]";
  }
};

const getCameraMaxWidth = (layoutId) => {
  switch (layoutId) {
    case "6-grid":
      return "max-w-[240px]";
    case "3-vertical-p":
      return "max-w-[240px]";
    case "4-grid":
    case "9-grid":
      return "max-w-[300px]";
    default:
      return "max-w-[360px]";
  }
};

const getLayoutIcon = (id, isActive) => {
  const fill = isActive ? "#fff" : "#9ca3af";
  const size = "w-4 h-4";
  const icons = {
    "2-horizontal": (
      <svg viewBox="0 0 20 14" className={size} fill="none">
        <rect x="1" y="1" width="7.5" height="12" rx="1.5" fill={fill} />
        <rect x="11.5" y="1" width="7.5" height="12" rx="1.5" fill={fill} />
      </svg>
    ),
    "3-vertical": (
      <svg viewBox="0 0 14 20" className={size} fill="none">
        <rect x="1" y="1" width="12" height="5" rx="1.5" fill={fill} />
        <rect x="1" y="7.5" width="12" height="5" rx="1.5" fill={fill} />
        <rect x="1" y="14" width="12" height="5" rx="1.5" fill={fill} />
      </svg>
    ),
    "3-vertical-p": (
      <svg viewBox="0 0 14 20" className={size} fill="none">
        <rect x="3" y="1" width="8" height="5" rx="1.5" fill={fill} />
        <rect x="3" y="7.5" width="8" height="5" rx="1.5" fill={fill} />
        <rect x="3" y="14" width="8" height="5" rx="1.5" fill={fill} />
      </svg>
    ),
    "4-vertical": (
      <svg viewBox="0 0 14 22" className={size} fill="none">
        <rect x="1" y="1" width="12" height="4" rx="1.5" fill={fill} />
        <rect x="1" y="6.5" width="12" height="4" rx="1.5" fill={fill} />
        <rect x="1" y="12" width="12" height="4" rx="1.5" fill={fill} />
        <rect x="1" y="17.5" width="12" height="4" rx="1.5" fill={fill} />
      </svg>
    ),
    "4-grid": (
      <svg viewBox="0 0 20 20" className={size} fill="none">
        <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="11.5" y="1" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="1" y="11.5" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="11.5" y="11.5" width="7.5" height="7.5" rx="1.5" fill={fill} />
      </svg>
    ),
    "6-grid": (
      <svg viewBox="0 0 20 28" className={size} fill="none">
        <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="11.5" y="1" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="1" y="10.5" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="11.5" y="10.5" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="1" y="20" width="7.5" height="7.5" rx="1.5" fill={fill} />
        <rect x="11.5" y="20" width="7.5" height="7.5" rx="1.5" fill={fill} />
      </svg>
    ),
    "9-grid": (
      <svg viewBox="0 0 26 26" className={size} fill="none">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={1 + col * 8.5}
              y={1 + row * 8.5}
              width="7"
              height="7"
              rx="1"
              fill={fill}
            />
          )),
        )}
      </svg>
    ),
  };
  return icons[id] || null;
};

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

const FILTER_NAMES = Object.keys(FILTER_CLASSES);

const Capture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImages, setCapturedImages] = useState([]);
  const [cameraError, setCameraError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [layoutId, setLayoutId] = useState("2-horizontal");
  const [delayTime, setDelayTime] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Normal");
  const [flashEffect, setFlashEffect] = useState(false);

  const currentLayout = useMemo(
    () => LAYOUT_OPTIONS.find((l) => l.id === layoutId),
    [layoutId],
  );

  const isFinished = capturedImages.length === currentLayout.max;

  const videoConstraints = { width: 1280, height: 720, facingMode: "user" };

  const capture = useCallback(() => {
    if (cameraError || !webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 300);
    setCapturedImages((prev) => [...prev, imageSrc]);
  }, [cameraError]);

  useEffect(() => {
    if (countdown === null || !isShooting) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      capture();
      setCountdown(null);
    }
  }, [countdown, isShooting, capture]);

  useEffect(() => {
    if (isShooting && capturedImages.length > 0) {
      if (capturedImages.length < currentLayout.max) {
        setCountdown(delayTime);
      } else {
        setIsShooting(false);
      }
    }
  }, [capturedImages, isShooting, delayTime, currentLayout.max]);

  const startShooting = () => {
    if (cameraError) {
      setShowModal(true);
      return;
    }
    setCapturedImages([]);
    setIsShooting(true);
    setCountdown(delayTime);
  };

  const retake = () => {
    setCapturedImages([]);
    setCountdown(null);
    setIsShooting(false);
  };

  const handleError = () => setCameraError(true);

  return (
    <div
      className="min-h-screen font-sans flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #fff5f7 0%, #ffffff 30%, #fdf9ff 70%, #fff5f7 100%)",
      }}
    >
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── CAMERA ERROR MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl border border-rose-100">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-base font-semibold text-zinc-900 mb-1">
              Kamera Diblokir
            </h2>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
              Klik ikon gembok di address bar dan pilih{" "}
              <strong className="text-zinc-600">Allow</strong> untuk mengizinkan
              akses kamera.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2.5 rounded-xl text-sm font-medium mb-2 hover:opacity-90 transition-opacity"
            >
              Refresh Halaman
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-rose-50 text-rose-400 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-100 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      {/* pt-24 memberi jarak cukup di bawah navbar */}
      <main className="flex-1 flex flex-col md:flex-row md:items-start justify-center gap-8 px-4 md:px-10 pt-24 pb-12 max-w-5xl mx-auto w-full">
        {/* ── AREA KAMERA ── */}
        <div className="flex flex-col items-center w-full max-w-xl shrink-0 gap-5">
          {/* Toolbar: Layout + Delay */}
          <div className="w-full flex items-center gap-4 bg-white/80 border border-pink-100 rounded-xl px-4 py-3 shadow-sm backdrop-blur-sm">
            {/* Label Layout */}
            <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest shrink-0">
              Layout
            </span>
            {/* Layout Pills */}
            <div className="flex overflow-x-auto gap-1.5 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {LAYOUT_OPTIONS.map((opt) => {
                const isActive = layoutId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setLayoutId(opt.id);
                      setCapturedImages([]);
                    }}
                    disabled={isShooting}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 disabled:opacity-30 ${
                      isActive
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-pink-200"
                        : "bg-rose-50/60 text-rose-400 hover:bg-rose-100/80"
                    }`}
                  >
                    {getLayoutIcon(opt.id, isActive)}
                    <span className="whitespace-nowrap">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-pink-100 shrink-0" />

            {/* Label Delay */}
            <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest shrink-0">
              Jeda
            </span>
            {/* Delay Pills */}
            <div className="flex gap-1.5 shrink-0">
              {DELAY_OPTIONS.map((opt) => {
                const isActive = delayTime === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setDelayTime(opt.value)}
                    disabled={isShooting}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 disabled:opacity-30 ${
                      isActive
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-pink-200"
                        : "bg-rose-50/60 text-rose-400 hover:bg-rose-100/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kamera */}
          <div
            className={`w-full mx-auto ${getCameraMaxWidth(layoutId)} ${getAspectRatioClass(layoutId)} rounded-2xl overflow-hidden relative border border-pink-100 shadow-sm transition-all duration-500 bg-rose-50/40`}
          >
            {/* Flash */}
            {flashEffect && (
              <div
                className="absolute inset-0 z-20 bg-white opacity-80 pointer-events-none animate-ping"
                style={{
                  animationDuration: "0.25s",
                  animationIterationCount: 1,
                }}
              />
            )}

            {/* Countdown */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                <div className="relative flex items-center justify-center">
                  <svg
                    className="absolute w-28 h-28 -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeDasharray={`${(countdown / delayTime) * 282.7} 282.7`}
                      style={{ transition: "stroke-dasharray 1s linear" }}
                    />
                  </svg>
                  <span className="text-6xl font-black text-white">
                    {countdown}
                  </span>
                </div>
              </div>
            )}

            {/* Progress dots saat shooting */}
            {isShooting && countdown === null && (
              <div className="absolute top-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {Array.from({ length: currentLayout.max }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < capturedImages.length
                        ? "bg-white scale-110"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Counter badge */}
            {capturedImages.length > 0 && !isShooting && (
              <div className="absolute top-3 right-3 z-10 bg-black/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {capturedImages.length}/{currentLayout.max}
              </div>
            )}

            {/* Kamera atau Error */}
            {cameraError ? (
              <div
                className="w-full h-full flex flex-col items-center justify-center bg-rose-50/60 cursor-pointer gap-2"
                onClick={() => setShowModal(true)}
              >
                <span className="text-3xl opacity-30">📷</span>
                <p className="text-rose-300 text-xs">Kamera diblokir</p>
              </div>
            ) : (
              <Webcam
                audio={false}
                mirrored={true}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={`w-full h-full object-cover transition-all duration-500 ${FILTER_CLASSES[activeFilter]}`}
                onUserMediaError={handleError}
                onUserMedia={() => setCameraError(false)}
              />
            )}
          </div>

          {/* Filter Selector */}
          <div className="w-full">
            <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-2">
              Filter
            </p>
            <div className="flex overflow-x-auto gap-1.5 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {FILTER_NAMES.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-pink-200"
                        : "bg-white/80 border border-pink-100 text-rose-400 hover:border-rose-200"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 w-full">
            {capturedImages.length > 0 && (
              <button
                onClick={retake}
                className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-pink-100 text-rose-400 hover:border-rose-200 hover:text-rose-500 transition-all duration-150 shadow-sm"
              >
                <img
                  src={CameraReverse}
                  alt="Ulang"
                  className="w-4 h-4 object-contain"
                />
              </button>
            )}

            {isFinished ? (
              <button
                onClick={() =>
                  navigate("/result", {
                    state: { capturedImages, activeFilter, layoutId },
                  })
                }
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm shadow-pink-200"
              >
                <img
                  src={Next}
                  alt="Berikutnya"
                  className="w-4 h-4 object-contain"
                />
                Lanjut ke Hasil
              </button>
            ) : (
              <button
                onClick={startShooting}
                disabled={isShooting || cameraError}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
                  cameraError || isShooting
                    ? "bg-rose-100 text-rose-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-90 shadow-pink-200"
                }`}
              >
                <img
                  src={IconSnap}
                  alt="Kamera"
                  className="w-4 h-4 object-contain"
                />
                {isShooting ? "Memotret..." : "Mulai Foto"}
              </button>
            )}
          </div>
        </div>

        {/* ── PANEL HASIL FOTO (KANAN) ── */}
        <div className="hidden md:flex flex-col w-[88px] shrink-0 mt-[68px] gap-2 max-h-[520px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {Array.from({ length: currentLayout.max }).map((_, index) => {
            const captured = capturedImages[index];
            return (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden ${getAspectRatioClass(layoutId)} shrink-0 transition-all duration-300 ${
                  captured
                    ? "shadow-sm ring-2 ring-pink-200"
                    : "border border-dashed border-pink-100 bg-white/60"
                }`}
              >
                {captured ? (
                  <>
                    <img
                      src={captured}
                      alt={`Foto ${index + 1}`}
                      className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
                    />
                    <div className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-medium text-rose-200">
                      {index + 1}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Capture;

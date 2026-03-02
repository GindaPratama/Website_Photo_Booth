/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import IconSnap from "../assets/IconSnap.png";
import CameraReverse from "../assets/CameraReverse.png";
import Next from "../assets/Next.png";
import { useNavigate } from "react-router-dom";

const LAYOUT_OPTIONS = [
  { id: "2-horizontal", label: "2 Samping", max: 2 },
  { id: "3-vertical", label: "3 Bawah", max: 3 },
  { id: "4-vertical", label: "4 Bawah", max: 4 },
  { id: "4-grid", label: "Grid 2×2", max: 4 },
  { id: "6-grid", label: "Grid 2×3", max: 6 },
  { id: "9-grid", label: "Grid 3×3", max: 9 },
];

const DELAY_OPTIONS = [
  { value: 3, label: "3s" },
  { value: 5, label: "5s" },
  { value: 8, label: "8s" },
  { value: 10, label: "10s" },
];

const getLayoutIcon = (id, isActive) => {
  const fill = isActive ? "#ec4899" : "#d1d5db";
  const size = "w-5 h-5";

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
        {[0,1,2].map(row => [0,1,2].map(col => (
          <rect key={`${row}-${col}`} x={1 + col * 8.5} y={1 + row * 8.5} width="7" height="7" rx="1" fill={fill} />
        )))}
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
  "B&W Classic": "grayscale",
  "B&W Dark": "grayscale contrast-125 brightness-75",
  "B&W Fade": "grayscale contrast-75 brightness-125",
  Sepia: "sepia",
  Retro: "sepia-[.5] hue-rotate-[-30deg] contrast-110 saturate-150 brightness-90",
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
  const [layoutId, setLayoutId] = useState("4-vertical");
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
  const progress = (capturedImages.length / currentLayout.max) * 100;

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

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
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
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
    if (cameraError) { setShowModal(true); return; }
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
    <div className="min-h-screen font-sans flex flex-col pt-8 relative overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ede9fe 100%)" }}>
      <Navbar />

      {/* MODAL ERROR KAMERA */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white/50"
            style={{ animation: "fadeInUp 0.3s ease" }}>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Kamera Diblokir!</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Klik ikon gembok di address bar dan pilih <strong>"Allow"</strong> untuk mengizinkan akses kamera.
            </p>
            <button onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-2xl font-bold mb-2 hover:opacity-90 transition-opacity">
              Refresh Halaman
            </button>
            <button onClick={() => setShowModal(false)}
              className="w-full bg-gray-100 text-gray-500 py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col md:flex-row md:items-start justify-center gap-6 px-4 md:px-8 pt-6 pb-10 max-w-5xl mx-auto w-full">

        {/* === AREA UTAMA === */}
        <div className="flex flex-col items-center w-full max-w-2xl shrink-0">

          {/* ── TOOLBAR ATAS ── */}
          <div className="w-full mb-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-sm px-4 py-3">
            <div className="flex items-center gap-3">

              {/* Label Layout */}
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Layout</span>

              {/* Layout Options */}
              <div className="flex overflow-x-auto gap-2 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {LAYOUT_OPTIONS.map((opt) => {
                  const isActive = layoutId === opt.id;
                  return (
                    <button key={opt.id}
                      onClick={() => { setLayoutId(opt.id); setCapturedImages([]); }}
                      disabled={isShooting}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 disabled:opacity-40 ${
                        isActive
                          ? "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-200"
                          : "bg-white/80 border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500"
                      }`}>
                      {getLayoutIcon(opt.id, isActive)}
                      <span className="whitespace-nowrap">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200 shrink-0" />

              {/* Label Delay */}
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Jeda</span>

              {/* Delay Options */}
              <div className="flex gap-2 shrink-0">
                {DELAY_OPTIONS.map((opt) => {
                  const isActive = delayTime === opt.value;
                  return (
                    <button key={opt.value}
                      onClick={() => setDelayTime(opt.value)}
                      disabled={isShooting}
                      className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 disabled:opacity-40 ${
                        isActive
                          ? "bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-200"
                          : "bg-white/80 border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-500"
                      }`}>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── LAYAR KAMERA ── */}
          <div className="w-full aspect-video rounded-3xl shadow-2xl mb-4 relative overflow-hidden border-2 border-white/80"
            style={{ boxShadow: "0 25px 50px -12px rgba(236,72,153,0.25), 0 0 0 1px rgba(255,255,255,0.5)" }}>

            {/* Flash Effect */}
            {flashEffect && (
              <div className="absolute inset-0 z-20 bg-white animate-ping rounded-3xl pointer-events-none" style={{ animationDuration: "0.3s", animationIterationCount: 1 }} />
            )}

            {/* Countdown Overlay */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)" }}>
                <div className="relative flex items-center justify-center">
                  {/* Ring animasi */}
                  <svg className="absolute w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="4"
                      strokeDasharray={`${(countdown / delayTime) * 282.7} 282.7`}
                      style={{ transition: "stroke-dasharray 1s linear" }} />
                  </svg>
                  <span className="text-8xl font-black text-white drop-shadow-2xl"
                    style={{ textShadow: "0 0 40px rgba(251,75,143,0.9)" }}>
                    {countdown}
                  </span>
                </div>
                <p className="text-white/80 text-sm font-medium mt-3 tracking-wider">Bersiap...</p>
              </div>
            )}

            {/* Progress dots saat shooting */}
            {isShooting && countdown === null && (
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center gap-2">
                {Array.from({ length: currentLayout.max }).map((_, i) => (
                  <div key={i}
                    className={`w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 ${
                      i < capturedImages.length ? "bg-pink-400 scale-110" : "bg-white/40"
                    }`} />
                ))}
              </div>
            )}

            {/* Foto counter badge */}
            {capturedImages.length > 0 && !isShooting && (
              <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                {capturedImages.length}/{currentLayout.max} foto
              </div>
            )}

            {cameraError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 cursor-pointer gap-3"
                onClick={() => setShowModal(true)}>
                <span className="text-5xl opacity-40">📷</span>
                <p className="text-gray-500 text-sm">Kamera tidak dapat diakses</p>
                <span className="text-pink-400 text-xs font-bold border border-pink-400/30 px-3 py-1 rounded-full">Klik untuk info</span>
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

          {/* ── PROGRESS BAR ── */}
          {(capturedImages.length > 0 || isShooting) && (
            <div className="w-full mb-4 px-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-gray-500">Progress</span>
                <span className="text-xs font-bold text-pink-500">{capturedImages.length}/{currentLayout.max}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* ── PILIH FILTER ── */}
          <div className="w-full mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-extrabold text-gray-700">✨ Pilih Filter</h2>
              <span className="text-xs text-pink-500 font-bold bg-pink-50 px-2 py-0.5 rounded-full">{activeFilter}</span>
            </div>
            <div className="flex overflow-x-auto gap-2 py-1 px-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {FILTER_NAMES.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md shadow-pink-200 scale-105"
                        : "bg-white/80 text-gray-500 border border-gray-200 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50"
                    }`}>
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── TOMBOL AKSI ── */}
          <div className="flex gap-3 w-full justify-center">
            {capturedImages.length > 0 && (
              <button onClick={retake}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-all duration-200 hover:scale-105 shadow-sm">
                <img src={CameraReverse} alt="Ulang" className="w-5 h-5 object-contain" />
                Ambil Ulang
              </button>
            )}

            {isFinished ? (
              <button
                onClick={() => navigate("/result", { state: { capturedImages, activeFilter, layoutId } })}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg hover:scale-105 transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", boxShadow: "0 10px 30px -5px rgba(236,72,153,0.5)" }}>
                <img src={Next} alt="Berikutnya" className="w-5 h-5 object-contain" />
                Lanjut ke Hasil
              </button>
            ) : (
              <button
                onClick={startShooting}
                disabled={isShooting || cameraError}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 ${
                  cameraError || isShooting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:scale-105 shadow-lg"
                }`}
                style={!(cameraError || isShooting) ? {
                  background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                  boxShadow: "0 10px 30px -5px rgba(236,72,153,0.5)"
                } : {}}>
                <img src={IconSnap} alt="Kamera" className="w-5 h-5 object-contain" />
                {isShooting ? "Sedang Memotret..." : "Mulai Foto"}
              </button>
            )}
          </div>
        </div>

        {/* === PANEL HASIL FOTO (KANAN) === */}
        <div className="hidden md:flex flex-col w-[120px] shrink-0 mt-[76px] gap-2.5 max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Slot kosong (placeholder) */}
          {Array.from({ length: currentLayout.max }).map((_, index) => {
            const captured = capturedImages[index];
            return (
              <div key={index}
                className={`relative rounded-2xl overflow-hidden aspect-[4/3] shrink-0 transition-all duration-300 ${
                  captured ? "shadow-md" : "border-2 border-dashed border-gray-200 bg-white/40"
                }`}>
                {captured ? (
                  <>
                    <img src={captured} alt={`Foto ${index + 1}`}
                      className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`} />
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-[9px] text-white font-black">{index + 1}</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-lg text-gray-300">{index + 1}</span>
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
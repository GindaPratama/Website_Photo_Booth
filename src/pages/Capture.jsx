/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import IconSnap from "../assets/IconSnap.png";
import CameraReverse from "../assets/CameraReverse.png";
import Next from "../assets/Next.png";
import { useNavigate } from "react-router-dom";

// === PENGATURAN OPSI LAYOUT ===
const LAYOUT_OPTIONS = [
  { id: "2-horizontal", label: "2 Samping", max: 2 },
  { id: "3-vertical", label: "3 Bawah", max: 3 },
  { id: "4-vertical", label: "4 Bawah", max: 4 },
  { id: "4-grid", label: "Grid 2x2", max: 4 },
  { id: "6-grid", label: "Grid 2x3", max: 6 },
  { id: "9-grid", label: "Grid 3x3", max: 9 },
];

// === PENGATURAN WAKTU TUNDA ===
const DELAY_OPTIONS = [
  { value: 3, label: "3s Tertunda" },
  { value: 5, label: "5s Tertunda" },
  { value: 8, label: "8s Tertunda" },
  { value: 10, label: "10s Tertunda" },
];

// === FUNGSI GENERATOR ICON CSS MURNI ===
const getLayoutIcon = (id, isActive) => {
  const bgColor = isActive ? "bg-pink-500" : "bg-gray-400";
  const wrapper =
    "flex p-[3px] border border-gray-200 rounded-sm bg-white shadow-sm shrink-0";

  switch (id) {
    case "2-horizontal":
      return (
        <div className={`${wrapper} w-7 h-6 gap-[2px]`}>
          <div className={`w-1/2 h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-1/2 h-full rounded-[1px] ${bgColor}`} />
        </div>
      );
    case "3-vertical":
      return (
        <div className={`${wrapper} flex-col w-5 h-8 gap-[2px]`}>
          <div className={`w-full h-1/3 rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-1/3 rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-1/3 rounded-[1px] ${bgColor}`} />
        </div>
      );
    case "4-vertical":
      return (
        <div className={`${wrapper} flex-col w-5 h-10 gap-[2px]`}>
          <div className={`w-full h-1/4 rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-1/4 rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-1/4 rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-1/4 rounded-[1px] ${bgColor}`} />
        </div>
      );
    case "4-grid":
      return (
        <div className={`${wrapper} grid grid-cols-2 w-7 h-7 gap-[2px]`}>
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
        </div>
      );
    case "6-grid":
      return (
        <div className={`${wrapper} grid grid-cols-2 w-7 h-9 gap-[2px]`}>
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
        </div>
      );
    case "9-grid":
      return (
        <div className={`${wrapper} grid grid-cols-3 w-8 h-8 gap-[1px]`}>
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
          <div className={`w-full h-full rounded-[1px] ${bgColor}`} />
        </div>
      );
    default:
      return null;
  }
};

// === KAMUS KELAS FILTER TAILWIND ===
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

const FILTER_NAMES = Object.keys(FILTER_CLASSES);

const Capture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // STATE MANAGEMENT
  const [capturedImages, setCapturedImages] = useState([]);
  const [cameraError, setCameraError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [layoutId, setLayoutId] = useState("4-vertical");
  const [delayTime, setDelayTime] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Normal");

  const currentLayout = useMemo(
    () => LAYOUT_OPTIONS.find((l) => l.id === layoutId),
    [layoutId],
  );

  const isFinished = capturedImages.length === currentLayout.max;

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (cameraError || !webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages((prev) => [...prev, imageSrc]);
  }, [cameraError]);

  // EFEK TIMER MUNDUR
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

  // EFEK JEDA ANTAR FOTO
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

  const handleError = () => {
    setCameraError(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex flex-col pt-8 relative overflow-x-hidden">
      <Navbar />

      {/* POP-UP ERROR KAMERA */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              Akses Kamera Diblokir!
            </h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Browser kamu memblokir akses kamera. Mohon klik ikon gembok di
              address bar dan pilih "Allow".
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#fb4b8f] text-white py-3 rounded-full font-bold mb-2"
            >
              Refresh Halaman
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-100 text-gray-500 py-3 rounded-full font-bold text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* CONTAINER UTAMA */}
      <main className="flex-1 flex flex-col md:flex-row md:items-start justify-center gap-8 p-6 mt-4 max-w-5xl mx-auto w-full transition-all duration-300">
        {/* === AREA KAMERA UTAMA KIRI === */}
        <div className="flex flex-col items-center w-full max-w-2xl shrink-0">
          {/* BAGIAN ATAS KAMERA (LAYOUT & DELAY) */}
          {/* KUNCI PRESISI: h-[64px] + mb-[16px] = Total tinggi 80px */}
          <div className="flex items-center justify-center gap-4 w-full h-[64px] mb-[16px]">
            {/* MENU LAYOUT - SCROLL KE SAMPING */}
            <div className="flex overflow-x-auto gap-3 py-2 px-1 w-[220px] md:w-[260px] shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setLayoutId(opt.id);
                    setCapturedImages([]);
                  }}
                  disabled={isShooting}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                    layoutId === opt.id
                      ? "border-pink-500 bg-pink-50 shadow-md scale-105"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50 disabled:opacity-50 hover:scale-105"
                  }`}
                >
                  {getLayoutIcon(opt.id, layoutId === opt.id)}
                  <span
                    className={`text-xs font-bold whitespace-nowrap ${layoutId === opt.id ? "text-pink-600" : "text-gray-500"}`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            {/* GARIS PEMISAH (Biar manis) */}
            <div className="h-8 w-[2px] bg-gray-200 rounded-full shrink-0"></div>

            {/* DELAY WAKTU - SCROLL KE SAMPING */}
            <div className="flex overflow-x-auto gap-3 py-2 px-1 w-[180px] shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {DELAY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDelayTime(opt.value)}
                  disabled={isShooting}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                    delayTime === opt.value
                      ? "border-pink-500 bg-pink-50 shadow-md scale-105"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50 disabled:opacity-50 hover:scale-105"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${delayTime === opt.value ? "text-pink-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span
                    className={`text-xs font-bold whitespace-nowrap ${delayTime === opt.value ? "text-pink-600" : "text-gray-500"}`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* LAYAR KAMERA */}
          <div className="w-full aspect-video bg-black rounded-[2rem] shadow-xl mb-6 relative overflow-hidden flex items-center justify-center border border-gray-100">
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                <span className="text-[150px] font-extrabold text-white drop-shadow-[0_0_20px_rgba(251,75,143,0.8)] animate-pulse">
                  {countdown}
                </span>
              </div>
            )}

            {cameraError ? (
              <div
                className="text-center p-8 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <span className="text-6xl opacity-50">📷</span>
                <p className="text-gray-400">Kamera Error. Klik untuk info.</p>
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

          {/* AREA FILTER */}
          <h1 className="text-black font-bold text-sm mb-4 mt-2">
            Pilih filter
          </h1>
          <div className="flex overflow-x-auto gap-3 mb-8 w-full max-w-2xl py-2 px-1 scrollbar-hide">
            {FILTER_NAMES.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter
                    ? "bg-[#fb4b8f] text-white border-[#fb4b8f] shadow-md hover:bg-[#764ba2] hover:border-[#764ba2]"
                    : "border-gray-300 text-gray-700 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* TOMBOL AKSI */}
          <div className="flex gap-4">
            {capturedImages.length > 0 && (
              <button
                onClick={retake}
                className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-white hover:scale-105 px-12 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 border-2 border-transparent"
              >
                <img
                  src={CameraReverse}
                  alt="Icon Camera Reverse"
                  className="w-6 h-6 object-contain"
                />
                <span>Ambil Ulang</span>
              </button>
            )}

            {isFinished ? (
              <button
                onClick={() =>
                  navigate("/result", {
                    state: { capturedImages, activeFilter, layoutId },
                  })
                }
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 px-12 py-4 rounded-full font-bold text-lg shadow-sm transition-all flex items-center gap-2 border-2 border-transparent"
              >
                <img
                  src={Next}
                  alt="Icon Berikutnya"
                  className="w-6 h-6 object-contain"
                />
                Berikutnya
              </button>
            ) : (
              <button
                onClick={startShooting}
                disabled={isShooting || cameraError}
                className={`${
                  cameraError || isShooting
                    ? "bg-gray-400 cursor-not-allowed shadow-lg"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 shadow-lg "
                } text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 border-2 border-transparent`}
              >
                <img
                  src={IconSnap}
                  alt="Icon Kamera"
                  className="w-6 h-6 object-contain"
                />
                <span>Mulai Foto</span>
              </button>
            )}
          </div>
        </div>

        {/* === HASIL FOTO SEMENTARA DI KANAN === */}
        {/* KUNCI PRESISI: mt-[80px] ini sejajar otomatis dengan kamera karena didorong jarak yang sama */}
        <div className="hidden md:flex flex-col w-[130px] shrink-0 mt-[80px] gap-3 max-h-[450px] overflow-y-auto scrollbar-hide">
          {capturedImages.map((src, index) => (
            <div
              key={index}
              className="relative rounded-[1rem] overflow-hidden shadow-md aspect-[4/3] shrink-0 bg-gray-200"
            >
              <img
                src={src}
                alt={`Captured ${index + 1}`}
                className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Capture;

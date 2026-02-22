import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

// === KAMUS FILTER (Sama persis kayak di Capture.jsx) ===
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

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. TANGKAP DATA DARI HALAMAN SEBELUMNYA
  const { capturedImages, activeFilter, layoutId } = location.state || {
    capturedImages: [],
    activeFilter: "Normal",
    layoutId: "4-vertical",
  };

  // State buat ganti warna bingkai foto (Frame)
  const [frameColor, setFrameColor] = useState("bg-white");

  // Proteksi kalau user iseng buka halaman /result tanpa foto
  if (!capturedImages || capturedImages.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Waduh, belum ada foto nih! 📸
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg"
        >
          Balik ke Kamera
        </button>
      </div>
    );
  }

  // 2. FUNGSI SAKTI BUAT NGATUR LAYOUT PHOTO STRIP
  const getStripLayoutClasses = () => {
    switch (layoutId) {
      case "2-horizontal":
        return "grid grid-cols-2 gap-3 w-full max-w-[600px]"; // Lebar ke samping
      case "3-vertical":
      case "4-vertical":
        return "flex flex-col gap-3 w-full max-w-[280px]"; // Memanjang ke bawah
      case "4-grid":
      case "6-grid":
        return "grid grid-cols-2 gap-3 w-full max-w-[450px]"; // Kotak Grid
      case "9-grid":
        return "grid grid-cols-3 gap-2 w-full max-w-[500px]"; // Kotak Grid Rapat
      default:
        return "flex flex-col gap-3 w-full max-w-[280px]";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex flex-col pt-8 relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start p-6 mt-4 max-w-5xl mx-auto w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Yeay! Hasil Fotonya Udah Jadi 🎉
          </h1>
          <p className="text-gray-500 font-medium">
            Pilih warna frame favorit lu, terus unduh hasilnya!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start justify-center w-full">
          {/* === KIRI: PREVIEW PHOTO STRIP === */}
          <div className="w-full flex justify-center md:justify-end flex-1 overflow-x-auto pb-4 scrollbar-hide">
            {/* WADAH UTAMA FRAME FOTO */}
            <div
              id="photo-strip"
              className={`${frameColor} p-4 pb-20 rounded-md shadow-2xl shrink-0 relative transition-colors duration-300 mx-auto md:mx-0 ${getStripLayoutClasses()}`}
            >
              {capturedImages.map((src, index) => (
                <div
                  key={index}
                  className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-gray-200 shadow-sm border border-black/5"
                >
                  <img
                    src={src}
                    alt={`Jepretan ${index + 1}`}
                    // TERAPKAN FILTER KE MASING-MASING FOTO!
                    className={`w-full h-full object-cover ${FILTER_CLASSES[activeFilter]}`}
                  />
                </div>
              ))}

              {/* Logo/Watermark BeautySnap di bagian bawah kertas */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p
                  className={`font-extrabold tracking-widest text-lg ${frameColor === "bg-black" ? "text-white" : "text-gray-800"}`}
                >
                  BEAUTYSNAP
                </p>
                <p
                  className={`text-[10px] uppercase font-semibold tracking-widest opacity-60 ${frameColor === "bg-black" ? "text-gray-300" : "text-gray-500"}`}
                >
                  {layoutId.replace("-", " ")} • {activeFilter}
                </p>
              </div>
            </div>
          </div>

          {/* === KANAN: PANEL SETTING BINGKAI & DOWNLOAD === */}
          <div className="flex flex-col gap-6 w-full max-w-sm bg-white p-8 rounded-3xl shadow-lg border border-gray-100 shrink-0">
            {/* Pilihan Warna Frame */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                Pilih Warna Frame
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFrameColor("bg-white")}
                  className={`w-12 h-12 rounded-full bg-white border-2 shadow-sm transition-transform hover:scale-110 ${frameColor === "bg-white" ? "border-pink-500" : "border-gray-200"}`}
                ></button>
                <button
                  onClick={() => setFrameColor("bg-black")}
                  className={`w-12 h-12 rounded-full bg-black border-2 shadow-sm transition-transform hover:scale-110 ${frameColor === "bg-black" ? "border-pink-500" : "border-transparent"}`}
                ></button>
                <button
                  onClick={() => setFrameColor("bg-[#ffb6c1]")}
                  className={`w-12 h-12 rounded-full bg-[#ffb6c1] border-2 shadow-sm transition-transform hover:scale-110 ${frameColor === "bg-[#ffb6c1]" ? "border-pink-500" : "border-transparent"}`}
                ></button>
                <button
                  onClick={() => setFrameColor("bg-[#add8e6]")}
                  className={`w-12 h-12 rounded-full bg-[#add8e6] border-2 shadow-sm transition-transform hover:scale-110 ${frameColor === "bg-[#add8e6]" ? "border-pink-500" : "border-transparent"}`}
                ></button>
                <button
                  onClick={() => setFrameColor("bg-[#fffacd]")}
                  className={`w-12 h-12 rounded-full bg-[#fffacd] border-2 shadow-sm transition-transform hover:scale-110 ${frameColor === "bg-[#fffacd]" ? "border-pink-500" : "border-transparent"}`}
                ></button>
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Tombol Aksi */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() =>
                  alert(
                    "Fitur unduh bakal kita pasang di tahap selanjutnya ya Ginn! 🚀",
                  )
                }
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-bold text-lg shadow-md hover:scale-105 transition-all flex justify-center items-center gap-2"
              >
                <span>⬇️</span> Unduh Foto Strip
              </button>

              <button
                onClick={() => navigate("/capture")}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex justify-center items-center gap-2 hover:scale-105"
              >
                <span>📸</span> Foto Ulang Lagi
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;

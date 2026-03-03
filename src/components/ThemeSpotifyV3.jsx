import React from "react";

export default function ThemeSpotifyV3({ layoutId }) {
  const getOrnamentPos = (name) => {
    const isHorizontal = layoutId === "2-horizontal";
    const isGrid = ["4-grid", "6-grid", "9-grid"].includes(layoutId);

    if (isHorizontal) {
      switch (name) {
        // SAMAIN KAYAK V2 BIAR TINGGINYA PAS
        case "container":
          return "top-[30px] left-[10px] right-[10px] bottom-[20px]";
        case "logo":
          return "hidden";
        case "star1":
        case "star2":
        case "star3":
        case "star4":
        case "star5":
          return "hidden";
        case "choco":
          return "top-[10%] right-[2%] w-[50px] -rotate-12";
        case "coffee":
          return "top-[8%] left-[0%] w-[50px] -rotate-6";

        // --- BUNGKUS UTAMA PLAYER ---
        case "playerWrapper":
          return "bottom-[20px]";

        // --- ECERAN PLAYER ---
        case "teksLagu":
          return "";
        case "progressBar":
          return "top-[20%]";
        case "grupKontrol":
          return "";
        case "btnPrev":
          return "";
        case "btnPlay":
          return "";
        case "btnNext":
          return "";
        case "grupVolume":
          return "hidden";

        // --- FOOTER ---
        case "footerWrapper":
          return "hidden";
      }
    } else if (isGrid) {
      switch (name) {
        case "container":
          return "inset-x-3 top-[44px] bottom-[55px]";
        case "logo":
          return "top-[35px] right-[15px]";
        case "star1":
          return "top-[23%] left-[5px]";
        case "choco":
          return "top-[26%] right-[15px] w-[60px] -rotate-12";
        case "coffee":
          return "top-[48%] left-[5px] w-[50px] -rotate-6";
        case "star2":
          return "top-[50%] right-[15px]";
        case "star3":
          return "top-[54%] right-[10px]";
        case "star4":
          return "top-[65%] left-[2px]";
        case "star5":
          return "top-[70%] left-[10px]";

        case "playerWrapper":
          return "bottom-[68px]";
        case "teksLagu":
          return "";
        case "progressBar":
          return "";
        case "grupKontrol":
          return "";
        case "btnPrev":
          return "";
        case "btnPlay":
          return "";
        case "btnNext":
          return "";
        case "grupVolume":
          return "";
        case "footerWrapper":
          return "";
      }
    }

    // Default (3-Vertical & 4-Vertical)
    switch (name) {
      case "container":
        return "inset-x-2 top-[44px] bottom-[55px]";
      case "logo":
        return "top-[35px] right-[10px]";
      case "star1":
        return "top-[23%] left-[5px]";
      case "choco":
        return "top-[26%] right-[10px] w-[60px] -rotate-12";
      case "coffee":
        return "top-[48%] left-[5px] w-[50px] -rotate-6";
      case "star2":
        return "top-[50%] right-[10px]";
      case "star3":
        return "top-[54%] right-[5px]";
      case "star4":
        return "top-[65%] left-[2px]";
      case "star5":
        return "top-[70%] left-[10px]";

      case "playerWrapper":
        return "bottom-[68px]";
      case "teksLagu":
        return "";
      case "progressBar":
        return "";
      case "grupKontrol":
        return "";
      case "btnPrev":
        return "";
      case "btnPlay":
        return "";
      case "btnNext":
        return "";
      case "grupVolume":
        return "";
      case "footerWrapper":
        return "";
    }
    return "";
  };

  return (
    <>
      <div className="absolute inset-0 z-0 flex pointer-events-none rounded-2xl overflow-hidden">
        <div className="w-[45%] bg-[#cca88a] h-full" />
        <div className="w-[55%] bg-[#3a130e] h-full" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("container")} z-0 bg-[#824a41] rounded-[1.2rem] shadow-md pointer-events-none`}
      />

      <div className="absolute top-2 inset-x-5 z-20 flex justify-between items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 drop-shadow-sm text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 tracking-widest drop-shadow-sm text-white transition-colors"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
        </svg>
      </div>

      <div
        className={`absolute ${getOrnamentPos("logo")} w-[46px] h-[46px] bg-[#cca88a] rounded-full flex items-center justify-center z-30 shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/3/SpotifyIconBrown.svg"
          className="w-[28px] h-[28px]"
          alt="Spotify"
        />
      </div>

      <div
        className={`absolute ${getOrnamentPos("star1")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/3/Star.svg" className="w-[45px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("choco")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/3/Chocolate.svg"
          className={getOrnamentPos("choco")}
          alt="Chocolate"
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("coffee")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/3/Coffee.svg"
          className={getOrnamentPos("coffee")}
          alt="Coffee"
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star2")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/3/Star.svg" className="w-[30px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star3")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/3/Star.svg" className="w-[15px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star4")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/3/Star.svg" className="w-[45px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star5")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/3/Star.svg" className="w-[20px]" alt="Star" />
      </div>

      {/* --- BUNGKUS UTAMA PLAYER --- */}
      <div
        className={`absolute ${getOrnamentPos("playerWrapper")} inset-x-6 z-20 flex flex-col pointer-events-none`}
      >
        <div className={`mb-5 ${getOrnamentPos("teksLagu")}`}>
          <h2 className="pb-2 font-extrabold text-[15px] text-white leading-none drop-shadow-md">
            Menua Bersama
          </h2>
          <p className="text-[11px] font-medium text-white/80 drop-shadow-md leading-none">
            Anggis Devaki
          </p>
        </div>
        <div
          className={`mb-3 mt-1 w-full flex justify-center z-30 drop-shadow-md ${getOrnamentPos("progressBar")}`}
        >
          <img
            src="/public/spotify/3/Progress.svg"
            className="w-[350px]"
            alt="Progress Music"
          />
        </div>
        <div
          className={`flex items-center justify-center gap-7 mb-3 pointer-events-auto ${getOrnamentPos("grupKontrol")}`}
        >
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnPrev")}`}
          >
            <img
              src="/public/spotify/3/Previous.svg"
              alt="Previous"
              className="w-5 h-5"
            />
          </button>
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnPlay")}`}
          >
            <img
              src="/public/spotify/3/Play.svg"
              alt="Play"
              className="w-8 h-8"
            />
          </button>
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnNext")}`}
          >
            <img
              src="/public/spotify/3/Next.svg"
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>
        <div
          className={`flex items-center justify-between w-full z-30 ${getOrnamentPos("grupVolume")}`}
        >
          <img
            src="/public/spotify/3/NoSound.svg"
            alt="Mute"
            className="w-4 h-4 shrink-0"
          />
          <img
            src="/public/spotify/3/Volume.svg"
            alt="Volume Bar"
            className="flex-1 mx-3 h-[4px] w-20"
          />
          <img
            src="/public/spotify/3/Sound.svg"
            alt="Sound"
            className="w-4 h-4 shrink-0"
          />
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div
        className={`absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-3 pointer-events-none ${getOrnamentPos("footerWrapper")}`}
      >
        <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shrink-0">
          <img
            src="/public/spotify/3/SpotifyIconWhite.svg"
            alt="Spotify"
            className="w-[20px] h-[20px]"
          />
        </div>
        <img
          src="/public/spotify/3/SoundWaveSpotify.svg"
          alt="SoundWave"
          className="h-7 object-contain"
        />
      </div>
    </>
  );
}

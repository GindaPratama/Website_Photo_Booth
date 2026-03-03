import React from "react";

export default function ThemeSpotifyV2({ layoutId }) {
  const getOrnamentPos = (name) => {
    const isHorizontal = layoutId === "2-horizontal";
    const isGrid = ["4-grid", "6-grid", "9-grid"].includes(layoutId);

    if (isHorizontal) {
      switch (name) {
        case "container":
          return "top-[30px] left-[10px] right-[10px] bottom-[20px]";
        case "logo":
          return "hidden";
        case "headphone":
          return "top-[8%] left-[0%] w-[50px]";
        case "star1":
          return "hidden";
        case "star2":
          return "hidden";
        case "star3":
          return "hidden";
        case "star4":
          return "hidden";
        case "star5":
          return "hidden";
        case "flowers":
          return "top-[10%] right-[2%] w-[40px]";

        // --- BUNGKUS UTAMA PLAYER ---
        case "playerWrapper":
          return "bottom-[20px]";

        // --- ECERAN PLAYER ---
        case "teksLagu":
          return "";
        case "progressBar":
          return "top-[40%]"; // Biar agak lega di horizontal
        case "grupKontrol":
          return "";
        case "btnPrev":
          return "";
        case "btnStop":
          return "";
        case "btnNext":
          return "";
        case "grupVolume":
          return "hidden";
        case "iconNoSound":
          return "h";
        case "barVolume":
          return "h";
        case "iconSound":
          return "";

        // --- FOOTER (Spotify Hitam & Soundwave) ---
        // Karena di-return "hidden", otomatis ini bakal hilang di layout 2-horizontal
        case "footerWrapper":
          return "hidden";
        case "spotifyBlack":
          return "hidden";
        case "soundWave":
          return "hidden";
      }
    } else if (isGrid) {
      switch (name) {
        case "container":
          return "top-[44px] left-[10px] right-[10px] bottom-[45px]";
        case "logo":
          return "top-[50px] right-[20px]";
        case "headphone":
          return "top-[24%] left-[0px]";
        case "star1":
          return "top-[28%] right-[0px]";
        case "star2":
          return "top-[35%] right-[10px]";
        case "star3":
          return "top-[45%] right-[40%]";
        case "star4":
          return "top-[65%] right-[50%]";
        case "star5":
          return "top-[69%] right-[45%]";
        case "flowers":
          return "top-[46%] right-[10px]";

        case "playerWrapper":
          return "bottom-[50px]";
        case "teksLagu":
          return "";
        case "progressBar":
          return "";
        case "grupKontrol":
          return "";
        case "btnPrev":
          return "";
        case "btnStop":
          return "";
        case "btnNext":
          return "";
        case "grupVolume":
          return "";
        case "iconNoSound":
          return "";
        case "barVolume":
          return "";
        case "iconSound":
          return "";

        case "footerWrapper":
          return "";
        case "spotifyBlack":
          return "";
        case "soundWave":
          return "";
      }
    }

    // Default (3-Vertical & 4-Vertical)
    switch (name) {
      case "container":
        return "top-[44px] left-[8px] right-[8px] bottom-[45px]";
      case "logo":
        return "top-[50px] right-[15px]";
      case "headphone":
        return "top-[24%] left-[-4px]";
      case "star1":
        return "top-[28%] right-[-9px]";
      case "star2":
        return "top-[35%] right-[-1px]";
      case "star3":
        return "top-[45%] right-[180px]";
      case "star4":
        return "top-[65%] right-[190px]";
      case "star5":
        return "top-[69%] right-[180px]";
      case "flowers":
        return "top-[46%] right-[10px]";

      case "playerWrapper":
        return "bottom-[50px]";
      case "teksLagu":
        return "";
      case "progressBar":
        return "";
      case "grupKontrol":
        return "";
      case "btnPrev":
        return "";
      case "btnStop":
        return "";
      case "btnNext":
        return "";
      case "grupVolume":
        return "";
      case "iconNoSound":
        return "";
      case "barVolume":
        return "";
      case "iconSound":
        return "";

      case "footerWrapper":
        return "";
      case "spotifyBlack":
        return "";
      case "soundWave":
        return "";
    }
    return "";
  };

  return (
    <>
      <div
        className={`absolute ${getOrnamentPos("container")} bg-[#9c6a7a] rounded-[1.2rem] z-0 shadow-sm`}
      />

      <div className="absolute top-2 left-0 w-full flex justify-between items-center px-5 z-20 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 drop-shadow-sm text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 tracking-widest drop-shadow-sm text-white transition-colors"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </div>

      <div
        className={`absolute ${getOrnamentPos("logo")} w-[44px] h-[44px] bg-[#ff9fbb] rounded-full flex items-center justify-center z-30 shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/2/SpotifyIconPink.svg"
          className="w-[24px] h-[24px]"
          alt="Spotify"
        />
      </div>

      <div
        className={`absolute ${getOrnamentPos("headphone")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/2/HeadphoneWithFlower.svg"
          className="w-[65px]"
          alt="Headphone"
        />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star1")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/2/Star.svg" className="w-[60px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star2")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/2/Star.svg" className="w-[30px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star3")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/2/Star.svg" className="w-[60px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star4")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/2/Star.svg" className="w-[60px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("star5")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img src="/public/spotify/2/Star.svg" className="w-[20px]" alt="Star" />
      </div>
      <div
        className={`absolute ${getOrnamentPos("flowers")} z-30 drop-shadow-md pointer-events-none`}
      >
        <img
          src="/public/spotify/2/flowers.svg"
          className="w-[65px]"
          alt="Flowers"
        />
      </div>

      {/* --- BUNGKUS UTAMA PLAYER --- */}
      <div
        className={`absolute ${getOrnamentPos("playerWrapper")} right-1 w-full px-7 z-20 flex flex-col pointer-events-none`}
      >
        {/* Teks Lagu */}
        <div className={`w-full text-left mb-5 ${getOrnamentPos("teksLagu")}`}>
          <h2 className="font-extrabold text-[15px] text-white leading-tight drop-shadow-md">
            Menua Bersama
          </h2>
          <p className="text-[12px] font-medium text-white/80 drop-shadow-md">
            Anggis Devaki
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className={`mb-4 w-full flex justify-center z-30 drop-shadow-md ${getOrnamentPos("progressBar")}`}
        >
          <img
            src="/public/spotify/2/Progress.svg"
            className="w-[350px]"
            alt="Progress"
          />
        </div>

        {/* Grup Kontrol (Prev, Stop, Next) */}
        <div
          className={`flex items-center justify-center gap-7 mb-3 pointer-events-auto ${getOrnamentPos("grupKontrol")}`}
        >
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnPrev")}`}
          >
            <img
              src="/public/spotify/2/Previous.svg"
              alt="Previous"
              className="w-5 h-5"
            />
          </button>
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnStop")}`}
          >
            <img
              src="/public/spotify/2/Stop.svg"
              alt="Stop"
              className="w-8 h-8"
            />
          </button>
          <button
            className={`hover:opacity-80 transition-opacity cursor-pointer ${getOrnamentPos("btnNext")}`}
          >
            <img
              src="/public/spotify/2/Next.svg"
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Grup Volume (NoSound, Bar, Sound) */}
        <div
          className={`pb-1 flex items-center justify-between w-full z-30 pointer-events-none ${getOrnamentPos("grupVolume")}`}
        >
          <img
            src="/public/spotify/2/NoSound.svg"
            alt="Mute"
            className={`w-4 h-4 ${getOrnamentPos("iconNoSound")}`}
          />
          <img
            src="/public/spotify/2/Volume.svg"
            alt="Volume Bar"
            className={`flex-1 mx-3 h-[6px] w-[1px] object-fill ${getOrnamentPos("barVolume")}`}
          />
          <img
            src="/public/spotify/2/Sound.svg"
            alt="Sound"
            className={`w-4 h-4 ${getOrnamentPos("iconSound")}`}
          />
        </div>
      </div>

      {/* --- FOOTER SPOTIFY HITAM & SOUNDWAVE --- */}
      <div
        className={`absolute bottom-[8px] left-0 w-full flex items-center justify-center gap-3 z-20 pointer-events-none ${getOrnamentPos("footerWrapper")}`}
      >
        <img
          src="/public/spotify/2/SpotifyIconBlack.svg"
          alt="Spotify"
          className={`w-7 h-7 ${getOrnamentPos("spotifyBlack")}`}
        />
        <img
          src="/public/spotify/2/SoundWave.svg"
          alt="SoundWave"
          className={`h-7 ${getOrnamentPos("soundWave")}`}
        />
      </div>
    </>
  );
}

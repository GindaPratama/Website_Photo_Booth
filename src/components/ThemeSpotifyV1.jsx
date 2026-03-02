import React from "react";

const isLightBackground = (colorStr) => {
  if (!colorStr) return false;

  const darkClasses = [
    "bg-black",
    "bg-[#000000]",
    "bg-[#191970]",
    "bg-[#800000]",
    "bg-[#3e2723]",
    "bg-[#2e8b57]",
    "bg-[#808080]",
    "bg-[#181818]",
    "bg-gradient-to-bl from-gray-700 to-black",
  ];
  if (darkClasses.includes(colorStr)) return false;

  const hexMatch = colorStr.match(/#([0-9a-fA-F]{3,6})/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128;
  }

  return true;
};

export default function ThemeSpotifyV1({ frameColor }) {
  const isLight = isLightBackground(frameColor);

  const textMain = isLight ? "text-gray-900" : "text-white";
  const textSub = isLight ? "text-gray-600" : "text-gray-400";
  const barBg = isLight ? "bg-black/20" : "bg-white/30";
  const iconClass = isLight
    ? "invert opacity-80 hover:opacity-100"
    : "opacity-80 hover:opacity-100";
  const playCircleBg = isLight ? "bg-gray-900" : "bg-white";
  const playIconClass = isLight ? "" : "invert";

  return (
    <>
      {/* HEADER SPOTIFY */}
      <div className="absolute top-4 left-0 w-full flex justify-between items-center px-4 z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 drop-shadow-sm transition-colors ${textMain}`}
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
          className={`h-5 w-5 tracking-widest drop-shadow-sm transition-colors ${textMain}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </div>

      {/* MUSIC PLAYER */}
      <div className="absolute bottom-3 left-0 w-full px-5 z-20 flex flex-col gap-1">
        {/* Judul + Ikon Love */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col text-left gap-0.5">
            <span
              className={`font-extrabold text-[15px] leading-none drop-shadow-sm transition-colors ${textMain}`}
            >
              I LOVE YOU SO
            </span>
            <span
              className={`text-[11px] font-medium tracking-wide transition-colors ${textSub}`}
            >
              THE WALTERS
            </span>
          </div>
          <img
            src="../public/spotify/1/Love.svg"
            alt="Love"
            className="w-5 h-5 drop-shadow-sm hover:scale-110 transition-transform cursor-pointer"
          />
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-1 rounded-full mb-4 relative flex items-center cursor-pointer transition-colors ${barBg}`}
        >
          <div className="h-full bg-[#1DB954] w-[45%] rounded-full relative">
            <div className="w-2.5 h-2.5 bg-[#1DB954] rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 shadow-sm" />
          </div>
        </div>

        {/* Kontrol Playback */}
        <div className="flex justify-between items-center px-1">
          <button className="hover:scale-110 transition-transform">
            <img
              src="../public/spotify/1/Shuffle.svg"
              alt="Shuffle"
              className={`w-4 h-4 transition-all ${iconClass}`}
            />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img
              src="../public/spotify/1/Previous.svg"
              alt="Prev"
              className={`w-4 h-4 transition-all ${iconClass}`}
            />
          </button>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-all ${playCircleBg}`}
          >
            <img
              src="../public/spotify/1/Pause.svg"
              alt="Pause"
              className={`w-4 h-4 ${playIconClass}`}
            />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img
              src="../public/spotify/1/Next.svg"
              alt="Next"
              className={`w-4 h-4 transition-all ${iconClass}`}
            />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img
              src="../public/spotify/1/Repeat.svg"
              alt="Repeat"
              className={`w-4 h-4 transition-all ${iconClass}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

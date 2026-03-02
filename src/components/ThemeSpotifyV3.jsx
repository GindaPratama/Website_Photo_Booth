import React from "react";

export default function ThemeSpotifyV3() {
  return (
    <>
      {/* BACKGROUND SPLIT COKLAT */}
      <div className="absolute inset-0 z-0 flex pointer-events-none rounded-2xl overflow-hidden">
        <div className="w-[45%] bg-[#cca88a] h-full" />
        <div className="w-[55%] bg-[#3a130e] h-full" />
      </div>

      {/* DIV 2 (DALAM): Kotak Coklat ditaruh di belakang foto (z-0) */}
      <div className="absolute inset-x-2 top-[44px] bottom-[55px] z-0 bg-[#824a41] rounded-[1.2rem] shadow-md pointer-events-none" />

      {/* HEADER (Atas) */}
      <div className="absolute top-4 inset-x-5 z-20 flex justify-between items-center pointer-events-none">
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

      {/* Logo Spotify Kanan atas */}
      <div className="absolute top-[35px] right-[10px] w-[46px] h-[46px] bg-[#cca88a] rounded-full flex items-center justify-center z-30 shadow-md pointer-events-none">
        <img
          src="/public/spotify/3/SpotifyIconBrown.svg"
          className="w-[28px] h-[28px]"
          alt="Spotify"
        />
      </div>

      {/* ORNAMEN */}
      <div className="absolute top-[23%] left-[5px] z-30 drop-shadow-md pointer-events-none">
        <img src="/public/spotify/3/Star.svg" className="w-[45px]" alt="Star" />
      </div>
      <div className="absolute top-[26%] right-[10px] z-30 drop-shadow-md pointer-events-none hover:rotate-12 transition-transform">
        <img
          src="/public/spotify/3/Chocolate.svg"
          className="w-[60px] -rotate-12"
          alt="Chocolate"
        />
      </div>
      <div className="absolute top-[48%] left-[5px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/3/Coffee.svg"
          className="w-[50px] -rotate-6"
          alt="Coffee"
        />
      </div>
      <div className="absolute top-[50%] right-[10px] z-30 drop-shadow-md pointer-events-none">
        <img src="/public/spotify/3/Star.svg" className="w-[30px]" alt="Star" />
      </div>
      <div className="absolute top-[54%] right-[5px] z-30 drop-shadow-md pointer-events-none">
        <img src="/public/spotify/3/Star.svg" className="w-[15px]" alt="Star" />
      </div>
      <div className="absolute top-[65%] left-[2px] z-30 drop-shadow-md pointer-events-none">
        <img src="/public/spotify/3/Star.svg" className="w-[45px]" alt="Star" />
      </div>
      <div className="absolute top-[70%] left-[px] z-30 drop-shadow-md pointer-events-none">
        <img src="/public/spotify/3/Star.svg" className="w-[20px]" alt="Star" />
      </div>

      {/* PLAYER AREA */}
      <div className="absolute bottom-[68px] inset-x-6 z-20 flex flex-col pointer-events-none">
        <div className="mb-1">
          <h2 className="pb-2 font-extrabold text-[15px] text-white leading-none drop-shadow-md">
            Menua Bersama
          </h2>
          <p className="text-[11px] font-medium text-white/80 drop-shadow-md leading-none">
            Anggis Devaki
          </p>
        </div>

        <div className="mb-3 mt-1 w-full flex justify-center z-30 drop-shadow-md">
          <img
            src="/public/spotify/3/Progress.svg"
            className="w-30 h-2"
            alt="Progress Music"
          />
        </div>

        <div className="flex items-center justify-center gap-7 mb-3 pointer-events-auto">
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/3/Previous.svg"
              alt="Previous"
              className="w-5 h-5"
            />
          </button>
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/3/Play.svg"
              alt="Play"
              className="w-8 h-8"
            />
          </button>
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/3/Next.svg"
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="flex items-center justify-between w-full z-30">
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

      {/* SPOTIFY & SOUNDWAVE AREA */}
      {/* Centering diperbaiki biar ga mencong */}
      <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-3 pointer-events-none">
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
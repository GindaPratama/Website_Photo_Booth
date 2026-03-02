import React from "react";

export default function ThemeSpotifyV2() {
  return (
    <>
      {/* DIV 2 (DALAM): Kotak Maroon ditaruh di belakang foto (z-0) */}
      <div className="absolute top-[44px] left-[8px] right-[8px] bottom-[45px] bg-[#9c6a7a] rounded-[1.2rem] z-0 shadow-sm"></div>

      {/* HEADER PINK MUDA (Atas) - Menggunakan SVG murni seperti V1 */}
      <div className="absolute top-4 left-0 w-full flex justify-between items-center px-5 z-20">
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

      {/* Logo Spotify Kanan atas (warna pink) */}
      <div className="absolute top-[50px] right-[15px] w-[44px] h-[44px] bg-[#ff9fbb] rounded-full flex items-center justify-center z-30 shadow-md">
        <img
          src="/public/spotify/2/SpotifyIconPink.svg"
          className="w-[24px] h-[24px]"
          alt="Spotify"
        />
      </div>

      {/* Headphone */}
      <div className="absolute top-[24%] left-[-4px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/HeadphoneWithFlower.svg"
          className="w-[65px]"
          alt="Headphone"
        />
      </div>

      {/* ORNAMEN BINTANG */}
      <div className="absolute top-[28%] right-[-9px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/Star.svg"
          className="w-[60px]"
          alt="Big Star"
        />
      </div>

      <div className="absolute top-[35%] right-[-1px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/Star.svg"
          className="w-[30px]"
          alt="Small Star"
        />
      </div>

      <div className="absolute top-[45%] right-[180px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/Star.svg"
          className="w-[60px]"
          alt="Small Star"
        />
      </div>

      <div className="absolute top-[65%] right-[190px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/Star.svg"
          className="w-[60px]"
          alt="Small Star"
        />
      </div>

      <div className="absolute top-[69%] right-[180px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/Star.svg"
          className="w-[20px]"
          alt="Small Star"
        />
      </div>

      <div className="absolute top-[46%] right-[10px] z-30 drop-shadow-md pointer-events-none">
        <img
          src="/public/spotify/2/flowers.svg"
          className="w-[65px]"
          alt="Headphone"
        />
      </div>

      {/* PLAYER AREA (Di dalam kotak Maroon) */}
      <div className="absolute bottom-[50px] right-1 w-full px-7 z-20 flex flex-col">
        {/* Wrapper Teks */}
        <div className="w-full text-left mb-6">
          <h2 className="font-extrabold text-[15px] text-white leading-tight drop-shadow-md">
            Menua Bersama
          </h2>
          <p className="text-[11px] font-medium text-white/80 drop-shadow-md">
            Anggis Devaki
          </p>
        </div>

        {/* Progress Music Bar */}
        <div className="mb-4 w-full flex justify-center z-30 drop-shadow-md pointer-events-none">
          <img
            src="/public/spotify/2/Progress.svg"
            className="w-[120px]"
            alt="Progress Music"
          />
        </div>

        {/* Controls (Previous, Pause, Next) */}
        <div className="flex items-center justify-center gap-7 mb-3">
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/2/Previous.svg"
              alt="Previous"
              className="w-5 h-5"
            />
          </button>

          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/2/Stop.svg"
              alt="Pause"
              className="w-8 h-8"
            />
          </button>

          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <img
              src="/public/spotify/2/Next.svg"
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-between w-full z-30 pointer-events-none">
          <img
            src="/public/spotify/2/NoSound.svg"
            alt="Mute"
            className="w-3 h-3"
          />
          {/* flex-1 bikin bar volume menuhin sisa ruang kosong di tengah */}
          <img
            src="/public/spotify/2/Volume.svg"
            alt="Volume Bar"
            className="flex-1 mx-3 h-[4px] w-[3px] object-fill"
          />
          <img
            src="/public/spotify/2/Sound.svg"
            alt="Sound"
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* SPOTIFY & SOUNDWAVE AREA (Di luar kotak Maroon / area Pink paling bawah) */}
      <div className="absolute bottom-[8px] left-0 w-full flex items-center justify-center gap-3 z-20 pointer-events-none">
        <img
          src="/public/spotify/2/SpotifyIconBlack.svg"
          alt="Spotify"
          className="w-6 h-6"
        />
        <img
          src="/public/spotify/2/SoundWave.svg"
          alt="SoundWave"
          className="h-8"
        />
      </div>
    </>
  );
}

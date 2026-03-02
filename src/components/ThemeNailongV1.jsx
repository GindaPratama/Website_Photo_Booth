import React from "react";

export default function ThemeNailongV1() {
  return (
    <>
      {/* ── BACKGROUND GRID KOTAK-KOTAK KUNING ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          backgroundColor: "#f5e4a0",
          backgroundImage: `
            linear-gradient(rgba(200,170,60,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,170,60,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── NAILONG KIRI ATAS (duduk) ── */}
      <div className="absolute top-[10px] left-[10px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/nailongv1/NailongTop.svg"
          alt=""
          className="w-[55px]"
        />
      </div>

      {/* ── NAILONG KANAN ATAS (terkejut) ── */}
      <div className="absolute top-[100px] right-[0px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/nailongv1/NailongSemiTop.svg"
          alt=""
          className="w-[70px] "
        />
      </div>

      {/* ── NAILONG KIRI TENGAH (berdiri) ── */}
      <div className="absolute top-[40%] left-[0px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/nailongv1/NailongMid.svg"
          alt=""
          className="w-[70px]"
        />
      </div>

      {/* ── NAILONG KANAN BAWAH TENGAH (pakai sayur) ── */}
      <div className="absolute top-[62%] right-[0px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/nailongv1/NailongSemiBottom.svg"
          alt=""
          className="w-[70px]"
        />
      </div>

      {/* ── NAILONG KIRI BAWAH (sedih) ── */}
      <div className="absolute bottom-[0px] left-[0px] z-30 pointer-events-none drop-shadow-md">
        <img
          src="/random/nailongv1/NailongBottom.svg"
          alt=""
          className="w-[120px]"
        />
      </div>

      {/* ── TEKS FRIENDS (SVG) ── */}
      <div className="absolute bottom-[38px] left-10 w-full z-30 flex items-center justify-center pointer-events-none">
        <img
          src="/random/nailongv1/FRIENDS.svg"
          alt="FRIENDS"
          className="h-[28px] object-contain"
        />
      </div>
    </>
  );
}

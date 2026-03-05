import React from "react";

export default function Themes({ activeTheme, themeMeta, layoutId }) {
  if (activeTheme === "none" || !themeMeta) return null;

  // Ambil path file sesuai layoutId yang sedang aktif
  const imageSrc = themeMeta.files?.[layoutId];

  // Tidak ada file untuk layout ini → tidak tampil, tidak error
  if (!imageSrc) return null;

  return (
    <img
      src={imageSrc}
      alt={`Theme - ${activeTheme} - ${layoutId}`}
      className="absolute inset-0 w-full h-full z-30 pointer-events-none object-cover"
      onError={(e) => (e.target.style.display = "none")}
    />
  );
}

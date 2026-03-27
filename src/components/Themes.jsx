import React from "react";

/**
 * Themes component — render 2 layer opsional:
 *
 * 1. BACKGROUND layer  (z-5, di BELAKANG foto)
 * → didefinisikan via  themeMeta.background?.[layoutId]
 * → cocok untuk motif/pattern yang mengisi frame
 *
 * 2. OVERLAY layer  (z-30, di ATAS foto)
 * → didefinisikan via  themeMeta.files?.[layoutId]
 * → cocok untuk frame / dekorasi di paling atas
 */
export default function Themes({ activeTheme, themeMeta, layoutId }) {
  if (activeTheme === "none" || !themeMeta) return null;

  const bgSrc = themeMeta.background?.[layoutId];
  const overlaySrc = themeMeta.files?.[layoutId];

  // Tidak ada layer sama sekali untuk layout ini → tidak tampil
  if (!bgSrc && !overlaySrc) return null;

  return (
    <>
      {/* ── LAYER 1: Background motif / pattern (di belakang foto) ── */}
      {bgSrc && (
        <img
          src={bgSrc}
          alt={`Background - ${activeTheme}`}
          className="absolute inset-0 w-full h-full z-5 pointer-events-none object-fill"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      {/* ── LAYER 2: Overlay / frame dekorasi (di atas foto) ── */}
      {overlaySrc && (
        <img
          src={overlaySrc}
          alt={`Theme - ${activeTheme} - ${layoutId}`}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none object-fill"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
    </>
  );
}
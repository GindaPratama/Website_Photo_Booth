import React from "react";
import { SOLID_COLORS, PATTERN_COLORS } from "../../utils/constants";

const SidebarColors = ({ frameColor, setFrameColor }) => {
  return (
    <div>
      <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
        Warna Frame
      </p>
      <div className="flex flex-wrap gap-2">
        {/* Color picker */}
        <div
          className={`relative w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 shrink-0 cursor-pointer overflow-hidden ${
            !frameColor.startsWith("bg-")
              ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
              : "border border-black/5"
          }`}
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "conic-gradient(#ffadad,#ffd6a5,#fdffb6,#caffbf,#9bf6ff,#bdb2ff,#ffc6ff,#ffadad)",
            }}
          />
          <input
            type="color"
            value={!frameColor.startsWith("bg-") ? frameColor : "#ffffff"}
            onChange={(e) => setFrameColor(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {SOLID_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setFrameColor(c)}
            className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${c} ${
              frameColor === c
                ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
                : "border border-black/5"
            }`}
          />
        ))}
        {PATTERN_COLORS.map((p, i) => (
          <button
            key={i}
            onClick={() => setFrameColor(p)}
            className={`w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 ${p} ${
              frameColor === p
                ? "ring-2 ring-offset-2 ring-rose-400 scale-110"
                : "border border-black/5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarColors;

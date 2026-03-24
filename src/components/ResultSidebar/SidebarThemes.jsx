import React from "react";
import { THEME_META } from "../../utils/constants";

const SidebarThemes = ({
  activeTheme,
  setActiveTheme,
  layoutId,
  setFrameColor,
}) => {
  const handleThemeSelect = (key) => {
    const newTheme = activeTheme === key ? "none" : key;
    setActiveTheme(newTheme);
    if (newTheme !== "none" && THEME_META[newTheme]) {
      setFrameColor(THEME_META[newTheme].defaultColor);
    }
  };

  return (
    <div>
      <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3">
        Tema Spesial
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3">
        <button
          onClick={() => handleThemeSelect("none")}
          className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium ${
            activeTheme === "none"
              ? "border-rose-400 bg-rose-50 shadow-sm"
              : "border-pink-100 hover:border-rose-200 bg-white/60"
          }`}
        >
          <span className="text-rose-400">None</span>
        </button>
        {Object.entries(THEME_META).map(([id, theme]) => {
          if (!theme.files?.[layoutId]) return null;
          return (
            <button
              key={id}
              onClick={() => handleThemeSelect(id)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors duration-200 ${
                activeTheme === id
                  ? "border-rose-400 shadow-md ring-2 ring-rose-200/50"
                  : "border-pink-100 hover:border-rose-200"
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={theme.thumbnail}
                  alt={theme.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-theme.png";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent py-1">
                  <p className="text-[9px] sm:text-[10px] font-medium text-white text-center drop-shadow-sm">
                    {theme.label}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarThemes;

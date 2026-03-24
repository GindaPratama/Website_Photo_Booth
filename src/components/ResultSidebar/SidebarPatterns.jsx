import React from "react";
import { PATTERN_LIST } from "../../utils/constants";

const SidebarPatterns = ({
  activePattern,
  setActivePattern,
  patternOpacity,
  setPatternOpacity,
}) => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-3 flex items-center justify-between">
          Motif Background
          <button
            onClick={() => setActivePattern(null)}
            className="text-xs text-rose-400 hover:text-rose-500 normal-case"
          >
            Hapus Motif
          </button>
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {PATTERN_LIST.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 border-2 ${
                activePattern === pattern.id
                  ? "bg-rose-50 border-rose-400 shadow-md ring-2 ring-rose-200/50 scale-105"
                  : "bg-white border-pink-100 hover:border-rose-200 hover:bg-rose-50/50"
              }`}
            >
              {pattern.emoji ? (
                <span className="text-xl">{pattern.emoji}</span>
              ) : pattern.thumbnail ? (
                <div className="w-10 h-10 overflow-hidden rounded-lg border border-pink-100 shadow-sm flex items-center justify-center bg-white">
                  <img
                    src={pattern.thumbnail}
                    alt={pattern.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : null}
              <span className="text-[9px] font-medium text-rose-400 text-center leading-tight">
                {pattern.label || pattern.Label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Opacity Control */}
      {activePattern && (
        <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-medium text-rose-400">
              Transparansi Motif
            </p>
            <span className="text-xs text-rose-300">{patternOpacity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={patternOpacity}
            onChange={(e) => setPatternOpacity(Number(e.target.value))}
            className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
          />
        </div>
      )}
    </div>
  );
};

export default SidebarPatterns;

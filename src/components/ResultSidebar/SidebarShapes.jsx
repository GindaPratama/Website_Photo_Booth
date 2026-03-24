import React from "react";
import { GLOBAL_SHAPES } from "../../utils/constants";

const SidebarShapes = ({
  radiusAmount,
  setRadiusAmount,
  globalShape,
  setGlobalShape,
  globalScale,
  setGlobalScale,
  perFrameShapes,
  setPerFrameShapes,
  perFrameAmounts,
  setPerFrameAmounts,
  perFrameScales,
  setPerFrameScales,
  selectedFrame,
  setSelectedFrame,
  capturedImages,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* -- Radius Slider -- */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
            Kelengkungan
          </p>
          <span className="text-[11px] font-medium text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
            {radiusAmount}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={64}
          value={radiusAmount}
          onChange={(e) => setRadiusAmount(Number(e.target.value))}
          className="w-full accent-rose-400 h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-rose-200 mt-1">
          <span>Lurus</span>
          <span>Melengkung</span>
        </div>
      </div>

      {/* -- Global Shape -- */}
      <div>
        <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-2">
          Bentuk Semua Foto
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {GLOBAL_SHAPES.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setGlobalShape(shape.id)}
              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 ${
                globalShape === shape.id
                  ? "border-rose-400 bg-rose-50 text-rose-500 shadow-md ring-2 ring-rose-200/50 scale-105"
                  : "border-pink-100 text-rose-300 hover:border-rose-200 hover:bg-rose-50/50"
              }`}
            >
              <span className="text-xl leading-none">{shape.icon}</span>
              <span className="text-[10px] font-medium">{shape.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* -- Global Scale -- */}
      {["love", "star", "hexagon", "circle"].includes(globalShape) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
              Zoom / Ukuran Foto
            </p>
            <span className="text-[11px] font-medium text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
              {globalScale}%
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={200}
            value={globalScale}
            onChange={(e) => setGlobalScale(Number(e.target.value))}
            className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
          />
        </div>
      )}

      {/* -- Per-Frame Shape -- */}
      {capturedImages.length > 1 && (
        <div>
          <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest mb-1">
            Bentuk Per Foto
          </p>
          <p className="text-[9px] text-rose-200 mb-3">
            Pilih foto → lalu pilih bentuknya
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {capturedImages.map((src, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setSelectedFrame(selectedFrame === idx ? null : idx)
                }
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors duration-150 ${
                  selectedFrame === idx
                    ? "border-rose-400 ring-2 ring-rose-200 shadow-md"
                    : "border-pink-100 hover:border-rose-200"
                }`}
              >
                <img
                  src={src}
                  alt={`Frame ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/40 text-[8px] text-white text-center py-0.5">
                  {idx + 1}
                </div>
                {perFrameShapes[idx] && (
                  <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-rose-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Shape selector untuk frame terpilih */}
          {selectedFrame !== null && (
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-medium text-rose-400 mb-2">
                  Bentuk Foto #{selectedFrame + 1}:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      setPerFrameShapes((prev) => {
                        const next = { ...prev };
                        delete next[selectedFrame];
                        return next;
                      });
                      setPerFrameAmounts((prev) => {
                        const next = { ...prev };
                        delete next[selectedFrame];
                        return next;
                      });
                      setPerFrameScales((prev) => {
                        const next = { ...prev };
                        delete next[selectedFrame];
                        return next;
                      });
                    }}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-[9px] font-medium transition-all duration-150 ${
                      perFrameShapes[selectedFrame] === undefined
                        ? "border-rose-400 bg-rose-50 text-rose-500 shadow-sm"
                        : "border-pink-100 text-rose-300 hover:border-rose-200"
                    }`}
                  >
                    <span className="text-base">↩</span>
                    <span>Global</span>
                  </button>

                  {GLOBAL_SHAPES.filter((s) => s.id !== "none").map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => {
                        setPerFrameShapes((prev) => ({
                          ...prev,
                          [selectedFrame]: shape.id,
                        }));
                        setPerFrameAmounts((prev) => ({
                          ...prev,
                          [selectedFrame]: 16,
                        }));
                      }}
                      className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-[9px] font-medium transition-all duration-150 ${
                        perFrameShapes[selectedFrame] === shape.id
                          ? "border-rose-400 bg-rose-50 text-rose-500 shadow-sm"
                          : "border-pink-100 text-rose-300 hover:border-rose-200 hover:bg-rose-50/50"
                      }`}
                    >
                      <span className="text-base leading-none">
                        {shape.icon}
                      </span>
                      <span>{shape.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {perFrameShapes[selectedFrame] !== undefined &&
                perFrameShapes[selectedFrame] !== "none" && (
                  <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-medium text-rose-400">
                        Ukuran Lengkung / Motif (Foto #{selectedFrame + 1})
                      </p>
                      <span className="text-[10px] text-rose-300">
                        {perFrameAmounts[selectedFrame] !== undefined
                          ? perFrameAmounts[selectedFrame]
                          : radiusAmount}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="40"
                      value={
                        perFrameAmounts[selectedFrame] !== undefined
                          ? perFrameAmounts[selectedFrame]
                          : radiusAmount
                      }
                      onChange={(e) => {
                        setPerFrameAmounts((prev) => ({
                          ...prev,
                          [selectedFrame]: Number(e.target.value),
                        }));
                      }}
                      className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                    />
                  </div>
                )}

              {perFrameShapes[selectedFrame] &&
                ["love", "star", "hexagon", "circle"].includes(
                  perFrameShapes[selectedFrame]
                ) && (
                  <div className="bg-rose-50/50 rounded-xl p-3 border border-pink-100 mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-medium text-rose-400">
                        Zoom Foto #{selectedFrame + 1}
                      </p>
                      <span className="text-[10px] text-rose-300">
                        {perFrameScales[selectedFrame] !== undefined
                          ? perFrameScales[selectedFrame]
                          : globalScale}
                        %
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={
                        perFrameScales[selectedFrame] !== undefined
                          ? perFrameScales[selectedFrame]
                          : globalScale
                      }
                      onChange={(e) => {
                        setPerFrameScales((prev) => ({
                          ...prev,
                          [selectedFrame]: Number(e.target.value),
                        }));
                      }}
                      className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-500"
                    />
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarShapes;

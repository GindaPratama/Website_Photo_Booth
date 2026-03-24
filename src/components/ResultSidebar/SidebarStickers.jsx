import React, { useState, useRef } from "react";
import {
  EMOJI_STICKERS,
  IMAGE_STICKERS,
  LOCAL_PROJECT_STICKERS,
} from "../../utils/constants";

const SidebarStickers = ({
  addSticker,
  placedStickers,
  setPlacedStickers,
  selectedStickerId,
  setSelectedStickerId,
  resizeSticker,
  setStickerSize,
  deleteSticker,
}) => {
  const [stickerTab, setStickerTab] = useState("emoji");
  const [customEmojiInput, setCustomEmojiInput] = useState("");
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [customStickers, setCustomStickers] = useState([]);
  const stickerInputRef = useRef(null);

  const handleStickerUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        setCustomStickers((prev) => [
          ...prev,
          { label: file.name, src: dataUrl },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-tab: Emoji / Image / Custom */}
      <div className="flex gap-1 bg-rose-50 rounded-xl p-1">
        {[
          { id: "emoji", label: "😊 Emoji" },
          { id: "image", label: "🐥 Sticker" },
          { id: "upload", label: "⚙️ Custom" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setStickerTab(t.id)}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
              stickerTab === t.id
                ? "bg-white text-rose-500 shadow-sm"
                : "text-rose-300 hover:text-rose-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* -- Emoji stickers -- */}
      {stickerTab === "emoji" && (
        <div>
          <p className="text-[9px] text-rose-200 mb-2">
            Klik → muncul di foto. Drag untuk pindah.
          </p>
          <div className="grid grid-cols-8 gap-1">
            {EMOJI_STICKERS.map((emoji, i) => (
              <button
                key={i}
                onClick={() => addSticker(emoji, null)}
                className="aspect-square flex items-center justify-center text-xl rounded-lg border border-pink-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-100 hover:scale-110 active:scale-95"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* -- Image stickers (kartun & local) -- */}
      {stickerTab === "image" && (
        <div>
          <p className="text-[9px] text-rose-200 mb-2">
            Koleksi stiker & gambar lokal lo. Klik untuk tambah ke foto.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {[...LOCAL_PROJECT_STICKERS, ...IMAGE_STICKERS].map((stk, i) => (
              <button
                key={i}
                onClick={() => addSticker(stk.label, stk.src)}
                className="aspect-square flex flex-col items-center justify-center gap-0.5 rounded-xl border border-pink-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-100 hover:scale-105 active:scale-95 p-1 overflow-hidden"
                title={stk.label}
              >
                <img
                  src={stk.src}
                  alt={stk.label}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  crossOrigin="anonymous"
                />
                <span className="text-[8px] text-rose-300 truncate w-full text-center">
                  {stk.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* -- Custom / Upload sticker -- */}
      {stickerTab === "upload" && (
        <div className="flex flex-col gap-4">
          {/* 1. Emoji Keyboard */}
          <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm">
            <p className="text-[10px] font-semibold text-rose-400 mb-1">
              Ketik Emoji Keyboard ⌨️
            </p>
            <p className="text-[9px] text-rose-300 mb-2">
              Pake emoji bawaan hape atau PC lo.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customEmojiInput}
                onChange={(e) => setCustomEmojiInput(e.target.value)}
                placeholder="Contoh: 🦖, 🍕, 🚀..."
                className="flex-1 px-3 py-1.5 text-sm border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-200 text-black"
              />
              <button
                onClick={() => {
                  if (customEmojiInput.trim()) {
                    addSticker(customEmojiInput.trim(), null);
                    setCustomEmojiInput("");
                  }
                }}
                className="px-4 py-1.5 bg-rose-400 text-white text-[10px] font-bold rounded-lg hover:bg-rose-500 transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* 2. Link Online / Local Path */}
          <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm">
            <p className="text-[10px] font-semibold text-rose-400 mb-1">
              Dari Link (Online / Local) 🌐
            </p>
            <p className="text-[9px] text-rose-300 mb-2">
              Copas link gambar online atau ketik nama file lokal (contoh:{" "}
              <b>/stickers/bintang.svg</b>).
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://... atau /gambar.png"
                className="flex-1 px-3 py-1.5 text-xs text-zinc-600 border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button
                onClick={() => {
                  if (customUrlInput.trim()) {
                    addSticker("Custom Link", customUrlInput.trim());
                    setCustomUrlInput("");
                  }
                }}
                className="px-4 py-1.5 bg-rose-400 text-white text-[10px] font-bold rounded-lg hover:bg-rose-500 transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* 3. Upload File Lokal (PNG, JPG, SVG) */}
          <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm">
            <p className="text-[10px] font-semibold text-rose-400 mb-2">
              Upload Dari HP/PC (🖼️ PNG, JPG, SVG)
            </p>
            <button
              onClick={() => stickerInputRef.current?.click()}
              className="w-full py-2.5 rounded-xl border border-dashed border-rose-300 hover:border-rose-400 bg-rose-50 hover:bg-rose-100 text-rose-400 text-sm font-medium transition-all flex justify-center items-center gap-2"
            >
              <span className="text-xl">📤</span>
              <span className="text-[11px]">Pilih File...</span>
            </button>
            <input
              ref={stickerInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml, image/webp, image/gif"
              multiple
              className="hidden"
              onChange={handleStickerUpload}
            />

            {customStickers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-pink-50">
                <p className="text-[9px] font-semibold text-rose-300 uppercase tracking-widest mb-2">
                  Stiker Upload-an Lo ({customStickers.length})
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {customStickers.map((stk, i) => (
                    <button
                      key={i}
                      onClick={() => addSticker(stk.label, stk.src)}
                      className="relative aspect-square rounded-lg border border-pink-200 hover:border-rose-400 overflow-hidden hover:scale-105 transition-all group bg-white shadow-xs"
                    >
                      <img
                        src={stk.src}
                        alt={stk.label}
                        className="w-full h-full object-contain p-1"
                      />
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomStickers((p) =>
                            p.filter((_, idx) => idx !== i)
                          );
                        }}
                        className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold hidden group-hover:flex items-center justify-center z-10"
                      >
                        ×
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stiker aktif + resize per sticker */}
      {placedStickers.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-rose-300 uppercase tracking-widest">
              Stiker di Foto ({placedStickers.length})
            </p>
            <button
              onClick={() => {
                setPlacedStickers([]);
                setSelectedStickerId(null);
              }}
              className="text-[9px] text-rose-300 hover:text-rose-500 underline transition-colors"
            >
              Hapus Semua
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {placedStickers.map((sticker) => (
              <div
                key={sticker.id}
                onClick={() =>
                  setSelectedStickerId(
                    sticker.id === selectedStickerId ? null : sticker.id
                  )
                }
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border cursor-pointer transition-all ${
                  selectedStickerId === sticker.id
                    ? "border-rose-400 bg-rose-50 shadow-sm"
                    : "border-pink-100 hover:border-rose-200 bg-white/50"
                }`}
              >
                {/* Preview */}
                <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-rose-50 rounded-lg overflow-hidden">
                  {sticker.src ? (
                    <img
                      src={sticker.src}
                      alt=""
                      className="w-8 h-8 object-contain"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <span className="text-xl">{sticker.emoji}</span>
                  )}
                </div>
                {/* Resize controls */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-rose-300 mb-1 truncate">
                    {sticker.src ? sticker.emoji : sticker.emoji} ·{" "}
                    {sticker.size}px
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        resizeSticker(sticker.id, -8);
                      }}
                      className="w-6 h-6 rounded-full bg-white border border-rose-200 text-rose-400 font-bold text-sm flex items-center justify-center hover:bg-rose-50 shrink-0"
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min={20}
                      max={200}
                      value={sticker.size}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        setStickerSize(sticker.id, Number(e.target.value));
                      }}
                      className="flex-1 accent-rose-400 h-1 cursor-pointer"
                    />
                    <button
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        resizeSticker(sticker.id, 8);
                      }}
                      className="w-6 h-6 rounded-full bg-white border border-rose-200 text-rose-400 font-bold text-sm flex items-center justify-center hover:bg-rose-50 shrink-0"
                    >
                      +
                    </button>
                    <button
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSticker(sticker.id);
                      }}
                      className="w-6 h-6 rounded-full bg-red-100 text-red-500 font-bold text-sm flex items-center justify-center hover:bg-red-200 shrink-0"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {placedStickers.length === 0 && (
        <div className="text-center py-6 text-rose-200 text-xs">
          <div className="text-3xl mb-2">🎀</div>
          Belum ada stiker. Klik stiker di atas!
        </div>
      )}
    </div>
  );
};

export default SidebarStickers;

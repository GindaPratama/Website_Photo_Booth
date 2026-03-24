const fs = require('fs');
let code = fs.readFileSync('src/pages/Result.jsx', 'utf-8');

// 1. Insert React.memo for StickerItem just before const Result = () => {
const stickerItemCode = `
import React from 'react';

const StickerItem = React.memo(({ sticker, isSelected, onSelect, onDelete, onResize, stripRef, onUpdatePosition }) => {
  const [dragPos, setDragPos] = React.useState(null);

  const handleMouseDown = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(sticker.id);
    
    const strip = stripRef.current;
    if (!strip) return;
    const rect = strip.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - (sticker.left / 100) * rect.width;
    const offsetY = e.clientY - rect.top - (sticker.top / 100) * rect.height;
    
    const onMouseMove = (moveEvent) => {
      const currentRect = stripRef.current.getBoundingClientRect();
      const newLeft = ((moveEvent.clientX - currentRect.left - offsetX) / currentRect.width) * 100;
      const newTop = ((moveEvent.clientY - currentRect.top - offsetY) / currentRect.height) * 100;
      setDragPos({
        left: Math.max(-15, Math.min(100, newLeft)),
        top: Math.max(-15, Math.min(100, newTop))
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      setDragPos(prev => {
        if (prev) {
          onUpdatePosition(sticker.id, prev.left, prev.top);
        }
        return null;
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [sticker.id, sticker.left, sticker.top, onSelect, stripRef, onUpdatePosition]);

  const currentLeft = dragPos ? dragPos.left : sticker.left;
  const currentTop = dragPos ? dragPos.top : sticker.top;

  return (
    <div
      className="absolute z-40 group cursor-grab active:cursor-grabbing select-none"
      style={{
        top: \`\${currentTop}%\`,
        left: \`\${currentLeft}%\`,
        fontSize: sticker.src ? undefined : \`\${sticker.size}px\`,
        width: sticker.src ? \`\${sticker.size}px\` : undefined,
        height: sticker.src ? \`\${sticker.size}px\` : undefined,
        lineHeight: 1,
        userSelect: "none",
        borderRadius: sticker.src ? "4px" : undefined,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(sticker.id);
      }}
    >
      {sticker.src ? (
        <img
          src={sticker.src}
          alt={sticker.emoji}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
          crossOrigin="anonymous"
        />
      ) : (
        <span style={{ display: "block" }}>{sticker.emoji}</span>
      )}
      <button
        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold items-center justify-center hidden group-hover:flex z-50 shadow"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); onDelete(sticker.id); }}
      >×</button>
      {isSelected && (
        <>
          <button
            className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onResize(sticker.id, -8); }}
          >−</button>
          <button
            className="absolute -bottom-2 -right-5 w-5 h-5 bg-white border border-rose-300 text-rose-400 rounded-full text-[10px] font-bold flex items-center justify-center z-50 shadow hover:bg-rose-50"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onResize(sticker.id, 8); }}
          >+</button>
        </>
      )}
    </div>
  );
});

const Result = () => {`;
code = code.replace("const Result = () => {", stickerItemCode);

// 2. Remove draggingId and dragOffset states
code = code.replace("const [draggingId, setDraggingId] = useState(null);\n  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });\n", "");

// 3. Replace handleStickerMouseDown, handleMouseMove, handleMouseUp with updateStickerPosition
const dragLogicRegex = /\/\/ ── Stiker: Drag ──[\s\S]*?const handleMouseUp = useCallback\(\(\) => \{\n    setDraggingId\(null\);\n  \}, \[\]\);/;
const updateStickerPosCode = `// ── Stiker: Position ──
  const updateStickerPosition = useCallback((id, left, top) => {
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, left, top } : s))
    );
  }, []);`;
code = code.replace(dragLogicRegex, updateStickerPosCode);

// 4. Remove onMouseMove={handleMouseMove} and onMouseUp={handleMouseUp}
code = code.replace("      onMouseMove={handleMouseMove}\n      onMouseUp={handleMouseUp}", "");

// 5. Replace inline sticker mapping with StickerItem usage
const stickerOverlayRegex = /\{\/\* ── STIKER OVERLAY ── \*\/\}[\s\S]*?\{\/\* ── SIDEBAR ── \*\/\}/;
const newStickerOverlay = `{/* ── STIKER OVERLAY ── */}
              {placedStickers.map((sticker) => (
                <StickerItem
                  key={sticker.id}
                  sticker={sticker}
                  isSelected={selectedStickerId === sticker.id}
                  onSelect={setSelectedStickerId}
                  onDelete={deleteSticker}
                  onResize={resizeSticker}
                  stripRef={stripRef}
                  onUpdatePosition={updateStickerPosition}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR ── */}`;
code = code.replace(stickerOverlayRegex, newStickerOverlay);

fs.writeFileSync('src/pages/Result.jsx', code);
console.log('Result.jsx optimized successfully!');

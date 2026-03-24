const fs = require('fs');
let code = fs.readFileSync('src/pages/Result.jsx', 'utf-8');

// The code starts at {/* ══════════ TAB STIKER ══════════ */}
// and ends somewhere before {/* BOTTOM BAR */}

const startIndex = code.indexOf('{/* ══════════ TAB STIKER ══════════ */}');
const endIndex = code.indexOf('{/* BOTTOM BAR */}');

if (startIndex !== -1 && endIndex !== -1) {
    const toReplace = code.substring(startIndex, endIndex);
    const replacement = `{/* ══════════ TAB STIKER ══════════ */}
            {activeSection === "stiker" && (
              <SidebarStickers
                addSticker={addSticker}
                placedStickers={placedStickers}
                setPlacedStickers={setPlacedStickers}
                selectedStickerId={selectedStickerId}
                setSelectedStickerId={setSelectedStickerId}
                resizeSticker={resizeSticker}
                setStickerSize={setStickerSize}
                deleteSticker={deleteSticker}
              />
            )}
          </div>

          `;
    code = code.replace(toReplace, replacement);
    fs.writeFileSync('src/pages/Result.jsx', code);
    console.log("Successfully replaced TAB STIKER!");
} else {
    console.log("Could not find start or end index");
}

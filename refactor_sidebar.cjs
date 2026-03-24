const fs = require('fs');

let code = fs.readFileSync('src/pages/Result.jsx', 'utf-8');

// 1. Add imports
const importsToAdd = `
import SidebarColors from "../components/ResultSidebar/SidebarColors";
import SidebarThemes from "../components/ResultSidebar/SidebarThemes";
import SidebarPatterns from "../components/ResultSidebar/SidebarPatterns";
import SidebarShapes from "../components/ResultSidebar/SidebarShapes";
import SidebarStickers from "../components/ResultSidebar/SidebarStickers";
`;
code = code.replace("import Themes from \"../components/Themes\";", "import Themes from \"../components/Themes\";" + importsToAdd);

// 2. Remove states and handlers that moved
code = code.replace(/  const \[customStickers, setCustomStickers\] = useState\(\[\]\);\n  const \[stickerTab, setStickerTab\] = useState\("emoji"\);\n  const \[customEmojiInput, setCustomEmojiInput\] = useState\(""\);\n  const \[customUrlInput, setCustomUrlInput\] = useState\(""\);/g, '');
code = code.replace(/  const stickerInputRef = useRef\(null\);/g, '');

const uploadRegex = /\/\/ ── Stiker: Upload ──[\s\S]*?e\.target\.value = "";\n  \};/;
code = code.replace(uploadRegex, '');

// 3. Replace TAB WARNA
const tabWarnaRegex = /\{\/\* ══════════ TAB WARNA ══════════ \*\/\}\n\s*\{activeSection === "warna" && \([\s\S]*?\}\n\s*\)\}/;
code = code.replace(tabWarnaRegex, `{/* ══════════ TAB WARNA ══════════ */}
            {activeSection === "warna" && (
              <SidebarColors frameColor={frameColor} setFrameColor={setFrameColor} />
            )}`);

// 4. Replace TAB DESAIN
const tabDesainRegex = /\{\/\* ══════════ TAB DESAIN \(TEMA\) ══════════ \*\/\}\n\s*\{activeSection === "desain" && \([\s\S]*?\}\n\s*\)\}/;
code = code.replace(tabDesainRegex, `{/* ══════════ TAB DESAIN (TEMA) ══════════ */}
            {activeSection === "desain" && (
              <SidebarThemes activeTheme={activeTheme} setActiveTheme={setActiveTheme} layoutId={layoutId} setFrameColor={setFrameColor} />
            )}`);

// 5. Replace TAB MOTIF
const tabMotifRegex = /\{\/\* ══════════ TAB MOTIF \/ PATTERN ══════════ \*\/\}\n\s*\{activeSection === "motif" && \([\s\S]*?\}\n\s*\)\}/;
code = code.replace(tabMotifRegex, `{/* ══════════ TAB MOTIF / PATTERN ══════════ */}
            {activeSection === "motif" && (
              <SidebarPatterns activePattern={activePattern} setActivePattern={setActivePattern} patternOpacity={patternOpacity} setPatternOpacity={setPatternOpacity} />
            )}`);

// 6. Replace TAB BENTUK
const tabBentukRegex = /\{\/\* ══════════ TAB BENTUK ══════════ \*\/\}\n\s*\{activeSection === "bentuk" && \([\s\S]*?\}\n\s*\)\}/;
code = code.replace(tabBentukRegex, `{/* ══════════ TAB BENTUK ══════════ */}
            {activeSection === "bentuk" && (
              <SidebarShapes
                radiusAmount={radiusAmount}
                setRadiusAmount={setRadiusAmount}
                globalShape={globalShape}
                setGlobalShape={setGlobalShape}
                globalScale={globalScale}
                setGlobalScale={setGlobalScale}
                perFrameShapes={perFrameShapes}
                setPerFrameShapes={setPerFrameShapes}
                perFrameAmounts={perFrameAmounts}
                setPerFrameAmounts={setPerFrameAmounts}
                perFrameScales={perFrameScales}
                setPerFrameScales={setPerFrameScales}
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame}
                capturedImages={capturedImages}
              />
            )}`);

// 7. Replace TAB STIKER
const tabStikerRegex = /\{\/\* ══════════ TAB STIKER ══════════ \*\/\}\n\s*\{activeSection === "stiker" && \([\s\S]*?\}\n\s*\)\}/;
code = code.replace(tabStikerRegex, `{/* ══════════ TAB STIKER ══════════ */}
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
            )}`);

fs.writeFileSync('src/pages/Result.jsx', code);
console.log('Result.jsx updated with Sidebar fragments successfully!');

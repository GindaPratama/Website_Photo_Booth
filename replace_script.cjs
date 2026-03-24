const fs = require('fs');
const lines = fs.readFileSync('src/pages/Result.jsx', 'utf-8').split('\n');
const importStmt = `import {
  FILTER_CLASSES, SOLID_COLORS, PATTERN_COLORS, PATTERN_LIST, THEME_META,
  EMOJI_STICKERS, TWEMOJI_BASE, IMAGE_STICKERS, LOCAL_PROJECT_STICKERS,
  STRIP_PAD, STRIP_SIZES, GLOBAL_SHAPES, getClipPath, getStripContainerStyle, getPhotosGridStyle
} from "../utils/constants";`;
const startIdx = lines.findIndex(l => l.startsWith('const FILTER_CLASSES = {'));
const endIdx = lines.findIndex(l => l.startsWith('const Result = () => {'));
if (startIdx !== -1 && endIdx !== -1) {
    lines.splice(startIdx, endIdx - startIdx, importStmt);
    fs.writeFileSync('src/pages/Result.jsx', lines.join('\n'));
    console.log('Successfully updated Result.jsx lines ' + startIdx + ' to ' + endIdx);
} else { throw new Error('Could not find boundaries: ' + startIdx + ', ' + endIdx); }

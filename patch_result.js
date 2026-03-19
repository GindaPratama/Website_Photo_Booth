const fs = require('fs');
let code = fs.readFileSync('src/pages/Result.jsx', 'utf8');

// replace 3-vertical paths
code = code.replace(
  /"3-vertical":\s*"\/themes\/3-Vertikal\/([^"]+)"/g,
  `"3-vertical": "/themes/3-Vertikal/$1", "3-vertical-p": "/themes/3-Vertikal-P/$1"`
);

// replace w: 180 to w: 140 for 3-vertical-p
code = code.replace(
  /"3-vertical-p":\s*\{\s*w:\s*180,\s*cols:\s*1,\s*gap:\s*6\s*\}/g,
  `"3-vertical-p": { w: 140, cols: 1, gap: 6 }`
);

fs.writeFileSync('src/pages/Result.jsx', code);
console.log('Result.jsx patched successfully');

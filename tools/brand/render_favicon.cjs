// SVG sources are the editable masters; exports are deterministic.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const dir = path.resolve(__dirname, '../../docs/brand/proposals/favicon-v01');
(async () => {
 for (const size of [16,24,32,48,64,128,256]) {
  const source=path.join(dir,size===16?'steamharbor-micro-16.svg':'steamharbor-micro.svg');
  await sharp(source,{density:96}).resize(size,size).png().toFile(path.join(dir,`favicon-${size}.png`));
 }
})();

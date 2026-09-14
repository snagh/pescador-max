const { pathToFileURL } = require('url');
const fs = require('fs');

async function createCircularIcons() {
  const sharpModule = await import(pathToFileURL('C:/Users/aprom/AppData/Roaming/npm/node_modules/@zeppos/zeus-cli/node_modules/sharp/lib/index.js').href);
  const sharp = sharpModule.default;
  const source = 'C:/Users/aprom/.gemini/antigravity/brain/63a02935-cab6-4bdc-9fd4-5df9fde59ef3/.user_uploaded/media_1789390723928.jpg';

  const left = 53, top = 70, size = 916;
  const radius = size / 2;
  const circleSvg = Buffer.from(
    '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 1) + '" fill="#ffffff" /></svg>'
  );

  // 1. Crop to exact circle bounds and apply circular alpha mask
  const circularImage = sharp(source)
    .extract({ left, top, width: size, height: size })
    .composite([{ input: circleSvg, blend: 'dest-in' }]);

  const circularBuffer = await circularImage.png().toBuffer();

  // 2. Generate 240x240 for Zepp Open Platform Store
  await sharp(circularBuffer)
    .resize(240, 240)
    .png()
    .toFile('store_assets/app_icon_240.png');
  console.log('Created store_assets/app_icon_240.png (240x240)');

  // 3. Generate 512x512 and 124x124 for store
  await sharp(circularBuffer)
    .resize(512, 512)
    .png()
    .toFile('store_assets/app_icon_512.png');
  await sharp(circularBuffer)
    .resize(124, 124)
    .png()
    .toFile('store_assets/app_icon_124.png');

  // 4. Update in-app icons with transparent background
  await sharp(circularBuffer).resize(256, 256).png().toFile('assets/default.r/icon.png');
  await sharp(circularBuffer).resize(256, 256).png().toFile('assets/default.s/icon.png');
  await sharp(circularBuffer).resize(256, 256).png().toFile('assets/icon.png');
  await sharp(circularBuffer).resize(120, 120).png().toFile('assets/default.b/icon.png');

  console.log('All icons generated successfully with transparent circular background!');
}

createCircularIcons().catch(err => {
  console.error(err);
  process.exit(1);
});

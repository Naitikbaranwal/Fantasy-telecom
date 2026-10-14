/**
 * Fantasy Telecom - Generate placeholder product images as SVG
 * Run: node generate_placeholders.js
 */
const fs   = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');

const placeholders = [
  // Missing accessories
  { file: 'samsung_watch6.jpg',       emoji: '⌚', name: 'Galaxy Watch 6',   color1: '#1428A0', color2: '#0a1875' },
  { file: 'airpods_pro2.jpg',         emoji: '🎧', name: 'AirPods Pro 2',    color1: '#e8e8e8', color2: '#cccccc' },
  { file: 'samsung_buds3.jpg',        emoji: '🎧', name: 'Galaxy Buds 3 Pro',color1: '#1428A0', color2: '#0a1875' },
  { file: 'oneplus_buds_pro3.jpg',    emoji: '🎧', name: 'Buds Pro 3',       color1: '#F5010C', color2: '#b00009' },
  { file: 'case_iphone15pro.jpg',     emoji: '📱', name: 'iPhone Case',      color1: '#555555', color2: '#333333' },
  { file: 'case_samsung_s24.jpg',     emoji: '📱', name: 'S24 Case',         color1: '#1428A0', color2: '#0a1875' },
  { file: 'apple_charger_20w.jpg',    emoji: '🔌', name: '20W Charger',      color1: '#e8e8e8', color2: '#cccccc' },
  { file: 'baseus_gan65w.jpg',        emoji: '⚡', name: '65W GaN Charger',   color1: '#222222', color2: '#111111' },
  { file: 'mi_powerbank.jpg',         emoji: '🔋', name: 'Mi Power Bank',    color1: '#FF6900', color2: '#cc5300' },
  { file: 'screenguard_iphone15.jpg', emoji: '🛡️', name: 'Tempered Glass',   color1: '#4a90d9', color2: '#2a70b9' },
  { file: 'default.jpg',              emoji: '📦', name: 'Product',          color1: '#888888', color2: '#666666' },
];

placeholders.forEach(({ file, emoji, name, color1, color2 }) => {
  const filePath = path.join(imgDir, file);
  if (fs.existsSync(filePath)) return; // skip if already exists

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)" rx="20"/>
  <rect x="40" y="40" width="320" height="320" fill="rgba(255,255,255,0.08)" rx="12"/>
  <text x="200" y="190" font-size="100" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <text x="200" y="270" font-size="22" font-family="Arial, sans-serif" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">${name}</text>
  <text x="200" y="300" font-size="14" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.5)" text-anchor="middle">Fantasy Telecom</text>
</svg>`;

  // Save as .jpg filename but with SVG content — browsers render it fine via onerror fallback
  // Actually let's save a real minimal JPEG-like file; instead just save SVG with jpg extension
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log(`✅ Created placeholder: ${file}`);
});

console.log('\n🎉 All placeholders generated!');

/* ═══════════════════════════════════════════════════════
   Fantasy Telecom - database.js
   Pure JavaScript JSON file database — no native modules
   ═══════════════════════════════════════════════════════ */

const fs   = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'fantasy_telecom_db.json');

// ─── Load / Init DB ──────────────────────────────────────────────
function loadDB() {
  if (fs.existsSync(DB_FILE)) {
    try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) {}
  }
  return null;
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Seed Data ───────────────────────────────────────────────────
function createSeedData() {
  let nextId = { products: 1, contacts: 1 };

  const categories = [
    { id: 1, name: 'Smartphones',       slug: 'smartphones',  icon: '📱' },
    { id: 2, name: 'Smartwatches',      slug: 'smartwatches', icon: '⌚' },
    { id: 3, name: 'Earbuds & Earphones', slug: 'earbuds',    icon: '🎧' },
    { id: 4, name: 'Mobile Accessories', slug: 'accessories', icon: '🔌' },
    { id: 5, name: 'Cases & Covers',    slug: 'cases',        icon: '📦' },
    { id: 6, name: 'Chargers & Cables', slug: 'chargers',     icon: '🔌' },
    { id: 7, name: 'Power Banks',       slug: 'powerbanks',   icon: '🔋' },
    { id: 8, name: 'Screen Guards',     slug: 'screenguards', icon: '🛡️' },
    { id: 9, name: 'Speakers',          slug: 'speakers',     icon: '🔊' },
    { id: 10, name: 'Service & Repair', slug: 'service',      icon: '🔧' },
  ];

  const brands = [
    { id: 1,  name: 'Apple',    slug: 'apple',    logo_text: '🍎',     logo_color: '#000'    },
    { id: 2,  name: 'Samsung',  slug: 'samsung',  logo_text: 'Samsung', logo_color: '#1428A0' },
    { id: 3,  name: 'Xiaomi',   slug: 'xiaomi',   logo_text: 'Mi',      logo_color: '#FF6900' },
    { id: 4,  name: 'Realme',   slug: 'realme',   logo_text: 'realme',  logo_color: '#FFD700' },
    { id: 5,  name: 'Vivo',     slug: 'vivo',     logo_text: 'vivo',    logo_color: '#415FFF' },
    { id: 6,  name: 'OPPO',     slug: 'oppo',     logo_text: 'OPPO',    logo_color: '#1a1a1a' },
    { id: 7,  name: 'OnePlus',  slug: 'oneplus',  logo_text: '1+',      logo_color: '#F5010C' },
    { id: 8,  name: 'Motorola', slug: 'motorola', logo_text: 'moto',    logo_color: '#004A99' },
    { id: 9,  name: 'iQOO',     slug: 'iqoo',     logo_text: 'iQOO',    logo_color: '#222'    },
    { id: 10, name: 'POCO',     slug: 'poco',     logo_text: 'POCO',    logo_color: '#111'    },
  ];

  const banners = [
    { id: 1, title: 'Upgrade Your World', subtitle: 'with Latest Smartphones', description: 'Top Brands | Best Collection | Genuine Products\nVisit Our Store - Fantasy Telecom', image: 'hero_banner.jpg', cta_text: 'Explore Mobiles →', cta_link: '/mobiles.html', sort_order: 1 },
    { id: 2, title: 'Premium Accessories', subtitle: 'For Every Need', description: 'Cases, Chargers, Earbuds, Power Banks and More...', image: 'banner2_accessories.jpg', cta_text: 'Explore Accessories →', cta_link: '/accessories.html', sort_order: 2 },
  ];

  const rawProducts = [
    // Smartphones
    { brand: 'Apple', brand_id: 1, category_id: 1, name: 'iPhone 15 Pro Max', price: 159900, original_price: 169900, description: '6.7" Super Retina XDR, A17 Pro chip, 48MP camera, Titanium design', image: 'iphone15promax.jpg', rating: 4.9, reviews: 124, is_featured: true, is_on_offer: true, discount_percent: 6, stock: 15 },
    { brand: 'Apple', brand_id: 1, category_id: 1, name: 'iPhone 15', price: 79900, original_price: 84900, description: '6.1" Super Retina XDR, A16 Bionic, 48MP camera', image: 'iphone15.jpg', rating: 4.8, reviews: 89, is_featured: true, is_on_offer: false, discount_percent: 0, stock: 20 },
    { brand: 'Samsung', brand_id: 2, category_id: 1, name: 'Samsung Galaxy S24 Ultra', price: 134999, original_price: 144999, description: '6.8" QHD+ display, Snapdragon 8 Gen 3, 200MP camera, S Pen', image: 'samsung_s24_ultra.jpg', rating: 4.8, reviews: 96, is_featured: true, is_on_offer: true, discount_percent: 7, stock: 10 },
    { brand: 'Samsung', brand_id: 2, category_id: 1, name: 'Samsung Galaxy S24+', price: 99999, original_price: 109999, description: '6.7" Dynamic AMOLED, Snapdragon 8 Gen 3, 50MP camera', image: 'samsung_s24plus.jpg', rating: 4.7, reviews: 67, is_featured: false, is_on_offer: true, discount_percent: 9, stock: 12 },
    { brand: 'OnePlus', brand_id: 7, category_id: 1, name: 'OnePlus 12', price: 64999, original_price: 69999, description: '6.82" AMOLED 120Hz, Snapdragon 8 Gen 3, Hasselblad camera', image: 'oneplus12.jpg', rating: 4.7, reviews: 78, is_featured: true, is_on_offer: true, discount_percent: 7, stock: 18 },
    { brand: 'Vivo', brand_id: 5, category_id: 1, name: 'Vivo V30 Pro', price: 44999, original_price: 49999, description: '6.78" AMOLED, Dimensity 8200, 50MP Sony camera, Aura Light', image: 'vivo_v30_pro.jpg', rating: 4.5, reviews: 45, is_featured: true, is_on_offer: false, discount_percent: 0, stock: 22 },
    { brand: 'Realme', brand_id: 4, category_id: 1, name: 'Realme GT 6', price: 39999, original_price: 43999, description: '6.78" AMOLED 120Hz, Snapdragon 8s Gen 3, 50MP camera, 120W charging', image: 'realme_gt6.jpg', rating: 4.6, reviews: 52, is_featured: false, is_on_offer: true, discount_percent: 9, stock: 25 },
    { brand: 'Xiaomi', brand_id: 3, category_id: 1, name: 'Xiaomi 14', price: 69999, original_price: 74999, description: '6.36" AMOLED 120Hz, Snapdragon 8 Gen 3, Leica camera', image: 'xiaomi14.jpg', rating: 4.7, reviews: 61, is_featured: true, is_on_offer: false, discount_percent: 0, stock: 14 },
    { brand: 'OPPO', brand_id: 6, category_id: 1, name: 'OPPO Reno 12 Pro', price: 36999, original_price: 39999, description: '6.7" AMOLED, Dimensity 7300 Energy, 50MP portrait camera', image: 'oppo_reno12.jpg', rating: 4.4, reviews: 38, is_featured: false, is_on_offer: true, discount_percent: 8, stock: 30 },
    { brand: 'Motorola', brand_id: 8, category_id: 1, name: 'Motorola Edge 50 Pro', price: 31999, original_price: 34999, description: '6.7" pOLED 144Hz, Snapdragon 7s Gen 2, 50MP camera, 125W TurboPower', image: 'moto_edge50.jpg', rating: 4.5, reviews: 29, is_featured: false, is_on_offer: true, discount_percent: 9, stock: 20 },
    { brand: 'iQOO', brand_id: 9, category_id: 1, name: 'iQOO 12', price: 52999, original_price: 57999, description: '6.78" AMOLED 144Hz, Snapdragon 8 Gen 3, Zeiss camera, 120W Flash Charge', image: 'iqoo12.jpg', rating: 4.7, reviews: 44, is_featured: false, is_on_offer: true, discount_percent: 9, stock: 16 },
    { brand: 'POCO', brand_id: 10, category_id: 1, name: 'POCO X6 Pro', price: 26999, original_price: 29999, description: '6.67" AMOLED 144Hz, Dimensity 8300 Ultra, 64MP camera', image: 'poco_x6pro.jpg', rating: 4.5, reviews: 87, is_featured: false, is_on_offer: true, discount_percent: 10, stock: 35 },
    // Smartwatches
    { brand: 'Apple', brand_id: 1, category_id: 2, name: 'Apple Watch Series 9', price: 41900, original_price: 44900, description: 'S9 chip, Always-On Retina display, Blood Oxygen, ECG, Double Tap', image: 'apple_watch_s9.jpg', rating: 4.9, reviews: 56, is_featured: true, is_on_offer: true, discount_percent: 7, stock: 10 },
    { brand: 'Samsung', brand_id: 2, category_id: 2, name: 'Samsung Galaxy Watch 6', price: 27999, original_price: 31999, description: '1.3" Super AMOLED, BioActive Sensor, Sleep Coach, 40mm', image: 'samsung_watch6.jpg', rating: 4.6, reviews: 34, is_featured: true, is_on_offer: false, discount_percent: 0, stock: 15 },
    // Earbuds
    { brand: 'Apple', brand_id: 1, category_id: 3, name: 'Apple AirPods Pro 2', price: 24900, original_price: 26900, description: 'Active Noise Cancellation, Transparency mode, H2 chip, MagSafe charging', image: 'airpods_pro2.jpg', rating: 4.9, reviews: 112, is_featured: true, is_on_offer: false, discount_percent: 0, stock: 20 },
    { brand: 'Samsung', brand_id: 2, category_id: 3, name: 'Samsung Galaxy Buds 3 Pro', price: 17999, original_price: 19999, description: 'Intelligent ANC, Blade Lights, Hi-Fi audio, IPX7', image: 'samsung_buds3.jpg', rating: 4.7, reviews: 43, is_featured: true, is_on_offer: true, discount_percent: 10, stock: 25 },
    { brand: 'OnePlus', brand_id: 7, category_id: 3, name: 'OnePlus Buds Pro 3', price: 11999, original_price: 13999, description: 'Dynaudio-tuned, 50dB ANC, Spatial Audio, LHDC 5.0', image: 'oneplus_buds_pro3.jpg', rating: 4.6, reviews: 31, is_featured: false, is_on_offer: true, discount_percent: 14, stock: 30 },
    // Cases
    { brand: 'Apple', brand_id: 1, category_id: 5, name: 'iPhone 15 Pro Premium Case', price: 1499, original_price: 1999, description: 'MagSafe compatible, military-grade protection, slim design', image: 'case_iphone15pro.jpg', rating: 4.5, reviews: 67, is_featured: false, is_on_offer: true, discount_percent: 25, stock: 100 },
    { brand: 'Samsung', brand_id: 2, category_id: 5, name: 'Samsung S24 Clear Case', price: 999, original_price: 1499, description: 'Crystal clear, anti-yellowing, slim fit, precise cutouts', image: 'case_samsung_s24.jpg', rating: 4.3, reviews: 89, is_featured: false, is_on_offer: true, discount_percent: 33, stock: 100 },
    // Chargers
    { brand: 'Apple', brand_id: 1, category_id: 6, name: 'Apple 20W USB-C Charger', price: 1999, original_price: 2199, description: 'Fast charging for iPhone 15 series, compact design', image: 'apple_charger_20w.jpg', rating: 4.7, reviews: 234, is_featured: false, is_on_offer: false, discount_percent: 0, stock: 80 },
    { brand: 'Samsung', brand_id: 2, category_id: 6, name: 'Baseus 65W GaN Charger', price: 1799, original_price: 2499, description: '65W GaN technology, 3 ports (2 USB-C + 1 USB-A)', image: 'baseus_gan65w.jpg', rating: 4.8, reviews: 156, is_featured: true, is_on_offer: true, discount_percent: 28, stock: 60 },
    // Power Banks
    { brand: 'Xiaomi', brand_id: 3, category_id: 7, name: 'Mi Power Bank 3 20000mAh', price: 1999, original_price: 2499, description: '20000mAh, 22.5W fast charging, dual USB output', image: 'mi_powerbank.jpg', rating: 4.6, reviews: 445, is_featured: true, is_on_offer: true, discount_percent: 20, stock: 50 },
    // Screen Guards
    { brand: 'Apple', brand_id: 1, category_id: 8, name: 'iPhone 15 Pro Tempered Glass', price: 299, original_price: 499, description: '9H hardness, crystal clear, anti-fingerprint, easy install kit', image: 'screenguard_iphone15.jpg', rating: 4.4, reviews: 312, is_featured: false, is_on_offer: true, discount_percent: 40, stock: 200 },
  ];

  const products = rawProducts.map((p, i) => ({
    id: i + 1,
    ...p,
    created_at: new Date().toISOString(),
  }));

  nextId.products = products.length + 1;

  return { categories, brands, banners, products, contacts: [], nextId };
}

// ─── Initialize ───────────────────────────────────────────────────
let dbData = loadDB();
if (!dbData) {
  dbData = createSeedData();
  saveDB(dbData);
  console.log('✅ Database seeded successfully!');
}

// ─── Query Helpers ────────────────────────────────────────────────
const db = {
  // Categories
  getCategories() {
    return dbData.categories.map(c => ({
      ...c,
      product_count: dbData.products.filter(p => p.category_id === c.id).length
    }));
  },

  // Brands
  getBrands() {
    return dbData.brands.map(b => ({
      ...b,
      product_count: dbData.products.filter(p => p.brand_id === b.id).length
    }));
  },

  // Banners
  getBanners() {
    return [...dbData.banners].sort((a, b) => a.sort_order - b.sort_order);
  },

  // Products
  getProducts({ category, brand, search, featured, offer, limit = 50, offset = 0 } = {}) {
    let list = dbData.products.map(p => this._joinProduct(p));

    if (category)    list = list.filter(p => p.category_slug === category);
    if (brand)       list = list.filter(p => p.brand?.toLowerCase() === brand.toLowerCase() || (dbData.brands.find(b => b.id === p.brand_id)?.slug === brand));
    if (search)      list = list.filter(p => `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(search.toLowerCase()));
    if (featured === '1') list = list.filter(p => p.is_featured);
    if (offer === '1')    list = list.filter(p => p.is_on_offer);

    list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

    return { products: list.slice(Number(offset), Number(offset) + Number(limit)), total: list.length };
  },

  getProduct(id) {
    const p = dbData.products.find(p => p.id === Number(id));
    return p ? this._joinProduct(p) : null;
  },

  getOffers() {
    return dbData.products
      .filter(p => p.is_on_offer)
      .map(p => this._joinProduct(p))
      .sort((a, b) => b.discount_percent - a.discount_percent);
  },

  _joinProduct(p) {
    const cat = dbData.categories.find(c => c.id === p.category_id);
    return { ...p, category_name: cat?.name || '', category_slug: cat?.slug || '' };
  },

  addProduct(data) {
    const id = dbData.nextId.products++;
    const product = { id, ...data, created_at: new Date().toISOString() };
    dbData.products.push(product);
    saveDB(dbData);
    return product;
  },

  updateProduct(id, data) {
    const idx = dbData.products.findIndex(p => p.id === Number(id));
    if (idx === -1) return false;
    dbData.products[idx] = { ...dbData.products[idx], ...data, id: Number(id) };
    saveDB(dbData);
    return true;
  },

  deleteProduct(id) {
    const before = dbData.products.length;
    dbData.products = dbData.products.filter(p => p.id !== Number(id));
    saveDB(dbData);
    return dbData.products.length < before;
  },

  // Contacts
  getContacts() {
    return [...dbData.contacts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  addContact(data) {
    const id = dbData.nextId.contacts++;
    const contact = { id, ...data, is_read: false, created_at: new Date().toISOString() };
    dbData.contacts.push(contact);
    saveDB(dbData);
    return contact;
  },

  markContactRead(id) {
    const c = dbData.contacts.find(c => c.id === Number(id));
    if (c) { c.is_read = true; saveDB(dbData); return true; }
    return false;
  },

  // Stats
  getStats() {
    return {
      totalProducts:   dbData.products.length,
      totalBrands:     dbData.brands.length,
      featuredProducts: dbData.products.filter(p => p.is_featured).length,
      offerProducts:   dbData.products.filter(p => p.is_on_offer).length,
      totalContacts:   dbData.contacts.length,
      unreadContacts:  dbData.contacts.filter(c => !c.is_read).length,
    };
  }
};

module.exports = db;

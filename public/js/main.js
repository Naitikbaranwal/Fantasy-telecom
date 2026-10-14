/* ═══════════════════════════════════════════════════════
   Fantasy Telecom - main.js (Shared across all pages)
   ═══════════════════════════════════════════════════════ */

const API = {
  base: '/api',
  products: (params = '') => `/api/products${params}`,
  product: (id) => `/api/products/${id}`,
  categories: () => `/api/categories`,
  brands: () => `/api/brands`,
  banners: () => `/api/banners`,
  offers: () => `/api/offers`,
  contact: () => `/api/contact`,
};

// ─── Cart ─────────────────────────────────────
const Cart = {
  items: JSON.parse(localStorage.getItem('ft_cart') || '[]'),
  save() { localStorage.setItem('ft_cart', JSON.stringify(this.items)); },
  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) { existing.qty += 1; }
    else { this.items.push({ ...product, qty: 1 }); }
    this.save();
    this.updateCount();
    showToast(`${product.name} added to cart! 🛒`);
  },
  remove(id) { this.items = this.items.filter(i => i.id !== id); this.save(); this.updateCount(); },
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  updateCount() {
    const el = document.getElementById('cart-count');
    if (el) { el.textContent = this.count(); el.style.display = this.count() > 0 ? 'flex' : 'none'; }
  },
  clear() { this.items = []; this.save(); this.updateCount(); }
};

// ─── Wishlist ─────────────────────────────────────
const Wishlist = {
  items: JSON.parse(localStorage.getItem('ft_wishlist') || '[]'),
  save() { localStorage.setItem('ft_wishlist', JSON.stringify(this.items)); },
  toggle(product) {
    const idx = this.items.findIndex(i => i.id === product.id);
    if (idx > -1) { this.items.splice(idx, 1); showToast('Removed from wishlist'); }
    else { this.items.push(product); showToast(`${product.name} added to wishlist ❤️`); }
    this.save();
  },
  has(id) { return this.items.some(i => i.id === id); }
};

// ─── Toast ─────────────────────────────────────
function showToast(msg, type = 'default') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ─── Format Price ─────────────────────────────────────
function formatPrice(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

// ─── Star Rating ─────────────────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '★'.repeat(full);
  if (half) stars += '½';
  return stars;
}

// ─── Product Card HTML ─────────────────────────────────────
function productCardHTML(p) {
  const discount = p.discount_percent > 0
    ? `<span class="price-discount">-${p.discount_percent}%</span>` : '';
  const originalPrice = p.original_price && p.original_price > p.price
    ? `<span class="price-original">${formatPrice(p.original_price)}</span>` : '';
  const offerBadge = p.is_on_offer ? `<span class="badge badge-offer">SALE</span>` : '';
  const featuredBadge = p.is_featured ? `<span class="badge badge-featured">HOT</span>` : '';
  const emoji = getCategoryEmoji(p.category_name);

  return `
    <div class="product-card" data-id="${p.id}" onclick="viewProduct(${p.id})">
      <div class="product-card-image">
        <img src="/images/${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="product-card-image-placeholder" style="display:none">${emoji}</div>
        <div class="product-badges">${offerBadge}${featuredBadge}</div>
        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation();toggleWishlist(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})" title="Wishlist">❤️</button>
          <button class="product-action-btn" onclick="event.stopPropagation();quickAdd(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})" title="Quick Add">🛒</button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-brand">${p.brand || ''}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating || 4.5)}</span>
          <span class="rating-count">(${p.reviews || 0})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${originalPrice}
          ${discount}
        </div>
        <button class="add-to-cart" onclick="event.stopPropagation();quickAdd(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})">Add to Cart</button>
      </div>
    </div>`;
}

function getCategoryEmoji(cat) {
  const map = { 'smartphones': '📱', 'smartwatches': '⌚', 'earbuds': '🎧', 'accessories': '🔌', 'cases': '📦', 'chargers': '🔋', 'powerbanks': '🔋', 'screenguards': '🛡️', 'speakers': '🔊', 'service': '🔧' };
  return map[cat] || '📱';
}

function viewProduct(id) {
  window.location.href = `/product.html?id=${id}`;
}

function quickAdd(id, name, price) {
  Cart.add({ id, name, price });
}

function toggleWishlist(id, name, price) {
  Wishlist.toggle({ id, name, price });
}

// ─── Header Active Link ─────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path === href || (path === '/' && href === '/index.html') || path.includes(href.split('.')[0]))) {
      link.classList.add('active');
    }
  });
}

// ─── Mobile Menu ─────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  function open() { mobileMenu?.classList.add('open'); overlay?.classList.add('open'); }
  function close() { mobileMenu?.classList.remove('open'); overlay?.classList.remove('open'); }

  hamburger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
}

// ─── Search ─────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  function doSearch() {
    const q = input?.value.trim();
    if (q) window.location.href = `/mobiles.html?search=${encodeURIComponent(q)}`;
  }
  btn?.addEventListener('click', doSearch);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// ─── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCount();
  setActiveNav();
  initMobileMenu();
  initSearch();
});

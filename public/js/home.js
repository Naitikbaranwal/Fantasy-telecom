/* ═══════════════════════════════════════════════════════
   Fantasy Telecom - home.js
   ═══════════════════════════════════════════════════════ */

// ─── Hero Carousel ─────────────────────────────────────
(function initCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('carousel-dots');
  let current = 0;
  let timer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.carousel-dot')[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    document.querySelectorAll('.carousel-dot')[current]?.classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));

  resetTimer();
})();

// ─── Load Categories ─────────────────────────────────────
async function loadCategories() {
  try {
    const res = await fetch('/api/categories');
    const categories = await res.json();
    const grid = document.getElementById('categories-grid');
    if (!grid || !categories.length) return;
    grid.innerHTML = categories.map(c => `
      <a href="/mobiles.html?category=${c.slug}" class="category-card">
        <div class="category-icon">${c.icon || '📱'}</div>
        <div class="category-name">${c.name}</div>
      </a>`).join('');
  } catch (e) { console.log('Categories load error:', e); }
}

// ─── Load Brands ─────────────────────────────────────
async function loadBrands() {
  try {
    const res = await fetch('/api/brands');
    const brands = await res.json();
    const grid = document.getElementById('brands-grid');
    if (!grid) return;
    const brandEmojis = { apple: '🍎', samsung: '📱', xiaomi: 'Mi', realme: 'realme', vivo: 'vivo', oppo: 'OPPO', oneplus: '1+', motorola: 'M', iqoo: 'iQOO', poco: 'POCO' };
    grid.innerHTML = brands.map(b => `
      <div class="brand-card brand-${b.slug}" onclick="window.location.href='/mobiles.html?brand=${b.slug}'" title="${b.name}">
        <div class="brand-logo">
          <span class="brand-logo-text" style="color:${b.logo_color}">${b.logo_text || b.name}</span>
        </div>
        <div class="brand-name-small">${b.name}</div>
      </div>`).join('');
  } catch (e) { console.log('Brands load error:', e); }
}

// ─── Load Featured Products ─────────────────────────────────────
async function loadFeatured() {
  try {
    const res = await fetch('/api/products?featured=1&limit=10');
    const data = await res.json();
    const container = document.getElementById('featured-products');
    if (!container) return;
    if (!data.products?.length) { container.innerHTML = '<div class="empty-state"><div class="icon">📱</div><h3>No featured products</h3></div>'; return; }
    container.innerHTML = data.products.map(p => productCardHTML(p)).join('');
  } catch (e) { console.log('Featured load error:', e); }
}

// ─── Load Offer Products ─────────────────────────────────────
async function loadOffers() {
  try {
    const res = await fetch('/api/products?offer=1&limit=10');
    const data = await res.json();
    const container = document.getElementById('offer-products');
    if (!container) return;
    if (!data.products?.length) { container.innerHTML = '<div class="empty-state"><div class="icon">🏷️</div><h3>No offers right now</h3></div>'; return; }
    container.innerHTML = data.products.map(p => productCardHTML(p)).join('');
  } catch (e) { console.log('Offers load error:', e); }
}

// ─── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadBrands();
  loadFeatured();
  loadOffers();
});

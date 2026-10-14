/* ═══════════════════════════════════════════════════════
   Fantasy Telecom - products.js (Products page logic)
   ═══════════════════════════════════════════════════════ */

let currentPage = 0;
const PER_PAGE = 12;

async function initProductsPage(defaultCategory = '') {
  // Load brands for sidebar filters
  loadBrandFilters();

  // Read URL params
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get('category') || '';
  const urlBrand = params.get('brand') || '';
  const urlSearch = params.get('search') || '';

  // Apply URL params to UI
  if (urlSearch) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = urlSearch;
  }

  await loadProducts({ category: urlCategory || defaultCategory, brand: urlBrand, search: urlSearch });
}

async function loadBrandFilters() {
  try {
    const res = await fetch('/api/brands');
    const brands = await res.json();
    const container = document.getElementById('brand-filters');
    if (!container) return;
    container.innerHTML = `<label class="filter-option"><input type="radio" name="brand" value="" checked> All Brands</label>` +
      brands.map(b => `<label class="filter-option"><input type="radio" name="brand" value="${b.slug}"> ${b.name}</label>`).join('');
  } catch (e) {}
}

async function loadProducts({ category = '', brand = '', search = '', offer = '', featured = '' } = {}) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  if (!grid) return;
  grid.innerHTML = '<div class="spinner" style="grid-column:1/-1"></div>';

  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (brand) params.set('brand', brand);
    if (search) params.set('search', search);
    if (offer) params.set('offer', offer);
    if (featured) params.set('featured', featured);
    params.set('limit', 50);

    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    let products = data.products || [];

    // Client-side sort
    const sort = document.getElementById('sort-select')?.value || 'default';
    if (sort === 'price-asc') products.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') products.sort((a,b) => b.price - a.price);
    else if (sort === 'rating') products.sort((a,b) => (b.rating||0) - (a.rating||0));

    // Price filter
    const minP = parseInt(document.getElementById('price-min')?.value) || 0;
    const maxP = parseInt(document.getElementById('price-max')?.value) || Infinity;
    if (minP || maxP < Infinity) products = products.filter(p => p.price >= minP && p.price <= maxP);

    if (countEl) countEl.textContent = products.length;

    if (!products.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><h3>No products found</h3><p>Try adjusting your filters</p></div>';
      return;
    }

    grid.innerHTML = products.map(p => productCardHTML(p)).join('');
  } catch (e) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">⚠️</div><h3>Failed to load products</h3><p>Make sure the server is running at port 3000</p></div>';
  }
}

function applyFilters() {
  const brandEl = document.querySelector('input[name="brand"]:checked');
  const brand = brandEl?.value || '';
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'smartphones';
  const search = document.getElementById('search-input')?.value || '';
  loadProducts({ category, brand, search });
}

function clearFilters() {
  document.querySelectorAll('input[name="brand"]')[0]?.click();
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  if (priceMin) priceMin.value = '';
  if (priceMax) priceMax.value = '';
  const offerCb = document.getElementById('filter-offer');
  const featuredCb = document.getElementById('filter-featured');
  if (offerCb) offerCb.checked = false;
  if (featuredCb) featuredCb.checked = false;
  applyFilters();
}

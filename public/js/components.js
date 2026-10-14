/* ═══════════════════════════════════════════════════════
   Fantasy Telecom - components.js (Shared HTML Components)
   ═══════════════════════════════════════════════════════ */

function getHeaderHTML() {
  return `
  <!-- Top Bar -->
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <div class="top-bar-item">
          <span>📍</span>
          <span>Loniyamau Babuganj Antu, Pratapgarh 203501</span>
        </div>
        <div class="top-bar-item">
          <span>📞</span>
          <a href="tel:9140447744">9140447744</a>,
          <a href="tel:9140093700">9140093700</a>
        </div>
      </div>
      <div class="top-bar-right">
        <div class="top-bar-time">
          <span>🕐</span>
          <span>Open: 9:00 AM – 9:00 PM</span>
        </div>
        <div class="social-links">
          <a href="https://wa.me/919140447744" target="_blank" title="WhatsApp">
            <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="#" target="_blank" title="Instagram">📸</a>
          <a href="#" target="_blank" title="Facebook">👍</a>
          <a href="#" target="_blank" title="YouTube">▶️</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Header -->
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <!-- Logo -->
        <a href="/index.html" class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24"><path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5-5H7V4h10v11z"/></svg>
          </div>
          <div class="logo-text">
            <span class="logo-name">FANTASY<span> TELECOM</span></span>
            <span class="logo-tagline">Smart Phones | Accessories | Service | Your Trusted Store</span>
          </div>
        </a>

        <!-- Nav -->
        <nav class="nav">
          <ul class="nav-list">
            <li><a href="/index.html" class="nav-link">Home</a></li>
            <li><a href="/mobiles.html" class="nav-link">Mobiles</a></li>
            <li><a href="/accessories.html" class="nav-link">Accessories</a></li>
            <li><a href="/brands.html" class="nav-link">Brands</a></li>
            <li><a href="/offers.html" class="nav-link">Offers</a></li>
            <li><a href="/about.html" class="nav-link">About Us</a></li>
            <li><a href="/contact.html" class="nav-link">Contact Us</a></li>
          </ul>
        </nav>

        <!-- Search -->
        <div class="header-search">
          <input type="text" id="search-input" class="search-input" placeholder="Search for mobiles, accessories...">
          <button class="search-btn" id="search-btn">🔍</button>
        </div>

        <!-- Actions -->
        <div class="header-actions">
          <button class="header-icon-btn" onclick="window.location.href='/cart.html'" title="Cart">
            🛒
            <span class="cart-count" id="cart-count" style="display:none">0</span>
          </button>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div class="mobile-overlay" id="mobile-overlay"></div>
  <div class="mobile-menu" id="mobile-menu">
    <div class="mobile-menu-header">
      <span class="logo-name" style="font-size:1.1rem">FANTASY<span style="color:var(--primary)"> TELECOM</span></span>
      <button class="mobile-menu-close" id="mobile-menu-close">✕</button>
    </div>
    <a href="/index.html" class="mobile-nav-link">🏠 Home</a>
    <a href="/mobiles.html" class="mobile-nav-link">📱 Mobiles</a>
    <a href="/accessories.html" class="mobile-nav-link">🔌 Accessories</a>
    <a href="/brands.html" class="mobile-nav-link">🏷️ Brands</a>
    <a href="/offers.html" class="mobile-nav-link">🏷️ Offers</a>
    <a href="/about.html" class="mobile-nav-link">ℹ️ About Us</a>
    <a href="/contact.html" class="mobile-nav-link">📞 Contact Us</a>
    <a href="/admin.html" class="mobile-nav-link">⚙️ Admin Panel</a>
  </div>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/index.html" class="logo" style="margin-bottom:16px">
              <div class="logo-icon" style="width:40px;height:40px">
                <svg viewBox="0 0 24 24" style="width:22px;height:22px"><path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5-5H7V4h10v11z" fill="white"/></svg>
              </div>
              <div class="logo-text">
                <span class="logo-name" style="font-size:1rem;color:white">FANTASY<span style="color:var(--primary)"> TELECOM</span></span>
                <span class="logo-tagline">Smart Phones | Accessories | Service</span>
              </div>
            </a>
            <p>Fantasy Telecom is your trusted mobile shop in Loniyamau Babuganj Antu, Pratapgarh. We provide a wide range of smartphones, accessories and genuine products from top brands.</p>
          </div>

          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <div class="footer-links">
              <a href="/index.html" class="footer-link">Home</a>
              <a href="/mobiles.html" class="footer-link">Mobiles</a>
              <a href="/accessories.html" class="footer-link">Accessories</a>
              <a href="/brands.html" class="footer-link">Brands</a>
              <a href="/offers.html" class="footer-link">About Us</a>
              <a href="/contact.html" class="footer-link">Contact Us</a>
              <a href="/about.html" class="footer-link">Privacy Policy</a>
              <a href="/about.html" class="footer-link">Terms & Conditions</a>
            </div>
          </div>

          <div>
            <h4 class="footer-heading">Follow Us</h4>
            <div class="footer-social">
              <a href="https://wa.me/919140447744" class="footer-whatsapp" target="_blank" title="WhatsApp">💬</a>
              <a href="#" class="footer-instagram" target="_blank" title="Instagram">📸</a>
              <a href="#" class="footer-facebook" target="_blank" title="Facebook">👍</a>
              <a href="#" class="footer-youtube" target="_blank" title="YouTube">▶️</a>
            </div>
            <h4 class="footer-heading" style="margin-top:20px">Admin</h4>
            <a href="/admin.html" class="footer-link">⚙️ Admin Panel</a>
          </div>

          <div>
            <h4 class="footer-heading">Contact Info</h4>
            <div class="footer-contact-list">
              <div class="footer-contact-item">
                <span class="icon">📍</span>
                <span>Loniyamau Babuganj Antu, Pratapgarh 203501</span>
              </div>
              <div class="footer-contact-item">
                <span class="icon">📞</span>
                <div>
                  <a href="tel:9140447744" style="color:var(--gray-300)">9140447744</a><br>
                  <a href="tel:9140093700" style="color:var(--gray-300)">9140093700</a>
                </div>
              </div>
              <div class="footer-contact-item">
                <span class="icon">🕐</span>
                <span>9:00 AM – 9:00 PM (All Days)</span>
              </div>
              <div class="footer-contact-item">
                <span class="icon">✉️</span>
                <a href="mailto:fantasytelecom203501@gmail.com" style="color:var(--gray-300)">fantasytelecom203501@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 Fantasy Telecom. All Rights Reserved. | Designed with ❤️ for our valued customers</p>
      </div>
    </div>
  </footer>`;
}

// Inject header and footer
document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (headerEl) headerEl.innerHTML = getHeaderHTML();
  if (footerEl) footerEl.innerHTML = getFooterHTML();
});

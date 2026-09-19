/* ============================================
   VEDICFUELOON — MAIN APP ROUTER
   Hash-based SPA routing, initialization
   ============================================ */

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Cart, AdminAuth, seedDemoData } from './store.js';
import { PRODUCTS, getProductById } from './data.js';
import { renderNavbar, renderFooter, showToast, updateCartBadge, initScrollReveal, setActiveNav, ICONS } from './components.js';

// Page imports
import { renderHomePage, initHomeHandlers } from './pages/home.js';
import { renderShopPage, initShopHandlers } from './pages/shop.js';
import { renderProductPage, initProductHandlers } from './pages/product.js';
import { renderCartPage, initCartHandlers } from './pages/cart.js';
import { renderCheckoutPage, initCheckoutHandlers } from './pages/checkout.js';
import { renderAboutPage } from './pages/about.js';
import { renderContactPage, initContactHandlers } from './pages/contact.js';

// Admin imports
import { renderAdminLogin, initAuthHandlers } from './admin/auth.js';
import { renderAdminDashboard } from './admin/dashboard.js';
import { renderAdminProducts, initAdminProductHandlers } from './admin/products.js';
import { renderAdminOrders, initAdminOrderHandlers } from './admin/orders.js';
import { renderAdminCustomers, initAdminCustomerHandlers } from './admin/customers.js';

// ── App State ──
const app = document.getElementById('app');

// ── Parse Hash Route ──
function parseRoute(hash) {
  const cleanHash = hash.replace('#', '') || '/';
  const [path, queryString] = cleanHash.split('?');
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    });
  }
  return { path, params };
}

// ── Route Handler ──
function handleRoute() {
  const { path, params } = parseRoute(location.hash);
  
  // Admin Routes
  if (path.startsWith('/admin')) {
    handleAdminRoute(path, params);
    return;
  }

  // Customer Routes — render with navbar + footer
  let pageContent = '';
  let activePage = '';

  switch (true) {
    case path === '/' || path === '':
      pageContent = renderHomePage();
      activePage = 'home';
      break;
    case path === '/shop' || path === '/products' || path === '/kanji' || path === '/menu':
      pageContent = renderShopPage(params);
      activePage = 'shop';
      break;
    case path.startsWith('/product/'):
      const productId = path.split('/')[2];
      pageContent = renderProductPage(productId);
      activePage = 'shop';
      break;
    case path === '/cart':
      pageContent = renderCartPage();
      activePage = 'cart';
      break;
    case path === '/checkout':
      pageContent = renderCheckoutPage();
      activePage = 'checkout';
      break;
    case path === '/about':
      pageContent = renderAboutPage();
      activePage = 'about';
      break;
    case path === '/contact':
      pageContent = renderContactPage();
      activePage = 'contact';
      break;
    default:
      pageContent = `
        <section class="section">
          <div class="container">
            <div class="empty-state">
              <div class="empty-icon" style="color: var(--neutral-400);">${ICONS.search}</div>
              <h3>Page Not Found</h3>
              <p>The page you're looking for doesn't exist.</p>
              <a href="#/" class="btn btn-primary btn-ripple">Go Home</a>
            </div>
          </div>
        </section>
      `;
  }

  app.innerHTML = `
    ${renderNavbar()}
    <main id="pageContent" class="page-enter">
      ${pageContent}
    </main>
    ${renderFooter()}
  `;

  // Post-render setup
  setActiveNav(activePage);
  initScrollReveal();
  setupMobileMenu();
  setupProductCardClicks();
  
  // Ensure animated logo is ready
  const navVideo = document.getElementById('navbarLogoVideo');
  if (navVideo && typeof navVideo.play === 'function' && navVideo.paused) {
    navVideo.play().catch(() => {});
  }
  
  // Initialize home handlers / slideshow
  if (activePage === 'home') {
    initHomeHandlers();
  } else {
    if (window._heroVideoInterval) {
      clearInterval(window._heroVideoInterval);
      window._heroVideoInterval = null;
    }
    if (window._heroSliderInterval) {
      clearInterval(window._heroSliderInterval);
      window._heroSliderInterval = null;
    }
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ── Admin Route Handler ──
function handleAdminRoute(path, params) {
  // Login page
  if (path === '/admin' || path === '/admin/login') {
    if (AdminAuth.isLoggedIn()) {
      location.hash = '#/admin/dashboard';
      return;
    }
    app.innerHTML = renderAdminLogin();
    return;
  }

  // Auth check for other admin pages
  if (!AdminAuth.isLoggedIn()) {
    location.hash = '#/admin/login';
    return;
  }

  // Admin page content
  let adminContent = '';
  let activeSection = '';

  switch (path) {
    case '/admin/dashboard':
      adminContent = renderAdminDashboard();
      activeSection = 'dashboard';
      break;
    case '/admin/products':
      adminContent = renderAdminProducts();
      activeSection = 'products';
      break;
    case '/admin/orders':
      adminContent = renderAdminOrders();
      activeSection = 'orders';
      break;
    case '/admin/customers':
      adminContent = renderAdminCustomers();
      activeSection = 'customers';
      break;
    default:
      location.hash = '#/admin/dashboard';
      return;
  }

  app.innerHTML = `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <img src="./vedicfueloon logo.jpeg" alt="VedicFueloon" />
          <div>
            <div class="admin-brand-text">Vedic<span>Fueloon</span></div>
            <span class="admin-brand-sub">Admin Panel</span>
          </div>
        </div>
        
        <nav class="admin-nav">
          <button class="admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}" onclick="window.adminNavigate('dashboard')">
            <span class="nav-icon">${ICONS.barChart}</span> Dashboard
          </button>
          <button class="admin-nav-item ${activeSection === 'products' ? 'active' : ''}" onclick="window.adminNavigate('products')">
            <span class="nav-icon">${ICONS.bowl}</span> Products
          </button>
          <button class="admin-nav-item ${activeSection === 'orders' ? 'active' : ''}" onclick="window.adminNavigate('orders')">
            <span class="nav-icon">${ICONS.package}</span> Orders
          </button>
          <button class="admin-nav-item ${activeSection === 'customers' ? 'active' : ''}" onclick="window.adminNavigate('customers')">
            <span class="nav-icon">${ICONS.users}</span> Customers
          </button>
          
          <div class="admin-nav-divider"></div>
          
          <a class="admin-nav-item" href="#/" style="text-decoration:none;">
            <span class="nav-icon">${ICONS.home}</span> View Store
          </a>
        </nav>
        
        <button class="admin-logout" onclick="window.adminLogout()">
          <span class="nav-icon">${ICONS.logOut}</span> Logout
        </button>
      </aside>
      
      <main class="admin-main page-enter">
        ${adminContent}
      </main>
    </div>
  `;
}

// ── Admin Navigation Helper ──
window.adminNavigate = function(section) {
  location.hash = `#/admin/${section}`;
};

// ── Admin Logout ──
window.adminLogout = function() {
  AdminAuth.logout();
  location.hash = '#/admin/login';
  showToast('Logged Out', 'See you soon!', 'success');
};

// ── Navigation Helper (for re-renders) ──
window.navigateTo = function(hash) {
  // Force re-render even if same hash
  handleRoute();
};

// ── Global Add to Cart ──
window.addToCart = function(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;
  Cart.add(product, qty);
  updateCartBadge();
  showToast('Added to Cart!', `${product.name} × ${qty}`, 'success');
};

// ── Global Toast ──
window.showToastGlobal = showToast;

// ── Global Scroll Reveal Init ──
window.initReveal = initScrollReveal;

// ── Mobile Menu Toggle ──
function setupMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    const closeMenu = () => {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('mobile-open');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navLinks.classList.toggle('mobile-open', isOpen);
    });

    // Close mobile menu on clicking any navigation link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#navbar') && navLinks.classList.contains('mobile-open')) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        closeMenu();
      }
    });

    // Close on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('mobile-open')) {
        closeMenu();
      }
    });
  }
}

// ── Product Card Click → Detail Page ──
function setupProductCardClicks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't navigate if clicking add button or wishlist
      if (e.target.closest('.card-add-btn') || e.target.closest('.card-wishlist')) return;
      const id = card.dataset.productId;
      if (id) location.hash = `#/product/${id}`;
    });
  });
}

// ── Cart Update Listener ──
window.addEventListener('cart-updated', () => {
  updateCartBadge();
});

// ── Double Click Website Name (Top-Left) → Open Admin Panel ──
document.addEventListener('dblclick', (e) => {
  const brand = e.target.closest('#mainNavBrand, .navbar-brand, .brand-name, .brand-info');
  if (brand) {
    e.preventDefault();
    e.stopPropagation();
    location.hash = '#/admin';
    showToast('Admin Portal', 'Opening Admin Panel...', 'info');
  }
});

// ── Glassmorphism Navbar Scroll State ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
}, { passive: true });

// ── Initialize App ──
function init() {
  // Seed demo data for admin
  seedDemoData();
  
  // Init all handlers
  initShopHandlers();
  initProductHandlers();
  initCartHandlers();
  initCheckoutHandlers();
  initContactHandlers();
  initAuthHandlers();
  initAdminProductHandlers();
  initAdminOrderHandlers();
  initAdminCustomerHandlers();

  // Listen for route changes
  window.addEventListener('hashchange', handleRoute);

  // Initial route
  handleRoute();
}

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

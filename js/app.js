/* ============================================
   VEDICFUELOON — MAIN APP ROUTER
   Hash-based SPA routing, initialization
   ============================================ */

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Cart, AdminAuth, seedDemoData } from './store.js';
import { PRODUCTS, getProductById } from './data.js';
import { renderNavbar, renderFooter, showToast, updateCartBadge, initScrollReveal, setActiveNav, ICONS } from './components.js';
import { safeDecodeURI } from './security.js';

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
import { renderAdminEBilling, initAdminEBillingHandlers } from './admin/ebilling.js';

// ── App State ──
const app = document.getElementById('app');

// ── Parse Hash Route (Hardened against malformed URI crashes) ──
function parseRoute(hash) {
  const cleanHash = (hash || '').replace('#', '') || '/';
  const [path, queryString] = cleanHash.split('?');
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[key] = safeDecodeURI(value || '');
      }
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
    case '/admin/ebilling':
      adminContent = renderAdminEBilling();
      activeSection = 'ebilling';
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
    <div class="admin-layout" id="adminLayout">
      <!-- Mobile Admin Top Bar (Visible only on < 768px screens) -->
      <header class="admin-mobile-header" id="adminMobileHeader">
        <div class="admin-mobile-header-left">
          <button class="admin-mobile-toggle-btn" id="adminMobileMenuToggle" aria-label="Open Admin Menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div class="admin-mobile-brand">
            <img src="./vedicfueloon logo.jpeg" alt="VedicFueloon" class="admin-mobile-logo" />
            <div class="admin-mobile-title">
              <span>VedicFueloon</span>
              <span class="admin-mobile-badge">Admin</span>
            </div>
          </div>
        </div>
        <div class="admin-mobile-header-right">
          <a href="#/" class="admin-mobile-store-link" title="View Store">
            ${ICONS.home}
            <span class="d-none d-sm-inline">Store</span>
          </a>
          <div class="admin-avatar-sm" title="Master Admin">VF</div>
        </div>
      </header>

      <!-- Backdrop overlay for mobile drawer -->
      <div class="admin-backdrop" id="adminMobileBackdrop"></div>

      <!-- Admin Sidebar (Offcanvas on Mobile, Sticky Column on Desktop) -->
      <aside class="admin-sidebar" id="adminSidebar">
        <div class="admin-sidebar-header">
          <div class="admin-brand">
            <img src="./vedicfueloon logo.jpeg" alt="VedicFueloon" />
            <div>
              <div class="admin-brand-text">Vedic<span>Fueloon</span></div>
              <span class="admin-brand-sub">Admin Panel</span>
            </div>
          </div>
          <button class="admin-sidebar-close-btn d-md-none" id="adminSidebarCloseBtn" aria-label="Close Admin Menu">
            ${ICONS.x}
          </button>
        </div>
        
        <nav class="admin-nav">
          <button class="admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}" onclick="window.adminNavigate('dashboard')">
            <span class="nav-icon">${ICONS.barChart}</span> <span>Dashboard</span>
          </button>
          <button class="admin-nav-item ${activeSection === 'ebilling' ? 'active' : ''}" onclick="window.adminNavigate('ebilling')">
            <span class="nav-icon">${ICONS.receipt}</span> <span>E-Billing Hub</span>
          </button>
          <button class="admin-nav-item ${activeSection === 'orders' ? 'active' : ''}" onclick="window.adminNavigate('orders')">
            <span class="nav-icon">${ICONS.package}</span> <span>Orders</span>
          </button>
          <button class="admin-nav-item ${activeSection === 'products' ? 'active' : ''}" onclick="window.adminNavigate('products')">
            <span class="nav-icon">${ICONS.bowl}</span> <span>Products & Stock</span>
          </button>
          <button class="admin-nav-item ${activeSection === 'customers' ? 'active' : ''}" onclick="window.adminNavigate('customers')">
            <span class="nav-icon">${ICONS.users}</span> <span>Customers</span>
          </button>
          
          <div class="admin-nav-divider"></div>
          
          <a class="admin-nav-item" href="#/" style="text-decoration:none;">
            <span class="nav-icon">${ICONS.home}</span> <span>View Store</span>
          </a>
        </nav>
        
        <button class="admin-logout" onclick="window.adminLogout()">
          <span class="nav-icon">${ICONS.logOut}</span> <span>Logout</span>
        </button>
      </aside>
      
      <main class="admin-main">
        ${adminContent}
      </main>
    </div>
  `;

  // Setup mobile drawer interactivity
  setupAdminMobileDrawer();

  // Attach dynamic handlers for rendered section
  if (activeSection === 'products') {
    initAdminProductHandlers();
  } else if (activeSection === 'orders') {
    initAdminOrderHandlers();
  } else if (activeSection === 'customers') {
    initAdminCustomerHandlers();
  } else if (activeSection === 'ebilling') {
    initAdminEBillingHandlers();
  }
}

// ── Setup Admin Mobile Drawer ──
function setupAdminMobileDrawer() {
  const toggleBtn = document.getElementById('adminMobileMenuToggle');
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminMobileBackdrop');
  const closeBtn = document.getElementById('adminSidebarCloseBtn');

  if (!toggleBtn || !sidebar || !backdrop) return;

  const openDrawer = () => {
    sidebar.classList.add('mobile-open');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    sidebar.classList.remove('mobile-open');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('mobile-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  backdrop.addEventListener('click', closeDrawer);

  // Close drawer when any nav link inside sidebar is clicked
  sidebar.querySelectorAll('.admin-nav-item, .admin-logout').forEach(item => {
    item.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      closeDrawer();
    }
  };
  document.removeEventListener('keydown', handleEscape);
  document.addEventListener('keydown', handleEscape);

  // Auto-close on resize to desktop
  const handleResize = () => {
    if (window.innerWidth >= 768 && sidebar.classList.contains('mobile-open')) {
      closeDrawer();
    }
  };
  window.removeEventListener('resize', handleResize);
  window.addEventListener('resize', handleResize);
}

// ── Admin Navigation Helper ──
window.adminNavigate = function(section) {
  const target = `#/admin/${section}`;
  if (location.hash === target) {
    handleRoute();
  } else {
    location.hash = target;
  }
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

// ── Clear All Data (Empty Tables for Future Ingestion) ──
window.clearAllStoreData = function() {
  if (confirm('Are you sure you want to empty all orders, customers, and transactions? All tables will be set to 0 rows, ready for future data.')) {
    Orders.clear();
    Customers.clear();
    Cart.clear();
    showToast('Database Tables Reset', 'All orders & customers cleared. 0 rows ready for future live data.', 'info');
    handleRoute();
  }
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

// ── Close Modals on Escape Key ──
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});

// ── Initialize App ──
function init() {
  // Demo seeding disabled: tables start clean and empty for future live data
  
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
  initAdminEBillingHandlers();

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

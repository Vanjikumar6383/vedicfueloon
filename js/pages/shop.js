/* ============================================
   VEDICFUELOON — SHOP / MENU PAGE
   Product Grid, Category Tabs, Sidebar Filters
   ============================================ */

import { PRODUCTS, CATEGORIES, getProductsByCategory, searchProducts } from '../data.js';
import { renderProductCard, ICONS } from '../components.js';

export function renderShopPage(params = {}) {
  const activeCategory = params.category || 'all';
  const products = getProductsByCategory(activeCategory);

  const allCategories = [
    { id: 'all', name: 'All Items', tamilName: 'அனைத்தும்', count: PRODUCTS.length },
    ...Object.values(CATEGORIES).map(c => ({ ...c, count: getProductsByCategory(c.id).length }))
  ];

  // Map category icons without emojis
  const catIcons = {
    'all': ICONS.list,
    'kanji': ICONS.bowl,
    'daily-spl': ICONS.sparkle,
    'solid-eats': ICONS.salad,
    'traditional-sweets': ICONS.pot
  };

  return `
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <!-- Page Header -->
        <div class="section-header reveal">
          <span class="section-badge">${ICONS.bowl} OUR TRADITIONAL MENU</span>
          <h1 class="display-heading" style="font-size: var(--text-4xl);">
            Traditional Kanji<br/>& Health Foods
          </h1>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">
            எங்கள் பாரம்பரிய கஞ்சி மற்றும் சிறப்பு உணவு வகைகள்
          </p>
        </div>

        <!-- Mobile Filter Bar using Bootstrap Collapse -->
        <div class="d-md-none mb-3">
          <button class="btn btn-outline-gold w-100 d-flex align-items-center justify-content-between py-2 px-3" 
                  type="button" data-bs-toggle="collapse" data-bs-target="#shopSidebarCollapse" 
                  aria-expanded="false" aria-controls="shopSidebarCollapse" id="mobileFilterToggleBtn">
            <span class="d-inline-flex align-items-center gap-2 font-weight-bold">
              ${ICONS.sparkle} Filter, Search & Sort
            </span>
            <span class="badge" style="background: var(--gold-500); color: var(--primary-900); font-size: 11px;">Filter ▾</span>
          </button>
        </div>

        <div class="shop-layout">
          <!-- Sidebar (Collapsible on Mobile via Bootstrap, Fixed Sticky on Desktop) -->
          <div class="collapse d-md-block" id="shopSidebarCollapse">
            <aside class="shop-sidebar reveal">
              <div class="sidebar-section">
                <h4>Categories</h4>
                ${allCategories.map(cat => `
                  <div class="sidebar-item ${cat.id === activeCategory ? 'active' : ''}" 
                       onclick="location.hash='#/shop${cat.id !== 'all' ? '?category=' + cat.id : ''}'">
                    <span>${catIcons[cat.id] || ICONS.list}</span>
                    <span>${cat.name}</span>
                    <span class="item-count">${cat.count}</span>
                  </div>
                `).join('')}
              </div>
              
              <div class="sidebar-section">
                <h4>Sort By</h4>
                <select class="form-select" id="sortSelect" onchange="window.shopSort(this.value)">
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <div class="sidebar-section">
                <h4>Search</h4>
                <input type="text" class="form-input" placeholder="Search kanji..." 
                       id="shopSearch" oninput="window.shopSearch(this.value)" />
              </div>
              
              <div class="sidebar-section" style="border-bottom:none;">
                <h4>Price Range</h4>
                <div style="display:flex; gap:var(--space-2); align-items:center;">
                  <span style="font-size:var(--text-sm); color:var(--neutral-500);">₹29</span>
                  <input type="range" min="29" max="199" value="199" 
                         style="flex:1; accent-color: var(--gold-600);"
                         id="priceRange" oninput="window.shopPriceFilter(this.value)" />
                  <span style="font-size:var(--text-sm); color:var(--neutral-500);" id="priceRangeVal">₹199</span>
                </div>
              </div>
            </aside>
          </div>

          <!-- Products Grid -->
          <div>
            <!-- Category Tabs (mobile-friendly) -->
            <div class="tabs reveal" style="margin-bottom: var(--space-6);">
              ${allCategories.map(cat => `
                <button class="tab-btn ${cat.id === activeCategory ? 'active' : ''}"
                        onclick="location.hash='#/shop${cat.id !== 'all' ? '?category=' + cat.id : ''}'">
                  ${cat.name}
                </button>
              `).join('')}
            </div>

            <div class="reveal" style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
              <p style="color:var(--neutral-500); font-size:var(--text-sm);">
                Showing <strong id="productCount">${products.length}</strong> products
              </p>
            </div>

            <div class="grid-products reveal-stagger" id="productsGrid">
              ${products.map(p => renderProductCard(p)).join('')}
            </div>

            <div id="noResults" class="empty-state hidden">
              <div class="empty-icon" style="color: var(--neutral-400);">${ICONS.search}</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button class="btn btn-primary btn-ripple" onclick="location.hash='#/shop'">View All Products</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Shop interaction handlers (attached to window in app.js)
export function initShopHandlers() {
  window.shopSort = function(sortBy) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const cards = [...grid.querySelectorAll('.product-card')];
    const getPrice = (card) => {
      const text = card.querySelector('.card-price').textContent;
      return parseInt(text.replace(/[^\d]/g, ''));
    };
    const getRating = (card) => {
      const text = card.querySelector('.card-rating strong')?.textContent || '0';
      return parseFloat(text);
    };
    const getName = (card) => {
      return card.querySelector('.card-title')?.textContent || '';
    };
    
    cards.sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return getPrice(a) - getPrice(b);
        case 'price-high': return getPrice(b) - getPrice(a);
        case 'rating': return getRating(b) - getRating(a);
        case 'name': return getName(a).localeCompare(getName(b));
        default: return 0;
      }
    });
    
    cards.forEach(card => grid.appendChild(card));
  };

  window.shopSearch = function(query) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const countEl = document.getElementById('productCount');
    if (!grid) return;
    
    const q = query.toLowerCase();
    let visible = 0;
    
    grid.querySelectorAll('.product-card').forEach(card => {
      const name = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const tamil = card.querySelector('.card-tamil-name')?.textContent || '';
      const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
      const match = !q || name.includes(q) || tamil.includes(q) || desc.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    
    if (countEl) countEl.textContent = visible;
    if (noResults) noResults.classList.toggle('hidden', visible > 0);
  };

  window.shopPriceFilter = function(maxPrice) {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCount');
    const rangeVal = document.getElementById('priceRangeVal');
    if (!grid) return;
    
    if (rangeVal) rangeVal.textContent = `₹${maxPrice}`;
    
    let visible = 0;
    grid.querySelectorAll('.product-card').forEach(card => {
      const price = parseInt(card.querySelector('.card-price').textContent.replace(/[^\d]/g, ''));
      const show = price <= parseInt(maxPrice);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    
    if (countEl) countEl.textContent = visible;
  };
}

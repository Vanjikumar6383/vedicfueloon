/* ============================================
   VEDICFUELOON — PRODUCT DETAIL PAGE
   ============================================ */

import { getProductById, PRODUCTS, getProductColor } from '../data.js';
import { renderStars, renderProductCard, ICONS } from '../components.js';

export function renderProductPage(productId) {
  const product = getProductById(productId);
  if (!product) {
    return `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${ICONS.search}</div>
            <h3>Product Not Found</h3>
            <p>The product you're looking for doesn't exist.</p>
            <a href="#/shop" class="btn btn-primary btn-ripple">Browse Menu</a>
          </div>
        </div>
      </section>
    `;
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  // All 20 available kanji varieties
  const allKanjies = PRODUCTS.filter(p => p.category === 'kanji' || p.category === 'daily-spl');
  const bgColor = getProductColor(product.id);

  return `
    <section class="section product-detail-page">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="product-breadcrumb reveal">
          <a href="#/">Home</a> <span>›</span>
          <a href="#/shop">Menu</a> <span>›</span>
          <span style="color:var(--neutral-900); font-weight:500;">${product.name}</span>
        </div>

        <!-- Product Detail -->
        <div class="product-detail reveal">
          <div class="product-image-main" style="background: ${bgColor};">
            ${product.image 
              ? `<img src="${product.image}" alt="${product.name}" />`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gold-400);opacity:0.5;">${ICONS.bowl}</div>`
            }
          </div>

          <div class="product-info">
            <div class="product-category-label">${product.category.replace('-', ' ').toUpperCase()}</div>
            <h1 class="product-title">${product.name}</h1>
            <p class="product-tamil-name tamil-text">${product.tamilName}</p>
            
            <div class="product-rating">
              <span class="star-rating">${renderStars(product.rating)}</span>
              <strong>${product.rating}</strong>
              <span style="color:var(--neutral-400);">(${product.reviews} reviews)</span>
              ${product.badge ? `<span class="badge badge-${product.badge}" style="margin-left:var(--space-2);">${
                product.badge === 'bestseller' ? 'Best Seller' :
                product.badge === 'new' ? 'New' :
                product.badge === 'daily' ? 'Daily Special' : ''
              }</span>` : ''}
            </div>

            <div class="product-price-block">
              <span class="product-current-price">₹${product.price}</span>
              ${product.originalPrice > product.price ? `
                <span class="product-original-price">₹${product.originalPrice}</span>
                <span class="product-discount">${discount}% OFF</span>
              ` : ''}
            </div>

            <p class="product-desc">${product.description}</p>

            <div style="display:flex; align-items:center; gap:var(--space-2); margin-bottom:var(--space-4);">
              <span class="badge badge-veg">${ICONS.vegCircle} Veg</span>
              <span style="font-size:var(--text-sm); color: ${product.inStock ? 'var(--success)' : 'var(--danger)'}; font-weight:600;">
                ${product.inStock ? `${ICONS.check} In Stock (${product.stock} available)` : `${ICONS.x} Out of Stock`}
              </span>
            </div>

            <div class="product-add-section">
              <div class="qty-selector">
                <button onclick="window.updateDetailQty(-1)">−</button>
                <input type="text" class="qty-value" id="detailQty" value="1" readonly />
                <button onclick="window.updateDetailQty(1)">+</button>
              </div>
              <button class="btn btn-primary btn-lg btn-ripple" onclick="window.addToCart(${product.id}, parseInt(document.getElementById('detailQty').value))" ${!product.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                ${ICONS.cart} Add to Cart
              </button>
            </div>

            <!-- Nutrition Facts -->
            <div class="product-nutrition">
              <h4>${ICONS.nutrition} Nutrition Facts <span style="font-weight:400; font-size:var(--text-sm); color:var(--neutral-400);">(per serving)</span></h4>
              <div class="nutrition-grid">
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.calories}</div>
                  <div class="nut-label">Calories</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.protein}</div>
                  <div class="nut-label">Protein</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.fiber}</div>
                  <div class="nut-label">Fiber</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.iron}</div>
                  <div class="nut-label">Iron</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.calcium}</div>
                  <div class="nut-label">Calcium</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${product.nutrition.vitB}</div>
                  <div class="nut-label">Vitamin B</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- All Available Kanji Varieties Section -->
        <div style="margin-top: var(--space-16);">
          <div class="section-header reveal">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:var(--space-4);">
              <div>
                <span class="section-badge">${ICONS.bowl} ALL KANJI VARIETIES (அனைத்து கஞ்சி வகைகள்)</span>
                <h2>Explore All Available Kanjies</h2>
                <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">
                  பாரம்பரிய முறைப்படி தயாரிக்கப்படும் 21 வகையான ஆரோக்கிய கஞ்சி வகைகள் — 100% இயற்கை பொருட்கள்
                </p>
              </div>
              <a href="#/shop?category=kanji" class="btn btn-outline btn-sm btn-ripple">
                View Full Menu ${ICONS.arrowRight}
              </a>
            </div>
          </div>
          <div class="grid-products reveal-stagger">
            ${allKanjies.map(p => {
              const isCurrent = p.id === product.id;
              if (isCurrent) {
                return `
                  <div style="position:relative; outline: 2px solid var(--gold-500); border-radius: var(--radius-xl); box-shadow: 0 0 15px rgba(212,160,23,0.3);">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--gold-600); color:var(--primary-950); font-size:11px; font-weight:800; letter-spacing:0.05em; padding:3px 12px; border-radius:var(--radius-full); z-index:10; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
                      CURRENTLY VIEWING
                    </div>
                    ${renderProductCard(p)}
                  </div>
                `;
              }
              return renderProductCard(p);
            }).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

// Quantity handler for detail page
export function initProductHandlers() {
  window.updateDetailQty = function(delta) {
    const input = document.getElementById('detailQty');
    if (input) {
      const newVal = Math.max(1, parseInt(input.value) + delta);
      input.value = newVal;
    }
  };
}

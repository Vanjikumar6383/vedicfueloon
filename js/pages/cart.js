/* ============================================
   VEDICFUELOON — CART PAGE
   ============================================ */

import { Cart } from '../store.js';
import { formatPrice, ICONS } from '../components.js';

export function renderCartPage() {
  const items = Cart.get();
  
  if (items.length === 0) {
    return `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${ICONS.cart}</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any traditional goodness yet!</p>
            <p class="tamil-text" style="color:var(--gold-600); margin-bottom:var(--space-4);">உங்கள் கூடை காலியாக உள்ளது</p>
            <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${ICONS.bowl} Explore Menu</a>
          </div>
        </div>
      </section>
    `;
  }

  const subtotal = Cart.getSubtotal();
  const delivery = Cart.getDelivery();
  const total = Cart.getTotal();
  const savings = items.reduce((sum, i) => sum + ((i.originalPrice - i.price) * i.qty), 0);

  return `
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <div class="cart-page-header reveal">
          <h1>Your Cart</h1>
          <p style="color:var(--neutral-500); margin-top:var(--space-2);">${items.length} item${items.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="reveal">
            ${items.map(item => `
              <div class="cart-item" data-cart-id="${item.id}">
                <div class="cart-item-image">
                  ${item.image 
                    ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);" />` 
                    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gold-400);">${ICONS.bowl}</div>`
                  }
                </div>
                <div class="cart-item-info">
                  <h4>${item.name}</h4>
                  <span class="cart-item-tamil tamil-text">${item.tamilName}</span>
                  <div class="cart-item-actions">
                    <div class="qty-selector">
                      <button onclick="window.updateCartQty(${item.id}, ${item.qty - 1})">−</button>
                      <input type="text" class="qty-value" value="${item.qty}" readonly />
                      <button onclick="window.updateCartQty(${item.id}, ${item.qty + 1})">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="window.removeCartItem(${item.id})">${ICONS.trash} Remove</button>
                  </div>
                </div>
                <div class="cart-item-price">
                  ${formatPrice(item.price * item.qty)}
                  ${item.qty > 1 ? `<div style="font-size:var(--text-xs); color:var(--neutral-400); font-weight:400;">₹${item.price} × ${item.qty}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary reveal">
            <h3 style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--cream-200);">
              Order Summary
            </h3>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            
            <div class="summary-row">
              <span>Delivery</span>
              <span>${delivery === 0 ? `<span class="free-badge">FREE ${ICONS.check}</span>` : formatPrice(delivery)}</span>
            </div>
            
            ${savings > 0 ? `
            <div class="summary-row" style="color: var(--success);">
              <span>You Save</span>
              <span>-${formatPrice(savings)}</span>
            </div>
            ` : ''}

            ${subtotal < 499 ? `
            <div style="background: var(--gold-100); padding: var(--space-3); border-radius: var(--radius-md); margin: var(--space-3) 0; font-size: var(--text-xs); color: var(--gold-800); display:flex; align-items:center; gap:var(--space-2);">
              ${ICONS.truck} Add ₹${499 - subtotal} more for FREE delivery!
            </div>
            ` : ''}
            
            <div class="summary-row total">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>
            
            <a href="#/checkout" class="btn btn-primary btn-lg btn-ripple" style="width:100%; margin-top:var(--space-6);">
              Proceed to Checkout ${ICONS.arrowRight}
            </a>
            
            <a href="#/shop" class="btn btn-outline btn-ripple" style="width:100%; margin-top:var(--space-3);">
              ${ICONS.arrowLeft} Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initCartHandlers() {
  window.updateCartQty = function(productId, newQty) {
    if (newQty < 1) {
      window.removeCartItem(productId);
      return;
    }
    Cart.updateQty(productId, newQty);
    window.navigateTo(location.hash);
  };

  window.removeCartItem = function(productId) {
    Cart.remove(productId);
    window.navigateTo(location.hash);
    window.showToastGlobal('Removed', 'Item removed from cart', 'warning');
  };
}

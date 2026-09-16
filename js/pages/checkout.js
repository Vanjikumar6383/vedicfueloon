/* ============================================
   VEDICFUELOON — CHECKOUT PAGE
   ============================================ */

import { Cart, Orders } from '../store.js';
import { formatPrice, showToast, ICONS } from '../components.js';

export function renderCheckoutPage() {
  const items = Cart.get();
  
  if (items.length === 0) {
    return `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${ICONS.cart}</div>
            <h3>Nothing to Checkout</h3>
            <p>Add items to your cart before checking out.</p>
            <a href="#/shop" class="btn btn-primary btn-ripple">Browse Menu</a>
          </div>
        </div>
      </section>
    `;
  }

  const subtotal = Cart.getSubtotal();
  const delivery = Cart.getDelivery();
  const total = Cart.getTotal();

  return `
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <div class="section-header reveal">
          <h1>Checkout</h1>
          <p style="color:var(--neutral-500);">Complete your order to enjoy traditional Tamil goodness</p>
        </div>

        <div class="checkout-layout">
          <!-- Checkout Form -->
          <div class="checkout-form reveal">
            <h3>${ICONS.clipboard} Delivery Details</h3>
            
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-input" id="checkoutName" placeholder="Enter your full name" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Phone Number *</label>
              <input type="tel" class="form-input" id="checkoutPhone" placeholder="+91 98765 43210" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Email (Optional)</label>
              <input type="email" class="form-input" id="checkoutEmail" placeholder="your@email.com" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Delivery Address *</label>
              <textarea class="form-textarea" id="checkoutAddress" placeholder="Enter your full delivery address including pincode" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Special Instructions (Optional)</label>
              <textarea class="form-textarea" id="checkoutNotes" placeholder="Any special requests or notes..." rows="2"></textarea>
            </div>

            <div id="checkoutError" style="display:none; background:var(--danger-light); color:var(--danger); padding:var(--space-3) var(--space-4); border-radius:var(--radius-md); font-size:var(--text-sm); margin-bottom:var(--space-4);">
              Please fill in all required fields.
            </div>
            
            <button class="btn btn-primary btn-lg btn-ripple" style="width:100%;" onclick="window.placeOrder()">
              ${ICONS.cart} Place Order — ${formatPrice(total)}
            </button>

            <p style="text-align:center; margin-top:var(--space-4); font-size:var(--text-xs); color:var(--neutral-400);">
              By placing this order, you agree to our terms & conditions
            </p>
          </div>

          <!-- Order Summary -->
          <div class="cart-summary reveal">
            <h3 style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--cream-200);">
              ${ICONS.shoppingBag} Order Summary
            </h3>
            
            ${items.map(item => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) 0; border-bottom:1px solid var(--cream-100);">
                <div style="display:flex; align-items:center; gap:var(--space-3);">
                  ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;object-fit:cover;border-radius:var(--radius-md);flex-shrink:0;" />` : ''}
                  <div>
                    <div style="font-weight:600; font-size:var(--text-sm);">${item.name}</div>
                    <div style="font-size:var(--text-xs); color:var(--neutral-400);">Qty: ${item.qty}</div>
                  </div>
                </div>
                <div style="font-weight:600;">${formatPrice(item.price * item.qty)}</div>
              </div>
            `).join('')}
            
            <div class="summary-row" style="margin-top:var(--space-4);">
              <span>Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span>${delivery === 0 ? `<span class="free-badge">FREE ${ICONS.check}</span>` : formatPrice(delivery)}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderOrderConfirmation(order) {
  return `
    <section class="section">
      <div class="container">
        <div class="order-confirmation reveal">
          <div class="confirm-icon">${ICONS.check}</div>
          <h2 style="color: var(--success); margin-bottom: var(--space-4);">Order Placed Successfully!</h2>
          <p class="tamil-text" style="color:var(--gold-600); font-size:var(--text-xl); margin-bottom:var(--space-6);">
            உங்கள் ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!
          </p>
          
          <div style="background:var(--cream-50); border-radius:var(--radius-xl); padding:var(--space-8); max-width:500px; margin:0 auto; text-align:left; border:1px solid var(--cream-200);">
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Order ID</span>
              <strong>${order.id}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Items</span>
              <strong>${order.items.length} products</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Total</span>
              <strong style="color:var(--primary-700); font-size:var(--text-lg);">${formatPrice(order.total)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--neutral-500);">Status</span>
              <span class="status-badge status-pending">${ICONS.hourglass} Pending</span>
            </div>
          </div>

          <div style="margin-top:var(--space-8); display:flex; gap:var(--space-4); justify-content:center; flex-wrap:wrap;">
            <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${ICONS.bowl} Continue Shopping</a>
            <a href="#/" class="btn btn-outline btn-lg btn-ripple">${ICONS.arrowLeft} Back to Home</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initCheckoutHandlers() {
  window.placeOrder = function() {
    const name = document.getElementById('checkoutName')?.value.trim();
    const phone = document.getElementById('checkoutPhone')?.value.trim();
    const address = document.getElementById('checkoutAddress')?.value.trim();
    const email = document.getElementById('checkoutEmail')?.value.trim();
    const notes = document.getElementById('checkoutNotes')?.value.trim();
    const errorEl = document.getElementById('checkoutError');

    if (!name || !phone || !address) {
      if (errorEl) { errorEl.style.display = 'block'; }
      return;
    }

    const customerInfo = { name, phone, address, email, notes };
    const cartItems = Cart.get();
    const order = Orders.create(customerInfo, cartItems);

    // Render confirmation
    const app = document.getElementById('pageContent');
    if (app) {
      const { renderOrderConfirmation: renderConfirm } = { renderOrderConfirmation };
      app.innerHTML = renderConfirm(order);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Re-init scroll reveal
      if (window.initReveal) window.initReveal();
    }

    showToast('Order Placed!', `Order ${order.id} confirmed`, 'success');
  };
}

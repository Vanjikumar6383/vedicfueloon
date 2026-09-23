/* ============================================
   VEDICFUELOON — CHECKOUT PAGE
   ============================================ */

import { Cart, Orders } from '../store.js';
import { formatPrice, showToast, ICONS } from '../components.js';
import { printEBill } from '../ebill.js';

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
              <label class="form-label">Payment Method *</label>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: var(--space-2); margin-top: var(--space-1);">
                <label style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1.5px solid var(--gold-500); background:rgba(212, 160, 23, 0.08); border-radius:var(--radius-lg); cursor:pointer; font-weight:600; font-size:var(--text-xs);">
                  <input type="radio" name="checkoutPayment" value="UPI" checked style="accent-color:var(--gold-600);" />
                  <span>UPI / GPay / PhonePe</span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid var(--cream-200); border-radius:var(--radius-lg); cursor:pointer; font-size:var(--text-xs);">
                  <input type="radio" name="checkoutPayment" value="COD" style="accent-color:var(--gold-600);" />
                  <span>Cash on Delivery</span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid var(--cream-200); border-radius:var(--radius-lg); cursor:pointer; font-size:var(--text-xs);">
                  <input type="radio" name="checkoutPayment" value="Card" style="accent-color:var(--gold-600);" />
                  <span>Card / NetBanking</span>
                </label>
              </div>
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
          <h2 style="color: var(--success); margin-bottom: var(--space-2);">Order Placed Successfully!</h2>
          <p class="tamil-text" style="color:var(--gold-600); font-size:var(--text-xl); margin-bottom:var(--space-6);">
            உங்கள் ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!
          </p>
          
          <div style="background:var(--cream-50); border-radius:var(--radius-xl); padding:var(--space-6) var(--space-8); max-width:580px; margin:0 auto; text-align:left; border:1px solid var(--cream-200);">
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Order ID</span>
              <strong style="font-family:var(--font-mono, monospace);">${order.id}</strong>
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

          <!-- 🌟 OFFICIAL E-BILLING RECEIPT BOX -->
          <div class="checkout-ebill-card reveal">
            <div class="checkout-ebill-header">
              <div>
                <span class="checkout-ebill-pill">${ICONS.sparkle} OFFICIAL TAX INVOICE / E-BILL READY</span>
                <div style="font-family:var(--font-mono, monospace); font-weight:800; font-size:var(--text-lg); color:var(--primary-900); margin-top:4px;">
                  Invoice No: ${order.invoiceNo || order.id}
                </div>
              </div>
              <span class="badge" style="background:rgba(39, 174, 96, 0.15); color:#27ae60; font-weight:700; padding:6px 12px; border-radius:var(--radius-full); font-size:12px;">
                ✓ Dispatched to Admin Desk
              </span>
            </div>

            <p style="font-size:var(--text-xs); color:var(--neutral-500); line-height:1.6; margin-bottom:var(--space-4);">
              Your official tax invoice and electronic bill has been generated in the standard format. A synchronized copy is instantly delivered to both you and the <strong>VedicFueloon Admin Dispatch Center</strong>.
            </p>

            <div style="background:var(--cream-50); border:1px dashed rgba(212, 160, 23, 0.4); border-radius:var(--radius-lg); padding:var(--space-3) var(--space-4); display:flex; justify-content:space-between; align-items:center; font-size:var(--text-xs); margin-bottom:var(--space-4); flex-wrap:wrap; gap:8px;">
              <div>
                <span style="color:var(--neutral-400);">Payment Method:</span> 
                <strong style="color:#27ae60;">${order.paymentStatus || 'Paid'}</strong> (${order.paymentMethod || 'UPI'})
              </div>
              <div>
                <span style="color:var(--neutral-400);">Products:</span> 
                <strong>${order.items.length} items</strong>
              </div>
              <div>
                <span style="color:var(--neutral-400);">Net Total:</span> 
                <strong style="color:var(--primary-900); font-size:var(--text-sm);">${formatPrice(order.total)}</strong>
              </div>
            </div>

            <div class="checkout-ebill-actions">
              <button class="btn btn-primary btn-ripple btn-sm" onclick="window.downloadEBill('${order.id}')" style="flex:1; min-width:180px; display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Official E-Bill (PDF)
              </button>
              
              <button class="btn btn-outline btn-ripple btn-sm" onclick="window.previewEBill('${order.id}')" style="display:inline-flex; align-items:center; gap:6px;">
                ${ICONS.eye} View E-Bill
              </button>
              
              <button class="btn btn-ghost btn-ripple btn-sm" onclick="window.printEBillDirect('${order.id}')" style="display:inline-flex; align-items:center; gap:6px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print
              </button>
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
    const paymentMethodEl = document.querySelector('input[name="checkoutPayment"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'UPI';
    const errorEl = document.getElementById('checkoutError');

    if (!name || !phone || !address) {
      if (errorEl) { errorEl.style.display = 'block'; }
      return;
    }

    const customerInfo = { name, phone, address, email, notes, paymentMethod };
    const cartItems = Cart.get();
    const order = Orders.create(customerInfo, cartItems, { paymentMethod });

    // Render confirmation
    const app = document.getElementById('pageContent');
    if (app) {
      const { renderOrderConfirmation: renderConfirm } = { renderOrderConfirmation };
      app.innerHTML = renderConfirm(order);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Re-init scroll reveal
      if (window.initReveal) window.initReveal();
    }

    showToast('Order Placed!', `Invoice ${order.invoiceNo} issued`, 'success');
  };

  window.printEBillDirect = function(orderId) {
    const order = Orders.getById(orderId) || Orders.get().find(o => o.id === orderId);
    if (order) printEBill(order);
  };
}


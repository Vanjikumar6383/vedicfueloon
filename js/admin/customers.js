/* ============================================
   VEDICFUELOON — ADMIN CUSTOMERS (SECURED)
   Customer Management & Dossier Viewer
   Secured with Context-Aware HTML Escaping (Anti-XSS)
   ============================================ */

import { Customers, Orders } from '../store.js';
import { formatPrice, formatDate, ICONS } from '../components.js';
import { escapeHTML } from '../security.js';

export function renderAdminCustomers() {
  const customers = Customers.get();

  return `
    <div class="admin-header">
      <div>
        <h1>Customers</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">View and manage your customer base</p>
      </div>
      <div style="display:flex; gap:var(--space-3); align-items:center;">
        <span style="font-size:var(--text-sm); color:var(--neutral-500);">Total: <strong>${customers.length}</strong></span>
      </div>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${ICONS.users} All Customers</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search by name, phone, ID..." 
                 oninput="window.adminSearchCustomers(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminCustomersTable">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${customers.length > 0 ? customers.map(c => {
              const safeId = escapeHTML(c.id);
              const safeName = escapeHTML(c.name || 'Patron');
              const initial = escapeHTML((c.name || 'P').charAt(0).toUpperCase());
              const safePhone = escapeHTML(c.phone || '');
              const safeAddress = escapeHTML(c.address || '');
              const ordersCount = Array.isArray(c.orders) ? c.orders.length : 0;
              const safeSpent = formatPrice(c.totalSpent);
              const safeLastOrder = formatDate(c.lastOrder);

              return `
                <tr>
                  <td><strong style="font-size:var(--text-xs);">${safeId}</strong></td>
                  <td>
                    <div style="display:flex; align-items:center; gap:var(--space-2);">
                      <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-100); color:var(--primary-700); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:var(--text-sm); flex-shrink:0;">
                        ${initial}
                      </div>
                      <strong>${safeName}</strong>
                    </div>
                  </td>
                  <td style="font-size:var(--text-sm);">${safePhone}</td>
                  <td style="font-size:var(--text-xs); color:var(--neutral-500); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${safeAddress}</td>
                  <td><span class="badge" style="background:var(--primary-50); color:var(--primary-700);">${ordersCount}</span></td>
                  <td><strong style="color:var(--primary-700);">${safeSpent}</strong></td>
                  <td style="font-size:var(--text-xs); color:var(--neutral-500);">${safeLastOrder}</td>
                  <td>
                    <div class="table-actions">
                      <button class="table-action-btn btn-view-cust-detail" data-cust-id="${safeId}" title="View Details">${ICONS.eye}</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No customers yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Customer Detail Modal -->
    <div class="modal-overlay" id="customerDetailModal">
      <div class="modal admin-modal-card w-full max-w-xl mx-3 p-4 sm:p-6 max-h-[92vh] overflow-y-auto" style="display:block !important; position:relative !important; background:#0c1a14; color:#FFF8E7; border:1.5px solid rgba(212,160,23,0.35); border-radius:var(--radius-2xl); box-shadow:0 25px 70px rgba(0,0,0,0.85);">
        <div class="modal-header d-flex justify-content-between align-items-center" style="border-bottom:1px solid rgba(212,160,23,0.2); padding-bottom:var(--space-4); margin-bottom:var(--space-5);">
          <div>
            <span style="font-size:11px; color:var(--gold-400); font-weight:700; text-transform:uppercase; letter-spacing:1px;">Patron Directory</span>
            <h3 style="margin:2px 0 0; color:#FFF8E7; font-size:var(--text-xl);">Customer Dossier</h3>
          </div>
          <button class="modal-close" onclick="window.closeCustomerDetailModal()" style="font-size:22px; color:var(--cream-200); background:rgba(255,255,255,0.08); border:1px solid rgba(212,160,23,0.3); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer;">${ICONS.x}</button>
        </div>
        <div id="customerDetailContent"></div>
      </div>
    </div>
  `;
}

export function initAdminCustomerHandlers() {
  window.closeCustomerDetailModal = function() {
    document.getElementById('customerDetailModal')?.classList.remove('active');
  };

  const cModal = document.getElementById('customerDetailModal');
  if (cModal) {
    cModal.onclick = function(e) {
      if (e.target === cModal) window.closeCustomerDetailModal();
    };
  }

  // Attach click listener for customer detail buttons using event delegation
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-view-cust-detail');
    if (btn) {
      const custId = btn.getAttribute('data-cust-id');
      if (custId) window.viewCustomerDetail(custId);
    }
  });

  window.adminSearchCustomers = function(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('#adminCustomersTable tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };

  window.viewCustomerDetail = function(customerId) {
    const customer = Customers.getById(customerId);
    if (!customer) return;

    const customerOrders = (customer.orders || [])
      .map(orderId => Orders.getById(orderId))
      .filter(Boolean);

    const content = document.getElementById('customerDetailContent');
    if (content) {
      const safeName = escapeHTML(customer.name || 'Valued Patron');
      const safeInitial = escapeHTML((customer.name || 'P').charAt(0).toUpperCase());
      const safeId = escapeHTML(customer.id);
      const safePhone = escapeHTML(customer.phone || 'N/A');
      const safeSpent = formatPrice(customer.totalSpent);
      const safeAddress = escapeHTML(customer.address || 'N/A');
      const safeJoined = formatDate(customer.joinedAt);

      content.innerHTML = `
        <div style="display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-5);">
          <div style="width:58px; height:58px; border-radius:50%; background:rgba(212,160,23,0.18); border:1.5px solid var(--gold-500); color:var(--gold-400); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:var(--text-2xl); flex-shrink:0;">
            ${safeInitial}
          </div>
          <div>
            <h3 style="margin-bottom:var(--space-1); font-size:var(--text-lg); color:#FFF8E7;">${safeName}</h3>
            <span style="font-size:var(--text-xs); color:var(--gold-400); font-family:var(--font-mono, monospace);">${safeId}</span>
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-3); margin-bottom:var(--space-5);">
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Phone Number</div>
            <div style="font-weight:700; color:#FFF8E7; font-size:var(--text-sm);">${safePhone}</div>
          </div>
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Lifetime Spend</div>
            <div style="font-weight:800; color:var(--gold-400); font-size:var(--text-base);">${safeSpent}</div>
          </div>
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08); grid-column:1/-1;">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Delivery Address</div>
            <div style="font-size:var(--text-xs); color:var(--cream-200); line-height:1.5;">${safeAddress}</div>
          </div>
        </div>
        
        <h4 style="margin-bottom:var(--space-3); color:#FFF8E7; font-size:var(--text-sm);">Order History (${customerOrders.length})</h4>
        <div style="max-height:170px; overflow-y:auto; margin-bottom:var(--space-4);">
        ${customerOrders.length > 0 ? customerOrders.map(order => {
          const safeOrderId = escapeHTML(order.id);
          const safeOrderDate = formatDate(order.createdAt);
          const safeOrderTotal = formatPrice(order.total);
          const safeStatus = escapeHTML((order.status || 'pending').toLowerCase());

          return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-2) 0; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div>
                <div style="font-weight:700; font-size:var(--text-xs); color:#FFF8E7;">${safeOrderId}</div>
                <div style="font-size:11px; color:var(--cream-400);">${safeOrderDate}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:700; color:var(--gold-400); font-size:var(--text-xs);">${safeOrderTotal}</div>
                <span class="status-badge status-${safeStatus}" style="font-size:9px; padding:2px 6px;">${safeStatus.toUpperCase()}</span>
              </div>
            </div>
          `;
        }).join('') : '<p style="color:var(--cream-400); font-size:var(--text-xs);">No orders found for this customer</p>'}
        </div>
        
        <div style="text-align:center; padding-top:var(--space-2); border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:11px; color:var(--cream-500);">Registered Patron since ${safeJoined}</span>
        </div>
      `;
    }

    const modal = document.getElementById('customerDetailModal');
    if (modal) {
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      modal.onclick = function(e) {
        if (e.target === modal) window.closeCustomerDetailModal();
      };
      modal.classList.add('active');
    }
  };
}

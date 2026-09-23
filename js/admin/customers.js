/* ============================================
   VEDICFUELOON — ADMIN CUSTOMERS
   Customer Management
   ============================================ */

import { Customers, Orders } from '../store.js';
import { formatPrice, formatDate, ICONS } from '../components.js';

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
            ${customers.length > 0 ? customers.map(c => `
              <tr>
                <td><strong style="font-size:var(--text-xs);">${c.id}</strong></td>
                <td>
                  <div style="display:flex; align-items:center; gap:var(--space-2);">
                    <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-100); color:var(--primary-700); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:var(--text-sm); flex-shrink:0;">
                      ${c.name.charAt(0)}
                    </div>
                    <strong>${c.name}</strong>
                  </div>
                </td>
                <td style="font-size:var(--text-sm);">${c.phone}</td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.address}</td>
                <td><span class="badge" style="background:var(--primary-50); color:var(--primary-700);">${c.orders.length}</span></td>
                <td><strong style="color:var(--primary-700);">${formatPrice(c.totalSpent)}</strong></td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500);">${formatDate(c.lastOrder)}</td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn" onclick="window.viewCustomerDetail('${c.id}')" title="View Details">${ICONS.eye}</button>
                  </div>
                </td>
              </tr>
            `).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No customers yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Customer Detail Modal -->
    <div class="modal-overlay" id="customerDetailModal">
      <div class="modal admin-modal-card" style="display:block !important; position:relative !important; max-width:620px; background:#0c1a14; color:#FFF8E7; border:1.5px solid rgba(212,160,23,0.35); border-radius:var(--radius-2xl); box-shadow:0 25px 70px rgba(0,0,0,0.85); padding:var(--space-6);">
        <div class="modal-header" style="border-bottom:1px solid rgba(212,160,23,0.2); padding-bottom:var(--space-4); margin-bottom:var(--space-5);">
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

  window.adminSearchCustomers = function(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('#adminCustomersTable tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };

  window.viewCustomerDetail = function(customerId) {
    const customer = Customers.getById(customerId);
    if (!customer) return;

    const customerOrders = customer.orders
      .map(orderId => Orders.getById(orderId))
      .filter(Boolean);

    const content = document.getElementById('customerDetailContent');
    if (content) {
      content.innerHTML = `
        <div style="display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-5);">
          <div style="width:58px; height:58px; border-radius:50%; background:rgba(212,160,23,0.18); border:1.5px solid var(--gold-500); color:var(--gold-400); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:var(--text-2xl); flex-shrink:0;">
            ${customer.name.charAt(0)}
          </div>
          <div>
            <h3 style="margin-bottom:var(--space-1); font-size:var(--text-lg); color:#FFF8E7;">${customer.name}</h3>
            <span style="font-size:var(--text-xs); color:var(--gold-400); font-family:var(--font-mono, monospace);">${customer.id}</span>
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-3); margin-bottom:var(--space-5);">
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Phone Number</div>
            <div style="font-weight:700; color:#FFF8E7; font-size:var(--text-sm);">${customer.phone}</div>
          </div>
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08);">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Lifetime Spend</div>
            <div style="font-weight:800; color:var(--gold-400); font-size:var(--text-base);">${formatPrice(customer.totalSpent)}</div>
          </div>
          <div style="background:rgba(18,40,29,0.7); padding:var(--space-3) var(--space-4); border-radius:var(--radius-lg); border:1px solid rgba(255,255,255,0.08); grid-column:1/-1;">
            <div style="font-size:10px; color:var(--cream-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Delivery Address</div>
            <div style="font-size:var(--text-xs); color:var(--cream-200); line-height:1.5;">${customer.address}</div>
          </div>
        </div>
        
        <h4 style="margin-bottom:var(--space-3); color:#FFF8E7; font-size:var(--text-sm);">Order History (${customerOrders.length})</h4>
        <div style="max-height:170px; overflow-y:auto; margin-bottom:var(--space-4);">
        ${customerOrders.length > 0 ? customerOrders.map(order => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-2) 0; border-bottom:1px solid rgba(255,255,255,0.06);">
            <div>
              <div style="font-weight:700; font-size:var(--text-xs); color:#FFF8E7;">${order.id}</div>
              <div style="font-size:11px; color:var(--cream-400);">${formatDate(order.createdAt)}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:700; color:var(--gold-400); font-size:var(--text-xs);">${formatPrice(order.total)}</div>
              <span class="status-badge status-${order.status}" style="font-size:9px; padding:2px 6px;">${order.status.toUpperCase()}</span>
            </div>
          </div>
        `).join('') : '<p style="color:var(--cream-400); font-size:var(--text-xs);">No orders found for this customer</p>'}
        </div>
        
        <div style="text-align:center; padding-top:var(--space-2); border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:11px; color:var(--cream-500);">Registered Patron since ${formatDate(customer.joinedAt)}</span>
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

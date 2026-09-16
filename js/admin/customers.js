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
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3>Customer Details</h3>
          <button class="modal-close" onclick="document.getElementById('customerDetailModal').classList.remove('active')">${ICONS.x}</button>
        </div>
        <div id="customerDetailContent"></div>
      </div>
    </div>
  `;
}

export function initAdminCustomerHandlers() {
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
        <div style="display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-6);">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--primary-100); color:var(--primary-700); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:var(--text-2xl); flex-shrink:0;">
            ${customer.name.charAt(0)}
          </div>
          <div>
            <h3 style="margin-bottom:var(--space-1); font-size:var(--text-xl);">${customer.name}</h3>
            <span style="font-size:var(--text-sm); color:var(--neutral-500);">${customer.id}</span>
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4); margin-bottom:var(--space-6);">
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md);">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Phone</div>
            <div style="font-weight:600;">${customer.phone}</div>
          </div>
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md);">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Total Spent</div>
            <div style="font-weight:700; color:var(--primary-700); font-size:var(--text-lg);">${formatPrice(customer.totalSpent)}</div>
          </div>
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md); grid-column:1/-1;">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Address</div>
            <div style="font-size:var(--text-sm);">${customer.address}</div>
          </div>
        </div>
        
        <h4 style="margin-bottom:var(--space-3);">Order History (${customerOrders.length})</h4>
        ${customerOrders.length > 0 ? customerOrders.map(order => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3); border-bottom:1px solid var(--cream-100);">
            <div>
              <div style="font-weight:600; font-size:var(--text-sm);">${order.id}</div>
              <div style="font-size:var(--text-xs); color:var(--neutral-500);">${formatDate(order.createdAt)}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:600;">${formatPrice(order.total)}</div>
              <span class="status-badge status-${order.status}" style="font-size:10px;">${order.status}</span>
            </div>
          </div>
        `).join('') : '<p style="color:var(--neutral-400); font-size:var(--text-sm);">No orders found</p>'}
        
        <div style="margin-top:var(--space-4); text-align:center;">
          <span style="font-size:var(--text-xs); color:var(--neutral-400);">Customer since ${formatDate(customer.joinedAt)}</span>
        </div>
      `;
    }

    document.getElementById('customerDetailModal')?.classList.add('active');
  };
}

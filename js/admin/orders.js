/* ============================================
   VEDICFUELOON — ADMIN ORDERS
   Order Management, Status Updates
   ============================================ */

import { Orders } from '../store.js';
import { formatPrice, formatDate, showToast, ICONS } from '../components.js';

export function renderAdminOrders() {
  const orders = Orders.get();
  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return `
    <div class="admin-header">
      <div>
        <h1>Orders</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">Manage customer orders</p>
      </div>
    </div>

    <!-- Status Filter Tabs -->
    <div class="tabs" style="margin-bottom: var(--space-6);">
      <button class="tab-btn active" onclick="window.filterAdminOrders('all', this)">All (${statusCounts.all})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('pending', this)">${ICONS.hourglass} Pending (${statusCounts.pending})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('processing', this)">${ICONS.package} Processing (${statusCounts.processing})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('delivered', this)">${ICONS.checkCircle} Delivered (${statusCounts.delivered})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('cancelled', this)">${ICONS.x} Cancelled (${statusCounts.cancelled})</button>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${ICONS.clipboard} Orders</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search orders..." 
                 oninput="window.adminSearchOrders(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminOrdersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length > 0 ? orders.map(order => `
              <tr data-order-id="${order.id}" data-status="${order.status}">
                <td><strong>${order.id}</strong></td>
                <td>
                  <div style="font-weight:600;">${order.customer.name}</div>
                  <div style="font-size:var(--text-xs); color:var(--neutral-400); max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${order.customer.address}</div>
                </td>
                <td style="font-size:var(--text-sm);">${order.customer.phone}</td>
                <td>
                  <div style="font-size:var(--text-sm);">
                    ${order.items.map(i => `${i.name} ×${i.qty}`).join('<br/>')}
                  </div>
                </td>
                <td><strong>${formatPrice(order.total)}</strong></td>
                <td>
                  <select class="form-select" style="padding:var(--space-1) var(--space-3); font-size:var(--text-xs); min-width:120px; padding-right:var(--space-8);"
                          onchange="window.updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                  </select>
                </td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500); white-space:nowrap;">${formatDate(order.createdAt)}</td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn" onclick="window.viewOrderDetail('${order.id}')" title="View Details">${ICONS.eye}</button>
                  </div>
                </td>
              </tr>
            `).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No orders yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div class="modal-overlay" id="orderDetailModal">
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3>Order Details</h3>
          <button class="modal-close" onclick="document.getElementById('orderDetailModal').classList.remove('active')">${ICONS.x}</button>
        </div>
        <div id="orderDetailContent"></div>
      </div>
    </div>
  `;
}

export function initAdminOrderHandlers() {
  window.updateOrderStatus = function(orderId, status) {
    Orders.updateStatus(orderId, status);
    showToast('Status Updated', `Order ${orderId} → ${status}`, 'success');
  };

  window.filterAdminOrders = function(status, btnEl) {
    const rows = document.querySelectorAll('#adminOrdersTable tbody tr');
    rows.forEach(row => {
      if (status === 'all') {
        row.style.display = '';
      } else {
        row.style.display = row.dataset.status === status ? '' : 'none';
      }
    });

    // Update active tab
    document.querySelectorAll('.tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  };

  window.adminSearchOrders = function(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('#adminOrdersTable tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };

  window.viewOrderDetail = function(orderId) {
    const order = Orders.getById(orderId);
    if (!order) return;

    const content = document.getElementById('orderDetailContent');
    if (content) {
      content.innerHTML = `
        <div style="margin-bottom:var(--space-4);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Order ID</span>
            <strong>${order.id}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Customer</span>
            <strong>${order.customer.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Phone</span>
            <span>${order.customer.phone}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Address</span>
            <span style="text-align:right; max-width:250px;">${order.customer.address}</span>
          </div>
        </div>
        
        <h4 style="margin:var(--space-4) 0 var(--space-3);">Items</h4>
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; padding:var(--space-2) 0; border-bottom:1px solid var(--cream-100);">
            <span>${item.name} × ${item.qty}</span>
            <strong>${formatPrice(item.price * item.qty)}</strong>
          </div>
        `).join('')}
        
        <div style="margin-top:var(--space-4); padding-top:var(--space-4); border-top:2px solid var(--cream-200);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <span>Subtotal</span><span>${formatPrice(order.subtotal)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <span>Delivery</span><span>${order.delivery === 0 ? 'FREE' : formatPrice(order.delivery)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-lg); font-weight:700; color:var(--primary-700);">
            <span>Total</span><span>${formatPrice(order.total)}</span>
          </div>
        </div>
        
        <div style="margin-top:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
          <span style="color:var(--neutral-500); font-size:var(--text-sm);">${formatDate(order.createdAt)}</span>
          <span class="status-badge status-${order.status}">${order.status}</span>
        </div>
      `;
    }

    document.getElementById('orderDetailModal')?.classList.add('active');
  };
}

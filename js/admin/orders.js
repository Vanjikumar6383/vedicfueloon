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
              <th>Order & Invoice</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>E-Bill / Actions</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length > 0 ? orders.map(order => {
              const invNo = order.invoiceNo || `VF/260921/${order.id.slice(-5)}`;
              return `
                <tr data-order-id="${order.id}" data-status="${order.status}">
                  <td>
                    <span class="admin-order-id-badge">${order.id}</span>
                    <span class="admin-invoice-badge">${invNo}</span>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#FFF8E7;">${order.customer.name}</div>
                    <div style="font-size:var(--text-xs); color:var(--cream-400); max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${order.customer.address}</div>
                  </td>
                  <td style="font-size:var(--text-sm);">${order.customer.phone}</td>
                  <td>
                    <div style="font-size:var(--text-xs); color:var(--cream-200);">
                      ${order.items.map(i => `${i.name} <strong style="color:var(--gold-400);">×${i.qty}</strong>`).join('<br/>')}
                    </div>
                  </td>
                  <td><strong style="color:var(--gold-400); font-size:var(--text-sm);">${formatPrice(order.total)}</strong></td>
                  <td>
                    <select class="form-select" style="padding:var(--space-1) var(--space-3); font-size:var(--text-xs); min-width:115px; padding-right:var(--space-7); background:#06110b; color:var(--cream-100); border-color:rgba(212,160,23,0.3);"
                            onchange="window.updateOrderStatus('${order.id}', this.value)">
                      <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                      <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                      <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                      <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                  </td>
                  <td style="font-size:var(--text-xs); color:var(--cream-400); white-space:nowrap;">${formatDate(order.createdAt)}</td>
                  <td>
                    <div class="table-actions" style="gap:6px;">
                      <button class="admin-btn-ebill" onclick="window.downloadEBill('${order.id}')" title="Download Official E-Bill (PDF)">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        PDF
                      </button>
                      <button class="table-action-btn" onclick="window.previewEBill('${order.id}')" title="Preview E-Bill">
                        ${ICONS.eye}
                      </button>
                      <button class="table-action-btn" onclick="window.viewOrderDetail('${order.id}')" title="View Order Full Details">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--cream-400);">No orders yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div class="modal-overlay" id="orderDetailModal">
      <div class="modal admin-modal-card" style="display:block !important; position:relative !important; max-width:640px; background:#0c1a14; color:#FFF8E7; border:1.5px solid rgba(212,160,23,0.35); border-radius:var(--radius-2xl); box-shadow:0 25px 70px rgba(0,0,0,0.85); padding:var(--space-6);">
        <div class="modal-header" style="border-bottom:1px solid rgba(212,160,23,0.2); padding-bottom:var(--space-4); margin-bottom:var(--space-5);">
          <div>
            <span style="font-size:11px; color:var(--gold-400); font-weight:700; text-transform:uppercase; letter-spacing:1px;">Order Information & Invoice</span>
            <h3 style="margin:2px 0 0; color:#FFF8E7; font-size:var(--text-xl);">Order Summary</h3>
          </div>
          <button class="modal-close" onclick="window.closeOrderDetailModal()" style="font-size:22px; color:var(--cream-200); background:rgba(255,255,255,0.08); border:1px solid rgba(212,160,23,0.3); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer;">${ICONS.x}</button>
        </div>
        <div id="orderDetailContent" style="padding:0;"></div>
      </div>
    </div>
  `;
}

export function initAdminOrderHandlers() {
  window.closeOrderDetailModal = function() {
    document.getElementById('orderDetailModal')?.classList.remove('active');
  };

  const oModal = document.getElementById('orderDetailModal');
  if (oModal) {
    oModal.onclick = function(e) {
      if (e.target === oModal) window.closeOrderDetailModal();
    };
  }

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
      const invNo = order.invoiceNo || `VF/260921/${order.id.slice(-5)}`;
      content.innerHTML = `
        <div style="background:rgba(18,40,29,0.7); border:1px solid rgba(212,160,23,0.25); border-radius:var(--radius-xl); padding:var(--space-4); margin-bottom:var(--space-5);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:var(--space-2);">
            <span style="color:var(--cream-400); font-size:var(--text-xs);">Order Reference</span>
            <strong style="font-family:var(--font-mono, monospace); color:#FFF8E7;">${order.id}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:var(--space-2);">
            <span style="color:var(--cream-400); font-size:var(--text-xs);">Official Invoice No</span>
            <strong style="color:var(--gold-400); font-family:var(--font-mono, monospace);">${invNo}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:var(--space-2);">
            <span style="color:var(--cream-400); font-size:var(--text-xs);">Customer Name</span>
            <strong style="color:#FFF8E7;">${order.customer.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:var(--space-2);">
            <span style="color:var(--cream-400); font-size:var(--text-xs);">Contact Phone</span>
            <span style="color:var(--cream-200);">${order.customer.phone}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <span style="color:var(--cream-400); font-size:var(--text-xs);">Delivery Address</span>
            <span style="text-align:right; max-width:280px; color:var(--cream-200); font-size:var(--text-xs); line-height:1.5;">${order.customer.address}</span>
          </div>
        </div>
        
        <!-- E-Bill Download & Preview Banner -->
        <div style="background:rgba(212,160,23,0.12); border:1px solid rgba(212,160,23,0.35); border-radius:var(--radius-xl); padding:var(--space-4); margin-bottom:var(--space-5);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-size:11px; font-weight:800; color:var(--gold-400); letter-spacing:0.5px;">OFFICIAL TAX INVOICE (E-BILL)</div>
              <div style="font-size:var(--text-xs); color:var(--cream-300);">Exact format matching bill.pdf with VedicFueloon branding</div>
            </div>
            <span class="badge" style="background:rgba(39,174,96,0.18); color:#2ecc71; padding:4px 10px; border-radius:999px; font-size:11px; font-weight:700;">
              ✓ Synchronized
            </span>
          </div>

          <div style="display:flex; gap:var(--space-3); flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm btn-ripple" onclick="window.downloadEBill('${order.id}')" style="display:inline-flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF
            </button>
            <button class="btn btn-outline btn-sm btn-ripple" onclick="window.previewEBill('${order.id}')" style="display:inline-flex; align-items:center; gap:6px;">
              ${ICONS.eye} Preview Bill
            </button>
            <button class="btn btn-ghost btn-sm btn-ripple" onclick="window.printEBillDirect('${order.id}')" style="display:inline-flex; align-items:center; gap:6px; color:var(--cream-200);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print
            </button>
          </div>
        </div>

        <h4 style="margin:var(--space-4) 0 var(--space-3); color:#FFF8E7; font-size:var(--text-sm);">Ordered Products</h4>
        <div style="max-height:160px; overflow-y:auto; margin-bottom:var(--space-4);">
          ${order.items.map(item => `
            <div style="display:flex; justify-content:space-between; padding:var(--space-2) 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:var(--text-xs);">
              <span style="color:var(--cream-200);">${item.name} × ${item.qty}</span>
              <strong style="color:var(--gold-400);">${formatPrice(item.price * item.qty)}</strong>
            </div>
          `).join('')}
        </div>
        
        <div style="background:rgba(0,0,0,0.25); border-radius:var(--radius-lg); padding:var(--space-3) var(--space-4); margin-bottom:var(--space-4);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2); font-size:var(--text-xs); color:var(--cream-400);">
            <span>Subtotal</span><span>${formatPrice(order.subtotal)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2); font-size:var(--text-xs); color:var(--cream-400);">
            <span>Delivery</span><span>${order.delivery === 0 ? '<span style="color:#2ecc71;">FREE</span>' : formatPrice(order.delivery)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-base); font-weight:800; color:var(--gold-400); border-top:1px solid rgba(255,255,255,0.1); padding-top:var(--space-2);">
            <span>Total Payable</span><span>${formatPrice(order.total)}</span>
          </div>
        </div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:var(--text-xs); color:var(--cream-500);">
          <span>Placed: ${formatDate(order.createdAt)}</span>
          <span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span>
        </div>
      `;
    }

    const modal = document.getElementById('orderDetailModal');
    if (modal) {
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      modal.onclick = function(e) {
        if (e.target === modal) window.closeOrderDetailModal();
      };
      modal.classList.add('active');
    }
  };
}


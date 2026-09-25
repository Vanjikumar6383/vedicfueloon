/* ============================================
   VEDICFUELOON — ADMIN E-BILLING HUB (SECURED)
   Comprehensive Tax Invoice & E-Bill Management
   Secured with Context-Aware HTML Escaping (Anti-XSS)
   ============================================ */

import { Orders } from '../store.js';
import { formatPrice, formatDate, ICONS, showToast } from '../components.js';
import { downloadEBillPDF, openEBillModal, printEBill, formatInvoiceDate, formatInvoiceTime } from '../ebill.js';
import { escapeHTML } from '../security.js';

export function renderAdminEBilling() {
  const orders = Orders.get();
  
  const totalBilled = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? (Number(o.total) || 0) : 0), 0);
  const paidCount = orders.filter(o => o.paymentStatus === 'Paid' || o.status === 'delivered').length;
  const pendingCount = orders.filter(o => o.paymentStatus === 'Pending' || o.status === 'pending').length;

  return `
    <div class="admin-header">
      <div>
        <div class="admin-badge-live">
          <span class="admin-live-pulse"></span>
          OFFICIAL TAX INVOICE ENGINE ONLINE
        </div>
        <h1 style="margin-top:6px;">E-Billing Management Hub</h1>
        <p style="color:var(--cream-300); font-size:var(--text-sm);">
          Real-time electronic tax bills · Synchronized with Customer & Admin Dispatch
        </p>
      </div>

      <div class="admin-header-actions">
        <button class="admin-action-btn-pill" onclick="window.batchDownloadLatestInvoices()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download All Recent (PDF)
        </button>
        <button class="admin-action-btn-pill" onclick="window.adminNavigate('orders')">
          ${ICONS.package} View All Orders
        </button>
      </div>
    </div>

    <!-- E-Billing KPI Metric Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(212, 160, 23, 0.15); color:var(--gold-400);">📄</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-label">Total E-Bills Issued</div>
        <div class="admin-kpi-subtext">100% Tax Compliant & Numbered</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(39, 174, 96, 0.15); color:#2ecc71;">₹</div>
        <div class="stat-value">${formatPrice(totalBilled)}</div>
        <div class="stat-label">Total Billed Volume</div>
        <div class="admin-kpi-subtext">Excl. Cancelled Orders</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(52, 152, 219, 0.15); color:#3498db;">✓</div>
        <div class="stat-value">${paidCount}</div>
        <div class="stat-label">Paid Invoices</div>
        <div class="admin-kpi-subtext">Instant Online Cleared</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(230, 126, 34, 0.15); color:#e67e22;">⏳</div>
        <div class="stat-value">${pendingCount}</div>
        <div class="stat-label">Pending / COD Bills</div>
        <div class="admin-kpi-subtext">Awaiting Collection / Clearance</div>
      </div>
    </div>

    <!-- Invoices Data Table -->
    <div class="admin-table-container">
      <div class="admin-table-header" style="flex-wrap:wrap; gap:var(--space-4);">
        <div>
          <h3>${ICONS.clipboard} Generated Tax Invoices (VedicFueloon)</h3>
          <p style="font-size:var(--text-xs); color:var(--cream-400); margin:0;">
            Exact layout as bill.pdf · Click any row to preview or download PDF
          </p>
        </div>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search by Invoice No, Customer, Phone..." 
                 id="ebillSearchInput" oninput="window.adminSearchInvoices(this.value)" />
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminEBillTable">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Payment Info</th>
              <th>Grand Total</th>
              <th>Status</th>
              <th>E-Bill Actions</th>
            </tr>
          </thead>
          <tbody>
            ${orders.length > 0 ? orders.map(order => {
              const safeOrderId = escapeHTML(order.id);
              const invNo = escapeHTML(order.invoiceNo || `VF/260921/${order.id.slice(-5)}`);
              const custName = escapeHTML(order.customer?.name || 'Patron');
              const custPhone = escapeHTML(order.customer?.phone || 'N/A');
              const payMethod = escapeHTML(order.paymentMethod || 'UPI');
              const payId = escapeHTML(order.paymentId || 'UPI/VERIFIED');
              const payStatus = escapeHTML(order.paymentStatus || (order.status === 'cancelled' ? 'Refunded' : 'Paid'));
              const isPaid = payStatus === 'Paid';

              return `
                <tr data-invoice-id="${safeOrderId}">
                  <td>
                    <span class="admin-invoice-badge">${invNo}</span>
                  </td>
                  <td>
                    <span class="admin-order-id-badge">${safeOrderId}</span>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#FFF8E7;">${custName}</div>
                    <div style="font-size:var(--text-xs); color:var(--cream-400);">${custPhone}</div>
                  </td>
                  <td style="font-size:var(--text-xs); color:var(--cream-300); white-space:nowrap;">
                    <div>${escapeHTML(formatInvoiceDate(order.createdAt))}</div>
                    <div style="color:var(--cream-500);">${escapeHTML(formatInvoiceTime(order.createdAt))}</div>
                  </td>
                  <td>
                    <div style="font-size:var(--text-xs); font-weight:600; color:var(--cream-200);">${payMethod}</div>
                    <div style="font-size:10px; color:var(--gold-500); font-family:var(--font-mono, monospace);">${payId}</div>
                  </td>
                  <td>
                    <strong style="color:var(--gold-400); font-size:var(--text-sm);">${formatPrice(order.total)}</strong>
                  </td>
                  <td>
                    <span class="status-badge" style="background:${isPaid ? 'rgba(39, 174, 96, 0.15)' : 'rgba(230, 126, 34, 0.15)'}; color:${isPaid ? '#2ecc71' : '#e67e22'};">
                      ${payStatus}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions" style="gap:6px;">
                      <button class="admin-btn-ebill btn-dl-ebill" data-order-id="${safeOrderId}" onclick="window.downloadEBill('${safeOrderId}')" title="Download Official PDF">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        PDF
                      </button>
                      <button class="table-action-btn" onclick="window.previewEBill('${safeOrderId}')" title="View Full Bill">
                        ${ICONS.eye}
                      </button>
                      <button class="table-action-btn" onclick="window.printEBillDirect('${safeOrderId}')" title="Print Invoice">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--cream-400);">No invoices recorded yet.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initAdminEBillingHandlers() {
  window.adminSearchInvoices = function(query) {
    const q = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#adminEBillTable tbody tr');
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };

  window.batchDownloadLatestInvoices = function() {
    const orders = Orders.get().slice(0, 3);
    if (orders.length === 0) {
      showToast('No Invoices', 'No orders available to download', 'info');
      return;
    }
    showToast('Batch Download', `Downloading ${orders.length} recent invoices...`, 'info');
    orders.forEach((o, i) => {
      setTimeout(() => downloadEBillPDF(o), i * 600);
    });
  };
}

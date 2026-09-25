/* ============================================
   VEDICFUELOON — ADMIN DASHBOARD (SECURED)
   Stats, Revenue Chart, Recent Orders
   Secured with Context-Aware HTML Escaping (Anti-XSS)
   ============================================ */

import { Orders, Customers, DailySpecialStore, ProductsStore } from '../store.js';
import { PRODUCTS, getDailySpecialProduct } from '../data.js';
import { formatPrice, formatDate, ICONS, showToast } from '../components.js';
import { escapeHTML } from '../security.js';

export function renderAdminDashboard() {
  const orders = Orders.get();
  const customers = Customers.get();
  const totalRevenue = Orders.getTotalRevenue();
  const recentOrders = Orders.getRecentOrders(5);
  const products = (ProductsStore && ProductsStore.get) ? ProductsStore.get() : PRODUCTS;
  const currentSpecialId = DailySpecialStore.getId();
  const currentSpecial = products.find(p => p.id === currentSpecialId) || getDailySpecialProduct() || products[0];
  
  // Revenue by day (last 7 days)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStr = date.toLocaleDateString('en-IN', { weekday: 'short' });
    const dayOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return orderDate.toDateString() === date.toDateString() && o.status !== 'cancelled';
    });
    const dayRevenue = dayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    last7Days.push({ day: dayStr, revenue: dayRevenue });
  }
  const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 1);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return `
    <div class="admin-header">
      <div>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap;">
          <div class="admin-badge-live">
            <span class="admin-live-pulse"></span>
            KITCHEN & DISPATCH ENGINE ONLINE
          </div>
          <span style="font-size:11px; color:var(--cream-400); background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:999px; border:1px solid rgba(255,255,255,0.1);">
            🕒 ${dateStr} · ${timeStr}
          </span>
        </div>
        <h1>Command Center</h1>
        <p style="color:var(--cream-300); font-size:var(--text-sm);">
          VedicFueloon · Traditional Tamil Health Food Control Desk
        </p>
      </div>

      <div class="admin-header-actions">
        <button class="admin-action-btn-pill" onclick="window.adminNavigate('ebilling')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          E-Billing Hub
        </button>
        <button class="admin-action-btn-pill" onclick="window.adminNavigate('orders')">
          ${ICONS.package} Live Orders
        </button>
        <button class="admin-action-btn-pill" onclick="window.clearAllStoreData()" title="Reset tables to 0 rows for fresh future data" style="color:#e74c3c; border-color:rgba(231,76,60,0.4);">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Empty Tables
        </button>
        <div class="admin-user" style="margin-left:8px;">
          <div style="text-align:right;">
            <div style="font-weight:700; color:var(--cream-50);">Master Admin</div>
            <div style="font-size:var(--text-xs); color:var(--gold-400);">VedicFueloon HQ</div>
          </div>
          <div class="admin-avatar">VF</div>
        </div>
      </div>
    </div>

    <!-- Enhanced Executive Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(212,160,23,0.15); color:var(--gold-400);">${ICONS.currency}</div>
        <div class="stat-value">${formatPrice(totalRevenue)}</div>
        <div class="stat-label">Gross Store Revenue</div>
        <span class="stat-change positive">↑ 14.8% this week</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(39,174,96,0.15); color:#2ecc71;">${ICONS.package}</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-label">Total Transactions</div>
        <div class="admin-kpi-subtext">
          <span style="color:#2ecc71;">${orders.filter(o => o.status === 'delivered').length} Delivered</span> · 
          <span style="color:var(--gold-400);">${pendingOrders} Pending</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(52,152,219,0.15); color:#3498db;">📄</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-label">Official E-Bills Issued</div>
        <span class="stat-change positive" style="background:rgba(39,174,96,0.15); color:#2ecc71;">100% Tax Compliant</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(155,89,182,0.15); color:#9b59b6;">${ICONS.users}</div>
        <div class="stat-value">${customers.length}</div>
        <div class="stat-label">Patron Directory</div>
        <div class="admin-kpi-subtext">
          Tamil Nadu Network
        </div>
      </div>
    </div>

    <!-- 🌟 DAILY SPECIAL MANAGEMENT CARD -->
    <div class="daily-special-admin-card" id="adminDailySpecialCard">
      <div class="special-admin-header">
        <div class="special-admin-header-left">
          <div class="special-sparkle-icon">${ICONS.sparkle}</div>
          <div class="special-admin-header-text">
            <h3 class="special-admin-title">Daily Special Manager · இன்றைய சிறப்பு கஞ்சி</h3>
            <p class="special-admin-desc">Choose the featured Daily Special item — instantly updates across user store & home page</p>
          </div>
        </div>
        <div class="special-admin-header-right">
          <span class="live-pill-badge" id="specialLiveBadge">
            <span class="pulse-dot-green"></span>
            LIVE ON CUSTOMER SCREEN
          </span>
        </div>
      </div>

      <div class="special-admin-grid">
        <!-- Current Active Live Preview -->
        <div class="special-preview-box" id="adminSpecialPreviewBox">
          <div class="special-preview-media">
            <img src="${escapeHTML(currentSpecial.image || '')}" alt="${escapeHTML(currentSpecial.name || '')}" id="adminSpecialImg" />
            <span class="special-preview-price" id="adminSpecialPrice">₹${Number(currentSpecial.price) || 0}</span>
          </div>
          <div class="special-preview-details">
            <span class="special-badge-tag">${ICONS.pot} Active Special</span>
            <h4 id="adminSpecialTitle">${escapeHTML(currentSpecial.name || '')}</h4>
            <div class="tamil-text" id="adminSpecialTamil" style="color:var(--gold-400); font-size:var(--text-sm); font-weight:600;">${escapeHTML(currentSpecial.tamilName || '')}</div>
            <p id="adminSpecialDesc" style="font-size:var(--text-xs); color:var(--cream-300); margin: var(--space-2) 0; line-height:1.5;">${escapeHTML(currentSpecial.description ? currentSpecial.description.substring(0, 110) + '...' : '')}</p>
            <div class="special-preview-meta">
              <span>Stock: <strong id="adminSpecialStock" style="color:var(--gold-400);">${currentSpecial.stock !== undefined ? parseInt(currentSpecial.stock, 10) : 50} left</strong></span>
              <span>Rating: <strong id="adminSpecialRating" style="color:var(--gold-400);">⭐ ${escapeHTML(String(currentSpecial.rating || '4.9'))} (${parseInt(currentSpecial.reviews, 10) || 100})</strong></span>
            </div>
          </div>
        </div>

        <!-- Interactive Selector Controls -->
        <div class="special-controls-box">
          <label class="form-label special-controls-label" for="adminDailySpecialSelect">
            Select Daily Special from Catalog:
          </label>
          <div class="special-select-action-row">
            <select id="adminDailySpecialSelect" class="form-select special-dropdown" onchange="window.previewDailySpecial(this.value)">
              ${products.map(p => `
                <option value="${p.id}" ${p.id === currentSpecialId ? 'selected' : ''}>
                  ${escapeHTML(p.name)} (${escapeHTML(p.tamilName)}) — ₹${Number(p.price) || 0}
                </option>
              `).join('')}
            </select>
            <button type="button" class="btn btn-primary btn-ripple special-apply-btn" onclick="window.saveDailySpecial()">
              ${ICONS.check} <span class="btn-text">Set As Daily Special</span>
            </button>
          </div>

          <div class="special-quick-select-wrap">
            <div class="special-quick-label">
              ⚡ Quick Select Popular Kanji:
            </div>
            <div class="quick-pick-pills" id="specialQuickPills">
              ${[1, 2, 3, 10, 15, 20, 23].map(id => {
                const p = products.find(prod => prod.id === id);
                if (!p) return '';
                const isSelected = p.id === currentSpecialId;
                return `
                  <button type="button" class="quick-pick-pill ${isSelected ? 'active' : ''}" 
                          data-product-id="${p.id}"
                          onclick="window.quickSelectDailySpecial(${p.id})">
                    <span>${escapeHTML(p.name)}</span>
                    <span class="pill-price">₹${Number(p.price) || 0}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Revenue Chart -->
      <div class="chart-container">
        <div class="chart-header">
          <div>
            <h3 style="margin:0;">${ICONS.barChart} Revenue Trend</h3>
            <span style="font-size:var(--text-xs); color:var(--gold-400);">Daily E-Commerce Volume (Last 7 Days)</span>
          </div>
          <button class="btn btn-sm btn-ghost" onclick="window.adminNavigate('ebilling')">View Invoices →</button>
        </div>
        <div class="bar-chart">
          ${last7Days.map(d => `
            <div class="bar">
              <div class="bar-value">${d.revenue > 0 ? '₹' + d.revenue : '-'}</div>
              <div class="bar-fill admin-chart-bar" style="height: ${Math.max(6, (d.revenue / maxRevenue) * 160)}px;"></div>
              <div class="bar-label">${escapeHTML(d.day)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Stats & Alerts -->
      <div>
        <!-- Pending Orders Alert -->
        ${pendingOrders > 0 ? `
        <div style="background: rgba(230, 126, 34, 0.15); border: 1px solid rgba(230, 126, 34, 0.4); border-radius: var(--radius-xl); padding: var(--space-4) var(--space-5); margin-bottom: var(--space-4);">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:var(--space-3);">
              <span style="font-size:var(--text-xl); color:#e67e22;">${ICONS.hourglass}</span>
              <div>
                <div style="font-weight:700; color:#FFF8E7; font-size:var(--text-sm);">${pendingOrders} Orders Awaiting Preparation</div>
                <div style="font-size:var(--text-xs); color:var(--cream-300);">Clay pots heating up for sunrise delivery</div>
              </div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="window.adminNavigate('orders')">Fulfill</button>
          </div>
        </div>
        ` : ''}

        <!-- Low Stock Alert -->
        <div class="chart-container">
          <div class="chart-header">
            <h3>${ICONS.lightning} Low Stock Alert</h3>
            <span style="font-size:var(--text-xs); color:var(--cream-400);">Clay Pot Ready</span>
          </div>
          ${PRODUCTS.filter(p => p.stock < 25).slice(0, 4).map(p => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-2) 0; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div>
                <div style="font-weight:600; font-size:var(--text-xs); color:#FFF8E7;">${escapeHTML(p.name)}</div>
                <div class="tamil-text" style="font-size:11px; color:var(--gold-400);">${escapeHTML(p.tamilName)}</div>
              </div>
              <span class="status-badge ${p.stock < 15 ? 'status-outstock' : 'status-lowstock'}" style="font-size:10px;">${p.stock} left</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Recent Orders & E-Billing Stream -->
    <div class="admin-table-container" style="margin-top: var(--space-8);">
      <div class="admin-table-header" style="flex-wrap:wrap; gap:var(--space-3);">
        <div>
          <h3 style="margin:0;">${ICONS.clipboard} Recent Orders & Instant E-Bills</h3>
          <p style="margin:0; font-size:var(--text-xs); color:var(--cream-400);">Download or preview official tax invoices matching bill.pdf format</p>
        </div>
        <div style="display:flex; gap:var(--space-2);">
          <button class="admin-action-btn-pill" onclick="window.adminNavigate('ebilling')">E-Billing Center →</button>
          <button class="btn btn-sm btn-outline" onclick="window.adminNavigate('orders')">All Orders →</button>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order & Invoice</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>E-Bill Action</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders.length > 0 ? recentOrders.map(order => {
              const safeOrderId = escapeHTML(order.id);
              const invNo = escapeHTML(order.invoiceNo || `VF/260921/${order.id.slice(-5)}`);
              const custName = escapeHTML(order.customer?.name || 'Patron');
              const custPhone = escapeHTML(order.customer?.phone || 'N/A');
              const safeStatus = escapeHTML((order.status || 'pending').toLowerCase());
              const itemsCount = Array.isArray(order.items) ? order.items.length : 0;

              return `
                <tr>
                  <td>
                    <span class="admin-order-id-badge">${safeOrderId}</span>
                    <span class="admin-invoice-badge">${invNo}</span>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#FFF8E7;">${custName}</div>
                    <div style="font-size:11px; color:var(--cream-400);">${custPhone}</div>
                  </td>
                  <td style="font-size:var(--text-xs); color:var(--cream-200);">${itemsCount} item${itemsCount > 1 ? 's' : ''}</td>
                  <td><strong style="color:var(--gold-400); font-size:var(--text-sm);">${formatPrice(order.total)}</strong></td>
                  <td><span class="status-badge status-${safeStatus}">${safeStatus.toUpperCase()}</span></td>
                  <td>
                    <div class="table-actions" style="gap:6px;">
                      <button class="admin-btn-ebill" onclick="window.downloadEBill('${safeOrderId}')" title="Download E-Bill (PDF)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        PDF
                      </button>
                      <button class="table-action-btn" onclick="window.previewEBill('${safeOrderId}')" title="Preview E-Bill">
                        ${ICONS.eye}
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr><td colspan="6" style="text-align:center; padding:var(--space-8); color:var(--cream-400);">No orders yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Daily Special Admin Actions ──
function updateSpecialPreviewUI(p, isSaved = false) {
  if (!p) return;
  const img = document.getElementById('adminSpecialImg');
  const title = document.getElementById('adminSpecialTitle');
  const tamil = document.getElementById('adminSpecialTamil');
  const desc = document.getElementById('adminSpecialDesc');
  const price = document.getElementById('adminSpecialPrice');
  const stock = document.getElementById('adminSpecialStock');
  const rating = document.getElementById('adminSpecialRating');
  const previewBox = document.getElementById('adminSpecialPreviewBox');
  const sel = document.getElementById('adminDailySpecialSelect');

  if (img) img.src = p.image || '';
  if (title) title.textContent = p.name || '';
  if (tamil) tamil.textContent = p.tamilName || '';
  if (desc) desc.textContent = p.description ? p.description.substring(0, 110) + '...' : '';
  if (price) price.textContent = `₹${p.price || 0}`;
  if (stock) stock.textContent = `${p.stock !== undefined ? p.stock : 50} left`;
  if (rating) rating.textContent = `⭐ ${p.rating || '4.9'} (${p.reviews || 100})`;
  if (sel && parseInt(sel.value, 10) !== p.id) sel.value = p.id;

  if (previewBox) {
    previewBox.classList.remove('special-pulse-update');
    void previewBox.offsetWidth; // trigger reflow
    previewBox.classList.add('special-pulse-update');
  }

  // Update pills and badge if saved
  if (isSaved) {
    document.querySelectorAll('#specialQuickPills .quick-pick-pill').forEach(btn => {
      const pid = parseInt(btn.dataset.productId, 10);
      if (pid === p.id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const liveBadge = document.getElementById('specialLiveBadge');
    if (liveBadge) {
      liveBadge.classList.add('badge-highlight');
      setTimeout(() => liveBadge.classList.remove('badge-highlight'), 1200);
    }
  }
}

window.previewDailySpecial = function(productId) {
  const products = (ProductsStore && ProductsStore.get) ? ProductsStore.get() : PRODUCTS;
  const p = products.find(prod => prod.id === parseInt(productId, 10));
  if (!p) return;
  updateSpecialPreviewUI(p, false);
};

window.saveDailySpecial = function() {
  const sel = document.getElementById('adminDailySpecialSelect');
  if (!sel) return;
  const id = parseInt(sel.value, 10);
  DailySpecialStore.setId(id);
  const products = (ProductsStore && ProductsStore.get) ? ProductsStore.get() : PRODUCTS;
  const p = products.find(prod => prod.id === id);
  updateSpecialPreviewUI(p, true);
  showToast('🌟 Daily Special Updated!', `${p ? escapeHTML(p.name) : 'Item'} is now live on customer screen & home page!`, 'success');
};

window.quickSelectDailySpecial = function(productId) {
  const id = parseInt(productId, 10);
  DailySpecialStore.setId(id);
  const products = (ProductsStore && ProductsStore.get) ? ProductsStore.get() : PRODUCTS;
  const p = products.find(prod => prod.id === id);
  updateSpecialPreviewUI(p, true);
  showToast('🌟 Daily Special Set!', `${p ? escapeHTML(p.name) : 'Item'} is now active as today's Daily Special!`, 'success');
};

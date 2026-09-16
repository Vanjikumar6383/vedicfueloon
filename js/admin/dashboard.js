/* ============================================
   VEDICFUELOON — ADMIN DASHBOARD
   Stats, Revenue Chart, Recent Orders
   ============================================ */

import { Orders, Customers, DailySpecialStore } from '../store.js';
import { PRODUCTS, getDailySpecialProduct } from '../data.js';
import { formatPrice, formatDate, ICONS, showToast } from '../components.js';

export function renderAdminDashboard() {
  const orders = Orders.get();
  const customers = Customers.get();
  const totalRevenue = Orders.getTotalRevenue();
  const recentOrders = Orders.getRecentOrders(5);
  const currentSpecial = getDailySpecialProduct();
  const currentSpecialId = DailySpecialStore.getId();
  
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
    const dayRevenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
    last7Days.push({ day: dayStr, revenue: dayRevenue });
  }
  const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 1);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;

  return `
    <div class="admin-header">
      <div>
        <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(39, 174, 96, 0.15); border:1px solid rgba(39, 174, 96, 0.35); padding:4px 12px; border-radius:9999px; font-size:var(--text-xs); color:#2ecc71; margin-bottom:8px;">
          <span style="width:7px; height:7px; border-radius:50%; background:#2ecc71; box-shadow:0 0 8px #2ecc71; animation:pulse 2s infinite;"></span>
          LIVE STORE SYSTEM ONLINE
        </div>
        <h1>Executive Dashboard</h1>
        <p style="color:var(--cream-300); font-size:var(--text-sm);">Tamil Heritage Health Foods · Store Control Panel</p>
      </div>
      <div class="admin-user">
        <div style="text-align:right;">
          <div style="font-weight:700; color:var(--cream-50);">Master Admin</div>
          <div style="font-size:var(--text-xs); color:var(--gold-400);">VedicFueloon Headquarters</div>
        </div>
        <div class="admin-avatar">VF</div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">${ICONS.currency}</div>
        <div class="stat-value">${formatPrice(totalRevenue)}</div>
        <div class="stat-label">Total Revenue</div>
        <span class="stat-change positive">↑ 12.5%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${ICONS.package}</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-label">Total Orders</div>
        <span class="stat-change positive">↑ 8.3%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${ICONS.users}</div>
        <div class="stat-value">${customers.length}</div>
        <div class="stat-label">Customers</div>
        <span class="stat-change positive">↑ 5.1%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${ICONS.bowl}</div>
        <div class="stat-value">${PRODUCTS.length}</div>
        <div class="stat-label">Products</div>
        <span class="stat-change positive">Active</span>
      </div>
    </div>

    <!-- 🌟 DAILY SPECIAL MANAGEMENT CARD -->
    <div class="daily-special-admin-card">
      <div class="special-admin-header">
        <div style="display:flex; align-items:center; gap:var(--space-3);">
          <div class="special-sparkle-icon">${ICONS.sparkle}</div>
          <div>
            <h3 style="margin:0; font-size:var(--text-lg); font-weight:700; color:var(--gold-400);">Daily Special Manager · இன்றைய சிறப்பு கஞ்சி</h3>
            <p style="margin:0; font-size:var(--text-xs); color:var(--cream-300);">Choose the featured Daily Special item — instantly updates across the user store & home page</p>
          </div>
        </div>
        <span class="live-pill-badge">
          <span class="pulse-dot-green"></span>
          LIVE ON CUSTOMER SCREEN
        </span>
      </div>

      <div class="special-admin-grid">
        <!-- Current Active Live Preview -->
        <div class="special-preview-box">
          <div class="special-preview-media">
            <img src="${currentSpecial.image}" alt="${currentSpecial.name}" id="adminSpecialImg" />
            <span class="special-preview-price">₹${currentSpecial.price}</span>
          </div>
          <div class="special-preview-details">
            <span class="special-badge-tag">${ICONS.pot} Active Special</span>
            <h4 id="adminSpecialTitle">${currentSpecial.name}</h4>
            <div class="tamil-text" id="adminSpecialTamil" style="color:var(--gold-400); font-size:var(--text-sm); font-weight:600;">${currentSpecial.tamilName}</div>
            <p id="adminSpecialDesc" style="font-size:var(--text-xs); color:var(--cream-300); margin: var(--space-2) 0; line-height:1.5;">${currentSpecial.description.substring(0, 110)}...</p>
            <div style="display:flex; gap:var(--space-4); font-size:var(--text-xs); color:var(--cream-400); margin-top:8px;">
              <span>Stock: <strong style="color:var(--gold-400);">${currentSpecial.stock} left</strong></span>
              <span>Rating: <strong style="color:var(--gold-400);">⭐ ${currentSpecial.rating} (${currentSpecial.reviews})</strong></span>
            </div>
          </div>
        </div>

        <!-- Interactive Selector Controls -->
        <div class="special-controls-box">
          <label class="form-label" style="color:var(--cream-100); font-weight:600; margin-bottom:var(--space-2); display:block;">
            Select Daily Special from Catalog:
          </label>
          <div style="display:flex; gap:var(--space-3); margin-bottom:var(--space-4); flex-wrap:wrap;">
            <select id="adminDailySpecialSelect" class="form-select special-dropdown" onchange="window.previewDailySpecial(this.value)">
              ${PRODUCTS.map(p => `
                <option value="${p.id}" ${p.id === currentSpecialId ? 'selected' : ''}>
                  ${p.name} (${p.tamilName}) — ₹${p.price}
                </option>
              `).join('')}
            </select>
            <button class="btn btn-primary btn-ripple" onclick="window.saveDailySpecial()" style="white-space:nowrap;">
              ${ICONS.check} Set As Daily Special
            </button>
          </div>

          <div style="margin-top:var(--space-3);">
            <div style="font-size:var(--text-xs); color:var(--gold-400); margin-bottom:var(--space-2); text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">
              ⚡ Quick Select Popular Kanji:
            </div>
            <div class="quick-pick-pills">
              ${[1, 2, 3, 10, 15, 20, 23].map(id => {
                const p = PRODUCTS.find(prod => prod.id === id);
                if (!p) return '';
                const isSelected = p.id === currentSpecialId;
                return `
                  <button class="quick-pick-pill ${isSelected ? 'active' : ''}" 
                          onclick="window.quickSelectDailySpecial(${p.id})">
                    <span>${p.name}</span>
                    <span class="pill-price">₹${p.price}</span>
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
          <h3>${ICONS.barChart} Revenue Overview</h3>
          <span style="font-size:var(--text-sm); color:var(--neutral-500);">Last 7 days</span>
        </div>
        <div class="bar-chart">
          ${last7Days.map(d => `
            <div class="bar">
              <div class="bar-value">${d.revenue > 0 ? formatPrice(d.revenue) : '-'}</div>
              <div class="bar-fill" style="height: ${Math.max(4, (d.revenue / maxRevenue) * 160)}px;"></div>
              <div class="bar-label">${d.day}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Stats -->
      <div>
        <!-- Pending Orders Alert -->
        ${pendingOrders > 0 ? `
        <div style="background: var(--warning-light); border: 1px solid var(--warning); border-radius: var(--radius-xl); padding: var(--space-5); margin-bottom: var(--space-6);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span style="font-size:var(--text-2xl); color:var(--warning);">${ICONS.alert}</span>
            <div>
              <div style="font-weight:700; color:var(--neutral-900);">${pendingOrders} Pending Order${pendingOrders > 1 ? 's' : ''}</div>
              <div style="font-size:var(--text-sm); color:var(--neutral-600);">Needs your attention</div>
            </div>
          </div>
        </div>
        ` : ''}
        
        ${processingOrders > 0 ? `
        <div style="background: var(--info-light); border: 1px solid var(--info); border-radius: var(--radius-xl); padding: var(--space-5); margin-bottom: var(--space-6);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span style="font-size:var(--text-2xl); color:var(--primary-600);">${ICONS.package}</span>
            <div>
              <div style="font-weight:700; color:var(--neutral-900);">${processingOrders} Processing</div>
              <div style="font-size:var(--text-sm); color:var(--neutral-600);">Being prepared</div>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Low Stock Alert -->
        <div class="chart-container">
          <div class="chart-header">
            <h3>${ICONS.lightning} Low Stock Items</h3>
          </div>
          ${PRODUCTS.filter(p => p.stock < 25).slice(0, 5).map(p => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) 0; border-bottom:1px solid var(--cream-100);">
              <div>
                <div style="font-weight:600; font-size:var(--text-sm);">${p.name}</div>
                <div class="tamil-text" style="font-size:var(--text-xs); color:var(--orange-500);">${p.tamilName}</div>
              </div>
              <span class="status-badge ${p.stock < 15 ? 'status-outstock' : 'status-lowstock'}">${p.stock} left</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="admin-table-container" style="margin-top: var(--space-8);">
      <div class="admin-table-header">
        <h3>${ICONS.clipboard} Recent Orders</h3>
        <button class="btn btn-sm btn-outline" onclick="window.adminNavigate('orders')">View All →</button>
      </div>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${recentOrders.length > 0 ? recentOrders.map(order => `
            <tr>
              <td><strong>${order.id}</strong></td>
              <td>${order.customer.name}</td>
              <td>${order.items.length} item${order.items.length > 1 ? 's' : ''}</td>
              <td><strong>${formatPrice(order.total)}</strong></td>
              <td><span class="status-badge status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
              <td style="font-size:var(--text-xs); color:var(--neutral-500);">${formatDate(order.createdAt)}</td>
            </tr>
          `).join('') : `
            <tr><td colspan="6" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No orders yet</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;
}

// ── Daily Special Admin Actions ──
window.previewDailySpecial = function(productId) {
  const p = PRODUCTS.find(prod => prod.id === parseInt(productId));
  if (!p) return;
  const img = document.getElementById('adminSpecialImg');
  const title = document.getElementById('adminSpecialTitle');
  const tamil = document.getElementById('adminSpecialTamil');
  const desc = document.getElementById('adminSpecialDesc');
  if (img) img.src = p.image;
  if (title) title.textContent = p.name;
  if (tamil) tamil.textContent = p.tamilName;
  if (desc) desc.textContent = p.description.substring(0, 110) + '...';
};

window.saveDailySpecial = function() {
  const sel = document.getElementById('adminDailySpecialSelect');
  if (!sel) return;
  const id = parseInt(sel.value);
  DailySpecialStore.setId(id);
  const p = PRODUCTS.find(prod => prod.id === id);
  showToast('🌟 Daily Special Updated!', `${p ? p.name : 'Item'} is now live for all users on the store!`, 'success');
  window.adminNavigate('dashboard');
};

window.quickSelectDailySpecial = function(productId) {
  const id = parseInt(productId);
  DailySpecialStore.setId(id);
  const p = PRODUCTS.find(prod => prod.id === id);
  showToast('🌟 Daily Special Set!', `${p ? p.name : 'Item'} is now active as today's Daily Special!`, 'success');
  window.adminNavigate('dashboard');
};


/* ============================================
   VEDICFUELOON — ADMIN PRODUCTS & STOCK MANAGEMENT (SECURED)
   Product CRUD, Real-Time Stock Editing, Daily Special
   Secured with Context-Aware HTML Escaping & Input Sanitization
   ============================================ */

import { ProductsStore, DailySpecialStore } from '../store.js';
import { showToast, formatPrice, ICONS } from '../components.js';
import { escapeHTML, sanitizeText } from '../security.js';

export function getAdminProducts() {
  return ProductsStore.get();
}

export function renderAdminProducts() {
  const productsList = ProductsStore.get();
  const currentSpecialId = DailySpecialStore.getId();
  
  const totalStock = productsList.reduce((sum, p) => sum + (parseInt(p.stock, 10) || 0), 0);
  const lowStockCount = productsList.filter(p => (parseInt(p.stock, 10) || 0) <= 15).length;

  return `
    <div class="admin-header">
      <div>
        <div class="admin-badge-live">
          <span class="admin-live-pulse"></span>
          REAL-TIME INVENTORY CONTROL
        </div>
        <h1 style="margin-top:6px;">Products & Stock Management</h1>
        <p style="color:var(--cream-300); font-size:var(--text-sm);">
          Update available stock levels, manage product catalog, and set the Daily Special
        </p>
      </div>

      <div class="admin-header-actions">
        <button class="btn btn-primary btn-ripple" onclick="window.openProductModal()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          + Add Product
        </button>
      </div>
    </div>

    <!-- Inventory Quick Stats -->
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); margin-bottom:var(--space-6);">
      <div class="stat-card" style="padding:var(--space-4);">
        <div class="stat-label">Total Catalog Products</div>
        <div class="stat-value" style="font-size:24px; color:#FFF8E7;">${productsList.length}</div>
        <div class="admin-kpi-subtext">Active Recipes & Items</div>
      </div>
      <div class="stat-card" style="padding:var(--space-4);">
        <div class="stat-label">Total Units in Stock</div>
        <div class="stat-value" style="font-size:24px; color:var(--gold-400);">${totalStock}</div>
        <div class="admin-kpi-subtext">Across All Categories</div>
      </div>
      <div class="stat-card" style="padding:var(--space-4);">
        <div class="stat-label">Low Stock Alerts</div>
        <div class="stat-value" style="font-size:24px; color:${lowStockCount > 0 ? '#e67e22' : '#2ecc71'};">${lowStockCount}</div>
        <div class="admin-kpi-subtext">≤ 15 units remaining</div>
      </div>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header" style="flex-wrap:wrap; gap:var(--space-3);">
        <div>
          <h3>${ICONS.bowl} All Products & Stock Levels</h3>
          <p style="font-size:var(--text-xs); color:var(--cream-400); margin:0;">
            Directly edit product stocks below using [−] / [+] or typing exact units
          </p>
        </div>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search products by name or category..." 
                 id="adminProductSearch" oninput="window.adminSearchProducts(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminProductsTable">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th style="min-width:180px;">Stock Units (Editable)</th>
              <th>Rating</th>
              <th>Inventory Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${productsList.map(p => {
              const safeId = parseInt(p.id, 10);
              const safeName = escapeHTML(p.name);
              const safeTamil = escapeHTML(p.tamilName);
              const safeCat = escapeHTML(p.category || 'Kanji');
              const safeImg = escapeHTML(p.image || '');
              const stock = Math.max(0, parseInt(p.stock, 10) || 0);
              const statusClass = stock > 25 ? 'status-instock' : (stock > 10 ? 'status-lowstock' : 'status-outstock');
              const statusLabel = stock > 25 ? 'In Stock' : (stock > 0 ? 'Low Stock' : 'Out of Stock');
              const price = Number(p.price) || 0;
              const origPrice = Number(p.originalPrice) || price;

              return `
                <tr data-product-id="${safeId}">
                  <td>
                    <div class="table-product">
                      <div class="table-product-img" style="background: linear-gradient(135deg, #2D5E3F, #1B3A2D); display:flex; align-items:center; justify-content:center; color:var(--gold-400); overflow:hidden; border-radius:var(--radius-md);">
                        ${safeImg ? `<img src="${safeImg}" alt="${safeName}" style="width:100%;height:100%;object-fit:cover;" />` : ICONS.bowl}
                      </div>
                      <div>
                        <div class="table-product-name" style="display:flex; align-items:center; gap:6px;">
                          <span>${safeName}</span>
                          ${safeId === currentSpecialId ? `<span class="badge" style="background:rgba(212,160,23,0.25); color:var(--gold-400); border:1px solid rgba(212,160,23,0.5); font-size:10px; font-weight:700;">🌟 DAILY SPL</span>` : ''}
                        </div>
                        <div class="table-product-tamil" style="color:var(--gold-400);">${safeTamil}</div>
                      </div>
                    </div>
                  </td>
                  <td><span class="badge" style="background:rgba(255,255,255,0.06); color:var(--cream-200); border:1px solid rgba(255,255,255,0.1);">${safeCat}</span></td>
                  <td>
                    <strong style="color:var(--gold-400);">${formatPrice(price)}</strong> 
                    ${origPrice > price ? `<span style="color:var(--cream-500); text-decoration:line-through; font-size:var(--text-xs);">${formatPrice(origPrice)}</span>` : ''}
                  </td>
                  
                  <!-- Interactive Stock Editor Cell -->
                  <td>
                    <div style="display:flex; align-items:center; gap:6px;">
                      <button type="button" class="admin-stock-step-btn" onclick="window.adjustProductStock(${safeId}, -1)" title="Decrease Stock by 1">−</button>
                      <input type="number" 
                             class="admin-stock-num-input" 
                             id="stockInput_${safeId}" 
                             value="${stock}" 
                             min="0" 
                             max="100000"
                             onchange="window.saveDirectStock(${safeId}, this.value)" 
                             onkeydown="if(event.key==='Enter') window.saveDirectStock(${safeId}, this.value)"
                             title="Type stock and press Enter or click away to save" />
                      <button type="button" class="admin-stock-step-btn" onclick="window.adjustProductStock(${safeId}, 1)" title="Increase Stock by 1">+</button>
                      <button type="button" class="admin-stock-boost-btn" onclick="window.adjustProductStock(${safeId}, 10)" title="Quick Add +10 units">+10</button>
                    </div>
                  </td>

                  <td><span style="color:var(--gold-500);">${ICONS.star}</span> ${escapeHTML(String(p.rating || '5.0'))}</td>
                  
                  <td>
                    <span class="status-badge ${statusClass}" id="stockStatusBadge_${safeId}">
                      ${statusLabel}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="table-action-btn ${safeId === currentSpecialId ? 'active' : ''}" style="${safeId === currentSpecialId ? 'background:rgba(212,160,23,0.25); color:var(--gold-400);' : ''}" onclick="window.setAsDailySpecial(${safeId})" title="${safeId === currentSpecialId ? 'Active Daily Special' : 'Set as Daily Special'}">${ICONS.sparkle}</button>
                      <button class="table-action-btn" onclick="window.editProduct(${safeId})" title="Edit Product Details">${ICONS.edit}</button>
                      <button class="table-action-btn delete" onclick="window.deleteProduct(${safeId})" title="Delete Product">${ICONS.trash}</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Add/Edit Modal -->
    <div class="modal-overlay" id="productModal">
      <div class="modal admin-modal-card w-full max-w-xl mx-3 p-4 sm:p-6 max-h-[92vh] overflow-y-auto" style="display:block !important; position:relative !important; background:#0c1a14; color:#FFF8E7; border:1.5px solid rgba(212,160,23,0.35); border-radius:var(--radius-2xl); box-shadow:0 25px 70px rgba(0,0,0,0.8);">
        <div class="modal-header d-flex justify-content-between align-items-center" style="border-bottom:1px solid rgba(212,160,23,0.2); padding-bottom:var(--space-3); margin-bottom:var(--space-4);">
          <div>
            <span style="font-size:11px; color:var(--gold-400); font-weight:700; text-transform:uppercase; letter-spacing:1px;">Product Catalog</span>
            <h3 id="productModalTitle" style="color:#FFF8E7; margin:2px 0 0; font-size:var(--text-xl);">Add New Product</h3>
          </div>
          <button class="modal-close" onclick="window.closeProductModal()" style="font-size:22px; color:var(--cream-200); background:rgba(255,255,255,0.08); border:1px solid rgba(212,160,23,0.3); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer;">${ICONS.x}</button>
        </div>
        
        <input type="hidden" id="editProductId" value="" />
        
        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-6 form-group">
            <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Product Name *</label>
            <input type="text" class="form-input" id="prodName" placeholder="e.g., Karupu Kauvni Kanji" maxlength="100" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;" />
          </div>
          <div class="col-12 col-sm-6 form-group">
            <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Tamil Name *</label>
            <input type="text" class="form-input" id="prodTamilName" placeholder="e.g., கருப்பு கவுனி கஞ்சி" maxlength="100" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;" />
          </div>
        </div>
        
        <div class="form-group mb-3">
          <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Category *</label>
          <select class="form-select" id="prodCategory" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;">
            <option value="Kanji">Kanji Varieties</option>
            <option value="Daily Special">Daily Special</option>
            <option value="Healthy Snacks">Healthy Snacks</option>
            <option value="Traditional Sweets">Traditional Sweets</option>
          </select>
        </div>
        
        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-4 form-group">
            <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Price (₹) *</label>
            <input type="number" class="form-input" id="prodPrice" placeholder="99" min="1" max="100000" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;" />
          </div>
          <div class="col-12 col-sm-4 form-group">
            <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Original MRP (₹)</label>
            <input type="number" class="form-input" id="prodOrigPrice" placeholder="149" min="1" max="100000" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;" />
          </div>
          <div class="col-12 col-sm-4 form-group">
            <label class="form-label" style="color:var(--gold-400); font-size:var(--text-xs); font-weight:700;">Stock Units *</label>
            <input type="number" class="form-input" id="prodStock" placeholder="50" min="0" max="100000" style="background:#1a3326; border-color:rgba(212,160,23,0.6); color:#FFF8E7; font-weight:700;" />
          </div>
        </div>
        
        <div class="form-group mb-4">
          <label class="form-label" style="color:var(--cream-200); font-size:var(--text-xs); font-weight:600;">Description</label>
          <textarea class="form-textarea" id="prodDesc" placeholder="Product culinary and health benefits description..." maxlength="1000" rows="3" style="background:#13261c; border-color:rgba(212,160,23,0.3); color:#FFF8E7;"></textarea>
        </div>
        
        <div class="d-flex flex-column flex-sm-row gap-2 mt-4">
          <button class="btn btn-primary btn-ripple flex-grow-1" onclick="window.saveProduct()">Save Product & Stock</button>
          <button class="btn btn-outline btn-ripple" onclick="window.closeProductModal()" style="color:var(--cream-200); border-color:rgba(255,255,255,0.2);">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

export function initAdminProductHandlers() {
  window.openProductModal = function(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    if (!modal) return;

    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    if (product) {
      if (title) title.textContent = 'Edit Product & Stock';
      document.getElementById('editProductId').value = product.id;
      document.getElementById('prodName').value = product.name || '';
      document.getElementById('prodTamilName').value = product.tamilName || '';
      document.getElementById('prodCategory').value = product.category || 'Kanji';
      document.getElementById('prodPrice').value = product.price || '';
      document.getElementById('prodOrigPrice').value = product.originalPrice || '';
      document.getElementById('prodStock').value = product.stock !== undefined ? product.stock : 50;
      document.getElementById('prodDesc').value = product.description || '';
    } else {
      if (title) title.textContent = 'Add New Product';
      document.getElementById('editProductId').value = '';
      ['prodName', 'prodTamilName', 'prodPrice', 'prodOrigPrice', 'prodDesc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const stockEl = document.getElementById('prodStock');
      if (stockEl) stockEl.value = '50';
    }

    modal.onclick = function(e) {
      if (e.target === modal) window.closeProductModal();
    };

    modal.classList.add('active');
  };

  window.closeProductModal = function() {
    document.getElementById('productModal')?.classList.remove('active');
  };

  window.editProduct = function(id) {
    const cleanId = parseInt(id, 10);
    const product = ProductsStore.getById(cleanId);
    if (product) window.openProductModal(product);
  };

  window.adjustProductStock = function(id, delta) {
    const cleanId = parseInt(id, 10);
    const cleanDelta = parseInt(delta, 10) || 0;
    const updated = ProductsStore.adjustStock(cleanId, cleanDelta);
    if (!updated) return;

    const input = document.getElementById(`stockInput_${cleanId}`);
    if (input) input.value = updated.stock;

    const badge = document.getElementById(`stockStatusBadge_${cleanId}`);
    if (badge) {
      badge.className = `status-badge ${updated.stock > 25 ? 'status-instock' : (updated.stock > 10 ? 'status-lowstock' : 'status-outstock')}`;
      badge.textContent = updated.stock > 25 ? 'In Stock' : (updated.stock > 0 ? 'Low Stock' : 'Out of Stock');
    }

    showToast('Stock Updated', `${escapeHTML(updated.name)}: ${updated.stock} units`, 'info');
  };

  window.saveDirectStock = function(id, value) {
    const cleanId = parseInt(id, 10);
    const parsed = Math.max(0, Math.min(100000, parseInt(value, 10) || 0));
    const updated = ProductsStore.updateStock(cleanId, parsed);
    if (!updated) return;

    const input = document.getElementById(`stockInput_${cleanId}`);
    if (input) input.value = updated.stock;

    const badge = document.getElementById(`stockStatusBadge_${cleanId}`);
    if (badge) {
      badge.className = `status-badge ${updated.stock > 25 ? 'status-instock' : (updated.stock > 10 ? 'status-lowstock' : 'status-outstock')}`;
      badge.textContent = updated.stock > 25 ? 'In Stock' : (updated.stock > 0 ? 'Low Stock' : 'Out of Stock');
    }

    showToast('Stock Saved', `${escapeHTML(updated.name)}: ${updated.stock} units available`, 'success');
  };

  window.deleteProduct = function(id) {
    const cleanId = parseInt(id, 10);
    const p = ProductsStore.getById(cleanId);
    const name = p ? p.name : 'Product';
    if (!confirm(`Are you sure you want to delete "${name}" from the product catalog?`)) return;
    ProductsStore.deleteProduct(cleanId);
    if (window.adminNavigate) window.adminNavigate('products');
    showToast('Deleted', `"${escapeHTML(name)}" removed successfully`, 'warning');
  };

  window.saveProduct = function() {
    const editId = document.getElementById('editProductId')?.value;
    const name = sanitizeText(document.getElementById('prodName')?.value, 100);
    const tamilName = sanitizeText(document.getElementById('prodTamilName')?.value, 100);
    const category = sanitizeText(document.getElementById('prodCategory')?.value, 50) || 'Kanji';
    const price = Math.max(1, Math.min(100000, parseInt(document.getElementById('prodPrice')?.value, 10) || 0));
    const originalPrice = Math.max(price, Math.min(100000, parseInt(document.getElementById('prodOrigPrice')?.value, 10) || price));
    const stock = Math.max(0, Math.min(100000, parseInt(document.getElementById('prodStock')?.value, 10) || 0));
    const description = sanitizeText(document.getElementById('prodDesc')?.value, 1000);

    if (!name || !tamilName || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      showToast('Validation Error', 'Please provide valid Name, Tamil Name, Price (> ₹0), and Stock (≥ 0)', 'error');
      return;
    }

    const payload = {
      id: editId ? parseInt(editId, 10) : undefined,
      name,
      tamilName,
      category,
      price,
      originalPrice,
      stock,
      description
    };

    const saved = ProductsStore.saveProduct(payload);
    showToast('Product Saved', `${escapeHTML(saved.name)} (Stock: ${saved.stock}) saved successfully`, 'success');
    window.closeProductModal();
    if (window.adminNavigate) window.adminNavigate('products');
  };

  window.adminSearchProducts = function(query) {
    const q = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#adminProductsTable tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  };

  window.setAsDailySpecial = function(id) {
    const cleanId = parseInt(id, 10);
    DailySpecialStore.setId(cleanId);
    const p = ProductsStore.getById(cleanId);
    const safeName = p ? escapeHTML(p.name) : 'Product';
    showToast('🌟 Daily Special Set!', `${safeName} is now active as today's Daily Special!`, 'success');
    
    document.querySelectorAll('.table-action-btn[onclick*="setAsDailySpecial"]').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = '';
      btn.style.color = '';
      btn.title = 'Set as Daily Special';
    });
    const activeBtn = document.querySelector(`.table-action-btn[onclick*="setAsDailySpecial(${cleanId})"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.background = 'rgba(212,160,23,0.25)';
      activeBtn.style.color = 'var(--gold-400)';
      activeBtn.title = 'Active Daily Special';
    }
  };
}

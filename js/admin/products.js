/* ============================================
   VEDICFUELOON — ADMIN PRODUCTS
   Product CRUD Management
   ============================================ */

import { PRODUCTS } from '../data.js';
import { DailySpecialStore } from '../store.js';
import { showToast, formatPrice, ICONS } from '../components.js';

// We use a mutable copy so admin edits persist in session
let productsList = [...PRODUCTS];

export function getAdminProducts() {
  return productsList;
}

export function renderAdminProducts() {
  const currentSpecialId = DailySpecialStore.getId();
  return `
    <div class="admin-header">
      <div>
        <h1>Products</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">Manage your product catalog & Daily Special</p>
      </div>
      <button class="btn btn-primary" onclick="window.openProductModal()">+ Add Product</button>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${ICONS.bowl} All Products (${productsList.length})</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search products..." 
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
              <th>Stock</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${productsList.map(p => `
              <tr data-product-id="${p.id}">
                <td>
                  <div class="table-product">
                    <div class="table-product-img" style="background: linear-gradient(135deg, #2D5E3F, #1B3A2D); display:flex; align-items:center; justify-content:center; color:var(--gold-400); overflow:hidden; border-radius:var(--radius-md);">
                      ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" />` : ICONS.bowl}
                    </div>
                    <div>
                      <div class="table-product-name" style="display:flex; align-items:center; gap:6px;">
                        <span>${p.name}</span>
                        ${p.id === currentSpecialId ? `<span class="badge" style="background:rgba(212,160,23,0.25); color:var(--gold-400); border:1px solid rgba(212,160,23,0.5); font-size:10px; font-weight:700;">🌟 DAILY SPL</span>` : ''}
                      </div>
                      <div class="table-product-tamil">${p.tamilName}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge" style="background:var(--cream-100); color:var(--neutral-700);">${p.category}</span></td>
                <td><strong>${formatPrice(p.price)}</strong> <span style="color:var(--neutral-400); text-decoration:line-through; font-size:var(--text-xs);">${formatPrice(p.originalPrice)}</span></td>
                <td>${p.stock}</td>
                <td><span style="color:var(--gold-500);">${ICONS.star}</span> ${p.rating}</td>
                <td>
                  <span class="status-badge ${p.stock > 25 ? 'status-instock' : p.stock > 10 ? 'status-lowstock' : 'status-outstock'}">
                    ${p.stock > 25 ? 'In Stock' : p.stock > 10 ? 'Low Stock' : 'Critical'}
                  </span>
                </td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn ${p.id === currentSpecialId ? 'active' : ''}" style="${p.id === currentSpecialId ? 'background:rgba(212,160,23,0.25); color:var(--gold-400);' : ''}" onclick="window.setAsDailySpecial(${p.id})" title="${p.id === currentSpecialId ? 'Active Daily Special' : 'Set as Daily Special'}">${ICONS.sparkle}</button>
                    <button class="table-action-btn" onclick="window.editProduct(${p.id})" title="Edit">${ICONS.edit}</button>
                    <button class="table-action-btn delete" onclick="window.deleteProduct(${p.id})" title="Delete">${ICONS.trash}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Modal -->
    <div class="modal-overlay" id="productModal">
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3 id="productModalTitle">Add New Product</h3>
          <button class="modal-close" onclick="window.closeProductModal()">${ICONS.x}</button>
        </div>
        <input type="hidden" id="editProductId" value="" />
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
          <div class="form-group">
            <label class="form-label">Product Name *</label>
            <input type="text" class="form-input" id="prodName" placeholder="e.g., Ragi Kanji" />
          </div>
          <div class="form-group">
            <label class="form-label">Tamil Name *</label>
            <input type="text" class="form-input" id="prodTamilName" placeholder="e.g., ராகி கஞ்சி" />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-select" id="prodCategory">
            <option value="kanji">Kanji Varieties</option>
            <option value="daily-spl">Daily Special</option>
            <option value="solid-eats">Solid Eats</option>
          </select>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:var(--space-4);">
          <div class="form-group">
            <label class="form-label">Price (₹) *</label>
            <input type="number" class="form-input" id="prodPrice" placeholder="99" />
          </div>
          <div class="form-group">
            <label class="form-label">Original Price (₹)</label>
            <input type="number" class="form-input" id="prodOrigPrice" placeholder="149" />
          </div>
          <div class="form-group">
            <label class="form-label">Stock *</label>
            <input type="number" class="form-input" id="prodStock" placeholder="50" />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="prodDesc" placeholder="Product description..." rows="3"></textarea>
        </div>
        
        <div style="display:flex; gap:var(--space-4); margin-top:var(--space-4);">
          <button class="btn btn-primary" style="flex:1;" onclick="window.saveProduct()">Save Product</button>
          <button class="btn btn-outline" onclick="window.closeProductModal()">Cancel</button>
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

    if (product) {
      title.textContent = 'Edit Product';
      document.getElementById('editProductId').value = product.id;
      document.getElementById('prodName').value = product.name;
      document.getElementById('prodTamilName').value = product.tamilName;
      document.getElementById('prodCategory').value = product.category;
      document.getElementById('prodPrice').value = product.price;
      document.getElementById('prodOrigPrice').value = product.originalPrice;
      document.getElementById('prodStock').value = product.stock;
      document.getElementById('prodDesc').value = product.description;
    } else {
      title.textContent = 'Add New Product';
      document.getElementById('editProductId').value = '';
      ['prodName', 'prodTamilName', 'prodPrice', 'prodOrigPrice', 'prodStock', 'prodDesc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }

    modal.classList.add('active');
  };

  window.closeProductModal = function() {
    document.getElementById('productModal')?.classList.remove('active');
  };

  window.editProduct = function(id) {
    const product = productsList.find(p => p.id === id);
    if (product) window.openProductModal(product);
  };

  window.deleteProduct = function(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    productsList = productsList.filter(p => p.id !== id);
    // Re-render
    if (window.adminNavigate) window.adminNavigate('products');
    showToast('Deleted', 'Product removed successfully', 'warning');
  };

  window.saveProduct = function() {
    const editId = document.getElementById('editProductId')?.value;
    const name = document.getElementById('prodName')?.value.trim();
    const tamilName = document.getElementById('prodTamilName')?.value.trim();
    const category = document.getElementById('prodCategory')?.value;
    const price = parseInt(document.getElementById('prodPrice')?.value);
    const originalPrice = parseInt(document.getElementById('prodOrigPrice')?.value) || price;
    const stock = parseInt(document.getElementById('prodStock')?.value);
    const description = document.getElementById('prodDesc')?.value.trim();

    if (!name || !tamilName || !price || !stock) {
      showToast('Missing Fields', 'Please fill in all required fields', 'error');
      return;
    }

    if (editId) {
      // Update existing
      const product = productsList.find(p => p.id === parseInt(editId));
      if (product) {
        Object.assign(product, { name, tamilName, category, price, originalPrice, stock, description });
      }
      showToast('Updated Successfully', `${name} updated successfully`, 'success');
    } else {
      // Add
      const newProduct = {
        id: Date.now(),
        name,
        tamilName,
        category,
        price,
        originalPrice,
        description,
        nutrition: { calories: '160', protein: '5g', fiber: '4g', iron: '15%', calcium: '10%', vitB: '15%' },
        rating: 5.0,
        reviews: 1,
        badge: 'new',
        inStock: true,
        stock,
        image: ''
      };
      productsList.unshift(newProduct);
      showToast('Added Successfully', `${name} added to catalog`, 'success');
    }

    window.closeProductModal();
    if (window.adminNavigate) window.adminNavigate('products');
  };

  window.adminSearchProducts = function(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#adminProductsTable tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  };

  window.setAsDailySpecial = function(id) {
    DailySpecialStore.setId(id);
    const p = productsList.find(item => item.id === id);
    showToast('🌟 Daily Special Set!', `${p ? p.name : 'Product'} is now active as today's Daily Special!`, 'success');
    if (window.adminNavigate) window.adminNavigate('products');
  };
}

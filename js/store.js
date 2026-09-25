/* ============================================
   VEDICFUELOON — SECURE STATE MANAGEMENT (localStorage)
   Cart, Orders, Customers, Admin Auth & Stock Control
   Secured with authoritative price validation,
   input sanitization, SHA-256 password hashing,
   session expiration, and brute-force mitigation.
   ============================================ */

import { PRODUCTS } from './data.js';
import { 
  escapeHTML, 
  sanitizeText, 
  safeJSONParse, 
  generateSecureToken, 
  AuthRateLimiter, 
  sha256 
} from './security.js';

const KEYS = {
  CART: 'vf_cart',
  ORDERS: 'vf_orders',
  CUSTOMERS: 'vf_customers',
  ADMIN_AUTH: 'vf_admin_auth',
  ADMIN_CREDS: 'vf_admin_creds',
  PRODUCTS_CUSTOM: 'vf_products_custom',
  DAILY_SPECIAL: 'vf_daily_special_id'
};

const AUTH_SALT = 'vf_secure_salt_2026';
// Precomputed SHA-256 hash of "vf_secure_salt_2026:admin123"
const DEFAULT_PASSWORD_HASH = '29ad1aca9678fdc9b2c0b3d3d85b958c58e67737c4ad343f908126d12e9b43a0';
const DEFAULT_USERNAME = 'admin';

// Session Security Configuration
const SESSION_MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours absolute session
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes inactivity timeout

// ── Daily Special Store ──
export const DailySpecialStore = {
  getId() {
    const id = localStorage.getItem(KEYS.DAILY_SPECIAL);
    return id ? parseInt(id, 10) : 20;
  },
  setId(id) {
    const cleanId = parseInt(id, 10) || 20;
    localStorage.setItem(KEYS.DAILY_SPECIAL, cleanId.toString());
    window.dispatchEvent(new CustomEvent('daily-special-updated', { detail: { productId: cleanId } }));
  }
};

// ── Products Management & Stock Control ──
export const ProductsStore = {
  get() {
    const saved = localStorage.getItem(KEYS.PRODUCTS_CUSTOM);
    if (!saved) {
      const initial = PRODUCTS.map(p => ({ ...p }));
      localStorage.setItem(KEYS.PRODUCTS_CUSTOM, JSON.stringify(initial));
      return initial;
    }
    const parsed = safeJSONParse(saved, null);
    if (!Array.isArray(parsed)) {
      const initial = PRODUCTS.map(p => ({ ...p }));
      localStorage.setItem(KEYS.PRODUCTS_CUSTOM, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  },

  save(products) {
    if (!Array.isArray(products)) return;
    localStorage.setItem(KEYS.PRODUCTS_CUSTOM, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('products-updated', { detail: { products } }));
  },

  getById(productId) {
    const id = parseInt(productId, 10);
    return this.get().find(p => p.id === id);
  },

  updateStock(productId, newStock) {
    const products = this.get();
    const p = products.find(item => item.id === parseInt(productId, 10));
    if (p) {
      p.stock = Math.max(0, Math.min(100000, parseInt(newStock, 10) || 0));
      p.inStock = p.stock > 0;
      this.save(products);
      return p;
    }
    return null;
  },

  adjustStock(productId, delta) {
    const products = this.get();
    const p = products.find(item => item.id === parseInt(productId, 10));
    if (p) {
      const cur = parseInt(p.stock, 10) || 0;
      p.stock = Math.max(0, Math.min(100000, cur + delta));
      p.inStock = p.stock > 0;
      this.save(products);
      return p;
    }
    return null;
  },

  saveProduct(data) {
    const products = this.get();
    const editId = data.id ? parseInt(data.id, 10) : null;

    // Sanitize and bound all product inputs
    const sanitizedName = sanitizeText(data.name, 100);
    const sanitizedTamil = sanitizeText(data.tamilName, 100);
    const sanitizedCategory = sanitizeText(data.category, 50) || 'Kanji';
    const sanitizedDesc = sanitizeText(data.description, 1000);
    const cleanPrice = Math.max(1, Math.min(100000, parseInt(data.price, 10) || 0));
    const cleanOrigPrice = Math.max(cleanPrice, Math.min(100000, parseInt(data.originalPrice, 10) || cleanPrice));
    const cleanStock = Math.max(0, Math.min(100000, parseInt(data.stock, 10) || 0));

    if (editId) {
      const idx = products.findIndex(p => p.id === editId);
      if (idx !== -1) {
        products[idx] = {
          ...products[idx],
          name: sanitizedName,
          tamilName: sanitizedTamil,
          category: sanitizedCategory,
          price: cleanPrice,
          originalPrice: cleanOrigPrice,
          stock: cleanStock,
          inStock: cleanStock > 0,
          description: sanitizedDesc,
          id: editId
        };
        this.save(products);
        return products[idx];
      }
    }

    const newId = Date.now();
    const newProd = {
      id: newId,
      name: sanitizedName,
      tamilName: sanitizedTamil,
      category: sanitizedCategory,
      price: cleanPrice,
      originalPrice: cleanOrigPrice,
      stock: cleanStock,
      inStock: cleanStock > 0,
      description: sanitizedDesc,
      rating: 5.0,
      reviews: 1,
      badge: 'new',
      image: ''
    };
    products.unshift(newProd);
    this.save(products);
    return newProd;
  },

  deleteProduct(productId) {
    const products = this.get().filter(p => p.id !== parseInt(productId, 10));
    this.save(products);
    return products;
  },

  resetDefaults() {
    const initial = PRODUCTS.map(p => ({ ...p }));
    this.save(initial);
    return initial;
  }
};

// ── Cart Management ──
export const Cart = {
  get() {
    const raw = localStorage.getItem(KEYS.CART);
    const cart = safeJSONParse(raw, []);
    if (!Array.isArray(cart)) return [];
    
    // Authoritative re-verification of prices in cart
    return cart.map(item => {
      const authProd = ProductsStore.getById(item.id) || PRODUCTS.find(p => p.id === item.id);
      return {
        ...item,
        price: authProd ? authProd.price : (Number(item.price) || 0),
        originalPrice: authProd ? authProd.originalPrice : (Number(item.originalPrice) || 0),
        name: authProd ? authProd.name : sanitizeText(item.name, 100),
        tamilName: authProd ? authProd.tamilName : sanitizeText(item.tamilName, 100),
        qty: Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1))
      };
    });
  },

  save(cart) {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
  },

  add(product, qty = 1) {
    const cart = this.get();
    const prodId = parseInt(product.id, 10);
    // Fetch authoritative catalog details
    const authProduct = ProductsStore.getById(prodId) || PRODUCTS.find(p => p.id === prodId);
    if (!authProduct) return cart;

    const cleanQty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    const existing = cart.find(item => item.id === prodId);

    if (existing) {
      existing.qty = Math.min(99, existing.qty + cleanQty);
      existing.price = authProduct.price; // Enforce authoritative price
    } else {
      cart.push({
        id: authProduct.id,
        name: authProduct.name,
        tamilName: authProduct.tamilName,
        price: authProduct.price,
        originalPrice: authProduct.originalPrice,
        image: authProduct.image,
        qty: cleanQty
      });
    }
    this.save(cart);
    return cart;
  },

  remove(productId) {
    const cleanId = parseInt(productId, 10);
    const cart = this.get().filter(item => item.id !== cleanId);
    this.save(cart);
    return cart;
  },

  updateQty(productId, qty) {
    const cleanId = parseInt(productId, 10);
    const cart = this.get();
    const item = cart.find(i => i.id === cleanId);
    if (item) {
      item.qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    }
    this.save(cart);
    return cart;
  },

  clear() {
    this.save([]);
  },

  getCount() {
    return this.get().reduce((sum, item) => sum + (parseInt(item.qty, 10) || 0), 0);
  },

  getSubtotal() {
    return this.get().reduce((sum, item) => sum + (item.price * (parseInt(item.qty, 10) || 1)), 0);
  },

  getDelivery() {
    const subtotal = this.getSubtotal();
    return subtotal >= 499 ? 0 : 49;
  },

  getTotal() {
    return this.getSubtotal() + this.getDelivery();
  }
};

// ── Orders Management ──
export const Orders = {
  get() {
    const raw = localStorage.getItem(KEYS.ORDERS);
    const list = safeJSONParse(raw, []);
    if (!Array.isArray(list)) return [];

    return list.map((o, idx) => {
      if (!o.invoiceNo) {
        const d = new Date(o.createdAt || Date.now());
        const dateCode = d.toISOString().slice(2, 10).replace(/-/g, '');
        const num = (list.length - idx).toString().padStart(5, '0');
        o.invoiceNo = `VF/${dateCode}/${num}`;
        o.paymentMethod = o.paymentMethod || 'UPI';
        o.paymentStatus = o.paymentStatus || (o.status === 'cancelled' ? 'Refunded' : 'Paid');
        o.paymentId = o.paymentId || ('UPI/' + (dateCode + '8941' + (idx + 100)));
        o.transactionId = o.transactionId || ('3XQ' + (idx + 10).toString(36).toUpperCase() + '7P2Z1');
      }
      return o;
    });
  },

  save(orders) {
    if (!Array.isArray(orders)) return;
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  clear() {
    localStorage.removeItem(KEYS.ORDERS);
  },

  create(customerInfo, cartItems, paymentInfo = {}) {
    const orders = this.get();
    const now = new Date();
    const dateCode = now.toISOString().slice(2, 10).replace(/-/g, '');
    const seq = (orders.length + 1).toString().padStart(5, '0');
    const invoiceNo = `VF/${dateCode}/${seq}`;
    const txnId = '3XQ' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'Z1';
    
    // Strict input sanitization for customer fields
    const sanitizedCustomer = {
      name: sanitizeText(customerInfo.name, 80),
      phone: sanitizeText(customerInfo.phone, 20),
      address: sanitizeText(customerInfo.address, 300),
      email: sanitizeText(customerInfo.email || '', 100),
      notes: sanitizeText(customerInfo.notes || '', 300),
      paymentMethod: ['UPI', 'COD', 'Card'].includes(customerInfo.paymentMethod) ? customerInfo.paymentMethod : 'UPI'
    };

    const payMethod = ['UPI', 'COD', 'Card'].includes(paymentInfo.paymentMethod) 
      ? paymentInfo.paymentMethod 
      : sanitizedCustomer.paymentMethod;
    const payId = (paymentInfo && paymentInfo.paymentId) ? sanitizeText(paymentInfo.paymentId, 60) : ('UPI/' + dateCode + Math.floor(100000 + Math.random() * 900000));

    // Authoritative Item Verification & Re-calculation (Anti Price-Tampering)
    const verifiedItems = (Array.isArray(cartItems) ? cartItems : []).map(item => {
      const authProd = ProductsStore.getById(item.id) || PRODUCTS.find(p => p.id === item.id);
      const safePrice = authProd ? authProd.price : (Math.max(1, parseInt(item.price, 10) || 99));
      const safeOrig = authProd ? authProd.originalPrice : safePrice;
      const safeName = authProd ? authProd.name : sanitizeText(item.name, 100);
      const safeTamil = authProd ? authProd.tamilName : sanitizeText(item.tamilName, 100);
      const safeQty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
      return {
        id: item.id,
        name: safeName,
        tamilName: safeTamil,
        price: safePrice,
        originalPrice: safeOrig,
        image: authProd ? authProd.image : '',
        qty: safeQty
      };
    });

    const subtotal = verifiedItems.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const delivery = subtotal >= 499 ? 0 : 49;
    const discount = 0;
    const total = subtotal + delivery - discount;

    const order = {
      id: 'VF-' + Date.now().toString(36).toUpperCase(),
      invoiceNo: invoiceNo,
      customer: sanitizedCustomer,
      items: verifiedItems,
      subtotal: subtotal,
      delivery: delivery,
      discount: discount,
      total: total,
      paymentMethod: payMethod,
      paymentStatus: payMethod === 'COD' ? 'Pending' : 'Paid',
      paymentId: payId,
      transactionId: txnId,
      status: 'pending',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    orders.unshift(order);
    this.save(orders);
    
    // Save or update customer record safely
    Customers.addOrUpdate(sanitizedCustomer, order);
    
    // Decrement inventory stock safely
    verifiedItems.forEach(item => {
      if (item && item.id) {
        ProductsStore.adjustStock(item.id, -item.qty);
      }
    });

    // Clear cart after order confirmation
    Cart.clear();
    
    return order;
  },

  updateStatus(orderId, status) {
    const validStatuses = ['pending', 'processing', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) return null;

    const orders = this.get();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'cancelled') {
        order.paymentStatus = 'Refunded';
      } else if (order.paymentStatus === 'Pending' && status === 'delivered') {
        order.paymentStatus = 'Paid';
      }
      order.updatedAt = new Date().toISOString();
      this.save(orders);
    }
    return order;
  },

  getById(orderId) {
    if (!orderId) return null;
    return this.get().find(o => o.id === orderId || o.invoiceNo === orderId);
  },

  getTotalRevenue() {
    return this.get()
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  },

  getRecentOrders(limit = 5) {
    return this.get().slice(0, Math.min(50, limit));
  },

  getOrdersByStatus(status) {
    if (status === 'all') return this.get();
    return this.get().filter(o => o.status === status);
  }
};

// ── Customers Management ──
export const Customers = {
  get() {
    const raw = localStorage.getItem(KEYS.CUSTOMERS);
    const list = safeJSONParse(raw, []);
    return Array.isArray(list) ? list : [];
  },

  save(customers) {
    if (!Array.isArray(customers)) return;
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  clear() {
    localStorage.removeItem(KEYS.CUSTOMERS);
  },

  addOrUpdate(info, order) {
    const customers = this.get();
    const cleanPhone = sanitizeText(info.phone, 20);
    const cleanName = sanitizeText(info.name, 80);
    const cleanAddress = sanitizeText(info.address, 300);

    const existing = customers.find(c => c.phone === cleanPhone);
    if (existing) {
      existing.name = cleanName;
      existing.address = cleanAddress;
      if (!existing.orders.includes(order.id)) {
        existing.orders.push(order.id);
      }
      existing.totalSpent = (Number(existing.totalSpent) || 0) + (Number(order.total) || 0);
      existing.lastOrder = order.createdAt;
    } else {
      customers.push({
        id: 'CUS-' + Date.now().toString(36).toUpperCase(),
        name: cleanName,
        phone: cleanPhone,
        address: cleanAddress,
        orders: [order.id],
        totalSpent: Number(order.total) || 0,
        joinedAt: new Date().toISOString(),
        lastOrder: order.createdAt
      });
    }
    this.save(customers);
  },

  getById(customerId) {
    if (!customerId) return null;
    return this.get().find(c => c.id === customerId);
  },

  search(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return this.get();
    return this.get().filter(c =>
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)) ||
      (c.id && c.id.toLowerCase().includes(q))
    );
  }
};

// ── Cryptographically Secured Admin Auth ──
export const AdminAuth = {
  getStoredCredentials() {
    const raw = localStorage.getItem(KEYS.ADMIN_CREDS);
    return safeJSONParse(raw, {
      username: DEFAULT_USERNAME,
      passwordHash: DEFAULT_PASSWORD_HASH
    });
  },

  /**
   * Secure Admin Login with Rate Limiting & Cryptographic Hash Verification
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{success: boolean, locked?: boolean, remainingSec?: number, message?: string}>}
   */
  async login(username, password) {
    // 1. Check Rate Limiter
    const lockCheck = AuthRateLimiter.isLocked();
    if (lockCheck.locked) {
      return { 
        success: false, 
        locked: true, 
        remainingSec: lockCheck.remainingSec,
        message: `Too many failed attempts. Security lock active for ${lockCheck.remainingSec}s.`
      };
    }

    if (!username || !password) {
      AuthRateLimiter.recordFailedAttempt();
      return { success: false, message: 'Username and password required.' };
    }

    const creds = this.getStoredCredentials();
    const cleanUser = username.trim().toLowerCase();
    
    // Hash input password with security salt
    const inputHash = await sha256(`${AUTH_SALT}:${password}`);

    const isUserValid = cleanUser === creds.username.toLowerCase();
    const isPassValid = inputHash === creds.passwordHash;

    if (isUserValid && isPassValid) {
      AuthRateLimiter.reset();
      const now = Date.now();
      const session = {
        token: generateSecureToken(32),
        username: creds.username,
        loginTime: now,
        expiresAt: now + SESSION_MAX_AGE_MS,
        lastActive: now
      };
      localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify(session));
      return { success: true };
    } else {
      const rec = AuthRateLimiter.recordFailedAttempt();
      const remainingAttempts = Math.max(0, 5 - rec.attempts);
      const msg = remainingAttempts > 0 
        ? `Invalid credentials. ${remainingAttempts} attempt(s) remaining.` 
        : 'Maximum login attempts exceeded. Portal locked for 5 minutes.';
      return { success: false, message: msg };
    }
  },

  /**
   * Validates Session with Inactivity and Absolute Timeouts
   * @returns {boolean}
   */
  isLoggedIn() {
    const raw = localStorage.getItem(KEYS.ADMIN_AUTH);
    const session = safeJSONParse(raw, null);
    if (!session || !session.token || !session.expiresAt) return false;

    const now = Date.now();

    // Absolute session expiration (2h)
    if (now > session.expiresAt) {
      this.logout();
      return false;
    }

    // Inactivity timeout (30m)
    if (session.lastActive && (now - session.lastActive) > SESSION_IDLE_TIMEOUT_MS) {
      this.logout();
      return false;
    }

    // Renew lastActive timestamp
    session.lastActive = now;
    localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify(session));
    return true;
  },

  /**
   * Secure Password Update
   */
  async updatePassword(currentPassword, newPassword) {
    if (!this.isLoggedIn()) return { success: false, message: 'Authentication required' };
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'New password must be at least 8 characters long.' };
    }

    const creds = this.getStoredCredentials();
    const currentHash = await sha256(`${AUTH_SALT}:${currentPassword}`);
    if (currentHash !== creds.passwordHash) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    const newHash = await sha256(`${AUTH_SALT}:${newPassword}`);
    creds.passwordHash = newHash;
    localStorage.setItem(KEYS.ADMIN_CREDS, JSON.stringify(creds));
    return { success: true, message: 'Password updated successfully.' };
  },

  logout() {
    localStorage.removeItem(KEYS.ADMIN_AUTH);
  }
};

// ── Clear All Store Data (For Clean Production Tables) ──
export function clearAllStoreData() {
  Orders.clear();
  Customers.clear();
  Cart.clear();
}

// ── Seed Demo Data (Optional / Manual Only) ──
export function seedDemoData() {
  // Production safe: tables start clean
}

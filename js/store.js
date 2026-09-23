/* ============================================
   VEDICFUELOON — STATE MANAGEMENT (localStorage)
   Cart, Orders, Customers, Admin Auth
   ============================================ */

import { PRODUCTS } from './data.js';

const KEYS = {
  CART: 'vf_cart',
  ORDERS: 'vf_orders',
  CUSTOMERS: 'vf_customers',
  ADMIN_AUTH: 'vf_admin_auth',
  PRODUCTS_CUSTOM: 'vf_products_custom',
  DAILY_SPECIAL: 'vf_daily_special_id'
};

// ── Daily Special Store ──
export const DailySpecialStore = {
  getId() {
    const id = localStorage.getItem(KEYS.DAILY_SPECIAL);
    return id ? parseInt(id) : 20;
  },
  setId(id) {
    localStorage.setItem(KEYS.DAILY_SPECIAL, id.toString());
    window.dispatchEvent(new CustomEvent('daily-special-updated', { detail: { productId: id } }));
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
    try {
      return JSON.parse(saved);
    } catch (e) {
      return PRODUCTS.map(p => ({ ...p }));
    }
  },

  save(products) {
    localStorage.setItem(KEYS.PRODUCTS_CUSTOM, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('products-updated', { detail: { products } }));
  },

  getById(productId) {
    return this.get().find(p => p.id === parseInt(productId));
  },

  updateStock(productId, newStock) {
    const products = this.get();
    const p = products.find(item => item.id === parseInt(productId));
    if (p) {
      p.stock = Math.max(0, parseInt(newStock) || 0);
      p.inStock = p.stock > 0;
      this.save(products);
      return p;
    }
    return null;
  },

  adjustStock(productId, delta) {
    const products = this.get();
    const p = products.find(item => item.id === parseInt(productId));
    if (p) {
      p.stock = Math.max(0, (parseInt(p.stock) || 0) + delta);
      p.inStock = p.stock > 0;
      this.save(products);
      return p;
    }
    return null;
  },

  saveProduct(data) {
    const products = this.get();
    const editId = data.id ? parseInt(data.id) : null;
    if (editId) {
      const idx = products.findIndex(p => p.id === editId);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...data, id: editId };
        this.save(products);
        return products[idx];
      }
    }
    const newId = Date.now();
    const newProd = {
      id: newId,
      rating: 5.0,
      reviews: 1,
      badge: 'new',
      inStock: (parseInt(data.stock) || 0) > 0,
      image: '',
      ...data
    };
    products.unshift(newProd);
    this.save(products);
    return newProd;
  },

  deleteProduct(productId) {
    const products = this.get().filter(p => p.id !== parseInt(productId));
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
    return JSON.parse(localStorage.getItem(KEYS.CART) || '[]');
  },

  save(cart) {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
  },

  add(product, qty = 1) {
    const cart = this.get();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        tamilName: product.tamilName,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        qty
      });
    }
    this.save(cart);
    return cart;
  },

  remove(productId) {
    const cart = this.get().filter(item => item.id !== productId);
    this.save(cart);
    return cart;
  },

  updateQty(productId, qty) {
    const cart = this.get();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
    }
    this.save(cart);
    return cart;
  },

  clear() {
    this.save([]);
  },

  getCount() {
    return this.get().reduce((sum, item) => sum + item.qty, 0);
  },

  getSubtotal() {
    return this.get().reduce((sum, item) => sum + (item.price * item.qty), 0);
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
    const raw = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
    // Ensure all orders have invoice details for e-billing
    return raw.map((o, idx) => {
      if (!o.invoiceNo) {
        const d = new Date(o.createdAt || Date.now());
        const dateCode = d.toISOString().slice(2, 10).replace(/-/g, '');
        const num = (raw.length - idx).toString().padStart(5, '0');
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
    const payId = (paymentInfo && paymentInfo.paymentId) || ('UPI/' + dateCode + Math.floor(100000 + Math.random() * 900000));
    const payMethod = (paymentInfo && paymentInfo.paymentMethod) || (customerInfo && customerInfo.paymentMethod) || 'UPI';

    const subtotal = cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const delivery = Cart.getDelivery ? Cart.getDelivery() : (subtotal >= 499 ? 0 : 49);
    const discount = 0;
    const total = subtotal + delivery - discount;

    const order = {
      id: 'VF-' + Date.now().toString(36).toUpperCase(),
      invoiceNo: invoiceNo,
      customer: customerInfo,
      items: cartItems,
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
    
    // Save customer
    Customers.addOrUpdate(customerInfo, order);
    
    // Decrement inventory stock
    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        if (item && item.id) {
          ProductsStore.adjustStock(item.id, -item.qty);
        }
      });
    }

    // Clear cart
    Cart.clear();
    
    return order;
  },

  updateStatus(orderId, status) {
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
    }
    this.save(orders);
    return order;
  },

  getById(orderId) {
    return this.get().find(o => o.id === orderId || o.invoiceNo === orderId);
  },

  getTotalRevenue() {
    return this.get()
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  },

  getRecentOrders(limit = 5) {
    return this.get().slice(0, limit);
  },

  getOrdersByStatus(status) {
    if (status === 'all') return this.get();
    return this.get().filter(o => o.status === status);
  }
};

// ── Customers Management ──
export const Customers = {
  get() {
    return JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '[]');
  },

  save(customers) {
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  clear() {
    localStorage.removeItem(KEYS.CUSTOMERS);
  },

  addOrUpdate(info, order) {
    const customers = this.get();
    const existing = customers.find(c => c.phone === info.phone);
    if (existing) {
      existing.name = info.name;
      existing.address = info.address;
      existing.orders.push(order.id);
      existing.totalSpent += order.total;
      existing.lastOrder = order.createdAt;
    } else {
      customers.push({
        id: 'CUS-' + Date.now().toString(36).toUpperCase(),
        name: info.name,
        phone: info.phone,
        address: info.address,
        orders: [order.id],
        totalSpent: order.total,
        joinedAt: new Date().toISOString(),
        lastOrder: order.createdAt
      });
    }
    this.save(customers);
  },

  getById(customerId) {
    return this.get().find(c => c.id === customerId);
  },

  search(query) {
    const q = query.toLowerCase();
    return this.get().filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  }
};

// ── Admin Auth ──
export const AdminAuth = {
  CREDENTIALS: { username: 'admin', password: 'admin123' },

  login(username, password) {
    if (username === this.CREDENTIALS.username && password === this.CREDENTIALS.password) {
      localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify({ loggedIn: true, loginTime: Date.now() }));
      return true;
    }
    return false;
  },

  isLoggedIn() {
    const auth = JSON.parse(localStorage.getItem(KEYS.ADMIN_AUTH) || '{}');
    return auth.loggedIn === true;
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
  // Empty by default for production:
  // Future real customer orders and patron records will populate the tables.
}

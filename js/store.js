/* ============================================
   VEDICFUELOON — STATE MANAGEMENT (localStorage)
   Cart, Orders, Customers, Admin Auth
   ============================================ */

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
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
  },

  save(orders) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  create(customerInfo, cartItems) {
    const orders = this.get();
    const order = {
      id: 'VF-' + Date.now().toString(36).toUpperCase(),
      customer: customerInfo,
      items: cartItems,
      subtotal: cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0),
      delivery: Cart.getDelivery(),
      total: Cart.getTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.unshift(order);
    this.save(orders);
    
    // Save customer
    Customers.addOrUpdate(customerInfo, order);
    
    // Clear cart
    Cart.clear();
    
    return order;
  },

  updateStatus(orderId, status) {
    const orders = this.get();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
    }
    this.save(orders);
    return order;
  },

  getById(orderId) {
    return this.get().find(o => o.id === orderId);
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

// ── Seed Demo Data ──
export function seedDemoData() {
  if (Orders.get().length > 0) return; // Already seeded

  const demoCustomers = [
    { name: 'Priya Shankar', phone: '9876543210', address: '45, Anna Nagar, Chennai - 600040' },
    { name: 'Karthik Vel', phone: '9876543211', address: '12, RS Puram, Coimbatore - 641002' },
    { name: 'Lakshmi Devi', phone: '9876543212', address: '78, Srirangam, Trichy - 620006' },
    { name: 'Ramesh Kumar', phone: '9876543213', address: '23, KK Nagar, Madurai - 625020' },
    { name: 'Meena Ravi', phone: '9876543214', address: '56, Thiruvanmiyur, Chennai - 600041' },
  ];

  const statuses = ['pending', 'processing', 'delivered', 'delivered', 'delivered'];
  const demoOrders = demoCustomers.map((cust, i) => {
    const items = [
      { id: i + 1, name: ['Karupu Kauvni Kanji', 'Ulunda Kanji', 'Sprouted Ragi Kanji', 'Millet Kanji', 'Bamboo Kanji'][i], tamilName: 'டெமோ', price: [89, 79, 99, 85, 119][i], qty: Math.ceil(Math.random() * 3) },
      { id: i + 6, name: ['Poondu Kanji', 'Moringa Kanji', 'Kerala Kanji', 'Pumpkin Kanji', 'Quinoa Kanji'][i], tamilName: 'டெமோ', price: [75, 95, 89, 79, 139][i], qty: Math.ceil(Math.random() * 2) }
    ];
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const delivery = subtotal >= 499 ? 0 : 49;
    const order = {
      id: `VF-DEMO${(i + 1).toString().padStart(3, '0')}`,
      customer: cust,
      items,
      subtotal,
      delivery,
      total: subtotal + delivery,
      status: statuses[i],
      createdAt: new Date(Date.now() - (i * 86400000)).toISOString(),
      updatedAt: new Date(Date.now() - (i * 43200000)).toISOString()
    };
    return order;
  });

  Orders.save(demoOrders);

  const demoCusts = demoCustomers.map((c, i) => ({
    id: `CUS-DEMO${(i + 1).toString().padStart(3, '0')}`,
    name: c.name,
    phone: c.phone,
    address: c.address,
    orders: [demoOrders[i].id],
    totalSpent: demoOrders[i].total,
    joinedAt: new Date(Date.now() - (i * 172800000)).toISOString(),
    lastOrder: demoOrders[i].createdAt
  }));

  Customers.save(demoCusts);
}

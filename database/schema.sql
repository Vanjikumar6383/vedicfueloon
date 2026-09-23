-- =========================================================================
-- VEDICFUELOON MASTER RELATIONAL SCHEMA
-- Standards: ANSI SQL, 3NF Normalization, Zero Plaintext PII, ACID Compliant
-- Initial State: 3 Tables with 0 rows (Clean & Ready for Future Ingestion)
-- Tables:
--   1. products
--   2. customers
--   3. orders
-- =========================================================================

PRAGMA foreign_keys = ON;

-- TABLE 1: PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    product_id          INTEGER PRIMARY KEY AUTOINCREMENT,
    sku                 VARCHAR(32) NOT NULL UNIQUE,
    name                VARCHAR(150) NOT NULL,
    tamil_name          VARCHAR(150) NOT NULL,
    category            VARCHAR(50) NOT NULL,
    sub_category        VARCHAR(50) NOT NULL,
    unit                VARCHAR(40) NOT NULL,
    price               DECIMAL(10,2) NOT NULL CHECK (price > 0),
    original_price      DECIMAL(10,2) NOT NULL CHECK (original_price >= price),
    cost_price          DECIMAL(10,2) NOT NULL CHECK (cost_price > 0),
    stock_quantity      INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    reorder_level       INTEGER NOT NULL DEFAULT 10,
    is_available        BOOLEAN NOT NULL DEFAULT 1,
    calories_kcal       INTEGER NOT NULL,
    protein_g           DECIMAL(5,1) NOT NULL,
    fiber_g             DECIMAL(5,1) NOT NULL,
    iron_pct            INTEGER NOT NULL,
    rating              DECIMAL(2,1) NOT NULL DEFAULT 5.0 CHECK (rating BETWEEN 1.0 AND 5.0),
    review_count        INTEGER NOT NULL DEFAULT 0,
    badge               VARCHAR(40) DEFAULT 'standard',
    shelf_life_days     INTEGER NOT NULL DEFAULT 1,
    is_organic          BOOLEAN NOT NULL DEFAULT 1,
    clay_pot_cooked     BOOLEAN NOT NULL DEFAULT 1,
    description         TEXT,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted          BOOLEAN DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_products_cat_avail ON products(category, is_available);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- TABLE 2: CUSTOMERS (SECURED WITH PII MASKING & ENCRYPTED HASHES)
CREATE TABLE IF NOT EXISTS customers (
    customer_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_code       VARCHAR(32) NOT NULL UNIQUE,
    first_name          VARCHAR(60) NOT NULL,
    last_name           VARCHAR(60) NOT NULL,
    email_masked        VARCHAR(120) NOT NULL,
    email_hash          CHAR(64) NOT NULL UNIQUE,
    phone_masked        VARCHAR(30) NOT NULL,
    phone_hash          CHAR(64) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,
    street_address      VARCHAR(255) NOT NULL,
    city                VARCHAR(100) NOT NULL,
    state               VARCHAR(50) NOT NULL DEFAULT 'Tamil Nadu',
    postal_code         VARCHAR(10) NOT NULL,
    customer_tier       VARCHAR(20) NOT NULL DEFAULT 'Bronze' CHECK (customer_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum', 'VIP')),
    total_orders        INTEGER NOT NULL DEFAULT 0 CHECK (total_orders >= 0),
    total_spent         DECIMAL(12,2) NOT NULL DEFAULT 0.00 CHECK (total_spent >= 0.00),
    consent_dpdp        BOOLEAN NOT NULL DEFAULT 1,
    consent_marketing   BOOLEAN NOT NULL DEFAULT 0,
    is_verified         BOOLEAN NOT NULL DEFAULT 1,
    is_active           BOOLEAN NOT NULL DEFAULT 1,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted          BOOLEAN DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_customers_code ON customers(customer_code);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);
CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(customer_tier);

-- TABLE 3: ORDERS (FINANCIAL TRANSACTION LEDGER)
CREATE TABLE IF NOT EXISTS orders (
    order_id            INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number        VARCHAR(32) NOT NULL UNIQUE,
    customer_id         INTEGER NOT NULL,
    product_id          INTEGER NOT NULL,
    product_sku         VARCHAR(32) NOT NULL,
    product_name        VARCHAR(150) NOT NULL,
    quantity            INTEGER NOT NULL CHECK (quantity > 0),
    unit_price          DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    subtotal            DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount          DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (tax_amount >= 0),
    delivery_fee        DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (delivery_fee >= 0),
    discount_amount     DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (discount_amount >= 0),
    net_payable         DECIMAL(10,2) NOT NULL CHECK (net_payable >= 0),
    payment_method      VARCHAR(30) NOT NULL CHECK (payment_method IN ('UPI', 'GPay', 'PhonePe', 'Paytm', 'Card', 'NetBanking', 'COD')),
    payment_status      VARCHAR(20) NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    order_status        VARCHAR(30) NOT NULL DEFAULT 'delivered' CHECK (order_status IN ('pending', 'confirmed', 'brewing', 'out_for_delivery', 'delivered', 'cancelled', 'refunded')),
    delivery_slot       VARCHAR(60) NOT NULL,
    delivery_address    TEXT NOT NULL,
    city                VARCHAR(100) NOT NULL,
    tracking_number     VARCHAR(40) NOT NULL UNIQUE,
    ip_hash             CHAR(64) NOT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted          BOOLEAN DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_orders_cust ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_prod ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
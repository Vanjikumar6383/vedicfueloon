-- =========================================================================
-- VEDICFUELOON — PREPARED SQL TEMPLATES FOR FUTURE DATA STORAGE
-- Use these statements to store future Product, Customer, and Order details
-- =========================================================================

-- =========================================================================
-- 1. INSERT TEMPLATE: FUTURE PRODUCT DATA
-- =========================================================================
INSERT INTO products (
    sku,
    name,
    tamil_name,
    category,
    sub_category,
    unit,
    price,
    original_price,
    cost_price,
    stock_quantity,
    reorder_level,
    is_available,
    calories_kcal,
    protein_g,
    fiber_g,
    iron_pct,
    shelf_life_days,
    is_organic,
    clay_pot_cooked,
    description
) VALUES (
    'SKU-KK-500ML',                      -- Unique SKU
    'Karupu Kauvni Kanji (500ml)',       -- English Name
    'கருப்பு கவுனி கஞ்சி (500மி.லி)',      -- Tamil Name
    'Kanji',                             -- Category (Kanji, Solid Eats, Sweets, etc.)
    'Medicinal Porridge',                -- Sub-Category
    '500ml Clay Pot',                    -- Unit packaging
    89.00,                               -- Selling Price (₹)
    120.00,                              -- Original MRP (₹)
    42.00,                               -- Cost Price (₹)
    50,                                  -- Starting Stock Quantity
    10,                                  -- Reorder Level Alert
    1,                                   -- Available (1=Yes, 0=No)
    160,                                 -- Calories (kcal)
    5.2,                                 -- Protein (g)
    4.1,                                 -- Dietary Fiber (g)
    18,                                  -- Iron (% DV)
    1,                                   -- Shelf Life (days)
    1,                                   -- 100% Organic (1=Yes)
    1,                                   -- Clay Pot Cooked (1=Yes)
    'Ancient emperor black rice porridge cooked slowly in unglazed clay pot with shallots and cumin.'
);

-- =========================================================================
-- 2. INSERT TEMPLATE: FUTURE CUSTOMER DATA (With PII Protection)
-- =========================================================================
-- Replace SHA-256 hash values with your backend hashing function
INSERT INTO customers (
    customer_code,
    first_name,
    last_name,
    email_masked,
    email_hash,
    phone_masked,
    phone_hash,
    password_hash,
    street_address,
    city,
    state,
    postal_code,
    customer_tier,
    consent_dpdp,
    consent_marketing
) VALUES (
    'CUS-20260901',                      -- Unique Customer Code
    'Senthil',                           -- First Name
    'Kumar',                             -- Last Name
    's****@gmail.com',                   -- Masked Email for Display
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', -- SHA-256 of lowercase email
    '+91 98****3210',                    -- Masked Phone for Display
    'ca978112ca1bbdcafac231b39a23dc4da786081496e67611593c6f2a6f874251', -- SHA-256 of phone number
    '$2b$12$e8Y6bF5U8mN6oP9qR2sTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZa',     -- Bcrypt Password Hash
    '42, Anna Nagar West',               -- Street Address
    'Chennai',                           -- City
    'Tamil Nadu',                        -- State
    '600040',                            -- Postal Code
    'Bronze',                            -- Customer Tier (Bronze, Silver, Gold, Platinum, VIP)
    1,                                   -- DPDP Consent (1=Consented)
    0                                    -- Marketing Opt-in
);

-- =========================================================================
-- 3. INSERT TEMPLATE: FUTURE ORDER DATA (Financial Transaction Ledger)
-- =========================================================================
INSERT INTO orders (
    order_number,
    customer_id,
    product_id,
    product_sku,
    product_name,
    quantity,
    unit_price,
    subtotal,
    tax_amount,
    delivery_fee,
    discount_amount,
    net_payable,
    payment_method,
    payment_status,
    order_status,
    delivery_slot,
    delivery_address,
    city,
    tracking_number,
    ip_hash
) VALUES (
    'ORD-260921-00001',                  -- Unique Order Number (or invoice number)
    1,                                   -- FK -> customers.customer_id
    1,                                   -- FK -> products.product_id
    'SKU-KK-500ML',                      -- Product SKU
    'Karupu Kauvni Kanji (500ml)',       -- Product Name
    2,                                   -- Quantity Ordered
    89.00,                               -- Unit Price
    178.00,                              -- Subtotal (2 * 89.00)
    8.90,                                -- 5% GST (Tax)
    49.00,                               -- Delivery Fee (0 if subtotal >= 499)
    0.00,                                -- Discount Amount
    235.90,                              -- Net Total Payable
    'UPI',                               -- Payment Method ('UPI', 'GPay', 'PhonePe', 'Card', 'COD')
    'paid',                              -- Payment Status ('pending', 'paid', 'failed', 'refunded')
    'confirmed',                         -- Order Status ('pending', 'confirmed', 'brewing', 'delivered')
    'Sunrise Slot (6:30 AM - 8:00 AM)',  -- Preferred Delivery Slot
    '42, Anna Nagar West, Chennai - 600040', -- Delivery Address
    'Chennai',                           -- City
    'TRK-VF-2026-0001',                  -- Tracking Number
    'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'  -- Anonymized IP hash
);

-- Update customer aggregates after order
UPDATE customers 
SET total_orders = total_orders + 1,
    total_spent = total_spent + 235.90,
    updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 1;

-- Deduct product stock after order
UPDATE products
SET stock_quantity = stock_quantity - 2,
    updated_at = CURRENT_TIMESTAMP
WHERE product_id = 1;

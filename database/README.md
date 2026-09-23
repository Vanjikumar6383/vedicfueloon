# VedicFueloon Enterprise Database Architecture & Data Dictionary
**Version**: 3.0.0 (Production Clean Release)  
**Status**: 3 Tables Empty (0 rows) — Ready for Future Data Ingestion  
**Compliance Standards**: ISO/IEC 27001, India DPDP Act (2023), GDPR, OWASP Top 10 Database Security  

---

## 1. Executive Summary

The **VedicFueloon** relational database has been initialized with **3 secure tables in an empty state (0 rows)**. All table definitions, primary keys, autoincrement sequences (starting at 1), check constraints, foreign keys, and indexes are configured and ready for live production use:

1. **`products`** (0 rows): Ready to store future products, heirloom grains, pricing, stock levels, and nutrition facts.
2. **`customers`** (0 rows): Ready to store future customer accounts and checkout patrons with salted SHA-256 PII protection, bcrypt passwords, and DPDP compliance flags.
3. **`orders`** (0 rows): Ready to store future financial order transactions, itemizations, GST tax breakdowns, delivery tracking, and payment verification details.

---

## 2. Table Schemas & Future Data Storage

### Table 1: `products`
Stores product catalog information for your e-commerce store.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique product identifier (starts at 1) |
| `sku` | `VARCHAR(32)` | `NOT NULL UNIQUE` | Unique SKU (e.g. `SKU-KK-500ML`) |
| `name` | `VARCHAR(150)` | `NOT NULL` | English product title |
| `tamil_name` | `VARCHAR(150)` | `NOT NULL` | Traditional Tamil product title |
| `category` | `VARCHAR(50)` | `NOT NULL` | Category (`Kanji`, `Solid Eats`, `Sweets`) |
| `sub_category`| `VARCHAR(50)` | `NOT NULL` | Secondary classification |
| `unit` | `VARCHAR(40)` | `NOT NULL` | Unit packaging (`500ml`, `200g`, `Pack of 4`) |
| `price` | `DECIMAL(10,2)`| `NOT NULL CHECK (price > 0)` | Customer selling price (₹) |
| `original_price`| `DECIMAL(10,2)`| `CHECK (original_price >= price)` | MRP / Strike-through price (₹) |
| `cost_price` | `DECIMAL(10,2)`| `CHECK (cost_price > 0)` | Wholesale / Preparation cost (₹) |
| `stock_quantity`| `INTEGER` | `DEFAULT 0 CHECK (stock >= 0)` | Real-time available inventory |
| `reorder_level`| `INTEGER` | `DEFAULT 10` | Minimum stock threshold alert |
| `is_available` | `BOOLEAN` | `DEFAULT 1` | Catalog visibility flag (1=Active) |
| `calories_kcal`| `INTEGER` | `NOT NULL` | Energy content per serving |
| `protein_g` | `DECIMAL(5,1)` | `NOT NULL` | Protein in grams |
| `fiber_g` | `DECIMAL(5,1)` | `NOT NULL` | Dietary fiber in grams |
| `iron_pct` | `INTEGER` | `NOT NULL` | Daily iron value percentage |
| `rating` | `DECIMAL(2,1)` | `DEFAULT 5.0 (1.0 to 5.0)` | Average customer review score |
| `review_count` | `INTEGER` | `DEFAULT 0` | Total verified reviews |
| `badge` | `VARCHAR(40)` | `DEFAULT 'standard'` | Ribbon tag (`new`, `bestseller`, etc.) |
| `shelf_life_days`| `INTEGER` | `DEFAULT 1` | Shelf life in days |
| `is_organic` | `BOOLEAN` | `DEFAULT 1` | 100% Certified organic flag |
| `clay_pot_cooked`| `BOOLEAN`| `DEFAULT 1` | Traditional clay pot cooking flag |
| `description` | `TEXT` | Nullable | Full medicinal and culinary description |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Registration timestamp |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Last modification timestamp |
| `is_deleted` | `BOOLEAN` | `DEFAULT 0` | Soft delete flag |

---

### Table 2: `customers`
Stores customer profiles with privacy-preserving PII tokenization.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `customer_id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique customer identifier (starts at 1) |
| `customer_code` | `VARCHAR(32)` | `NOT NULL UNIQUE` | Unique patron reference (`CUS-XXXXX`) |
| `first_name` | `VARCHAR(60)` | `NOT NULL` | Customer first name |
| `last_name` | `VARCHAR(60)` | `NOT NULL` | Customer last name |
| `email_masked` | `VARCHAR(120)`| `NOT NULL` | Masked email for display (`s****@gmail.com`) |
| `email_hash` | `CHAR(64)` | `NOT NULL UNIQUE` | Salted SHA-256 digest for $O(1)$ lookups |
| `phone_masked` | `VARCHAR(30)` | `NOT NULL` | Masked phone (`+91 98****3210`) |
| `phone_hash` | `CHAR(64)` | `NOT NULL UNIQUE` | Salted SHA-256 digest for lookups |
| `password_hash`| `VARCHAR(255)`| `NOT NULL` | Secure password hash (bcrypt / Argon2) |
| `street_address`| `VARCHAR(255)`| `NOT NULL` | Delivery street address |
| `city` | `VARCHAR(100)`| `NOT NULL` | Delivery city (e.g. Chennai) |
| `state` | `VARCHAR(50)` | `DEFAULT 'Tamil Nadu'` | State |
| `postal_code` | `VARCHAR(10)` | `NOT NULL` | 6-digit postal PIN code |
| `customer_tier`| `VARCHAR(20)` | `DEFAULT 'Bronze'` | Loyalty tier (`Bronze`, `Silver`, `Gold`, `VIP`) |
| `total_orders` | `INTEGER` | `DEFAULT 0` | Cumulative order count |
| `total_spent` | `DECIMAL(12,2)`| `DEFAULT 0.00` | Lifetime gross spend (₹) |
| `consent_dpdp` | `BOOLEAN` | `DEFAULT 1` | India DPDP Act 2023 consent flag |
| `consent_marketing`| `BOOLEAN` | `DEFAULT 0` | Marketing communications consent |
| `is_verified` | `BOOLEAN` | `DEFAULT 1` | Phone / OTP verification status |
| `is_active` | `BOOLEAN` | `DEFAULT 1` | Account active flag |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Signup timestamp |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Last updated timestamp |
| `is_deleted` | `BOOLEAN` | `DEFAULT 0` | Soft delete flag |

---

### Table 3: `orders`
Stores order records and financial ledger details for every purchase.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique order identifier (starts at 1) |
| `order_number` | `VARCHAR(32)` | `NOT NULL UNIQUE` | Order code (`ORD-YYMMDD-XXXXX`) |
| `customer_id` | `INTEGER` | `NOT NULL FOREIGN KEY` | References `customers(customer_id)` |
| `product_id` | `INTEGER` | `NOT NULL FOREIGN KEY` | References `products(product_id)` |
| `product_sku` | `VARCHAR(32)` | `NOT NULL` | SKU snapshot at purchase time |
| `product_name` | `VARCHAR(150)`| `NOT NULL` | Name snapshot at purchase time |
| `quantity` | `INTEGER` | `NOT NULL CHECK (qty > 0)`| Units purchased |
| `unit_price` | `DECIMAL(10,2)`| `NOT NULL CHECK (price > 0)`| Price per unit at purchase time |
| `subtotal` | `DECIMAL(10,2)`| `NOT NULL` | `quantity * unit_price` |
| `tax_amount` | `DECIMAL(10,2)`| `DEFAULT 0.00` | GST tax component (5%) |
| `delivery_fee` | `DECIMAL(10,2)`| `DEFAULT 0.00` | Shipping charge (₹49 or ₹0 if >= ₹499) |
| `discount_amount`| `DECIMAL(10,2)`| `DEFAULT 0.00` | Applied voucher / discount |
| `net_payable` | `DECIMAL(10,2)`| `NOT NULL` | Final total (`subtotal + tax + fee - disc`) |
| `payment_method`| `VARCHAR(30)` | `NOT NULL` | `UPI`, `GPay`, `PhonePe`, `Card`, `COD` |
| `payment_status`| `VARCHAR(20)` | `DEFAULT 'paid'` | `pending`, `paid`, `failed`, `refunded` |
| `order_status` | `VARCHAR(30)` | `DEFAULT 'confirmed'` | `pending`, `confirmed`, `brewing`, `delivered` |
| `delivery_slot` | `VARCHAR(60)` | `NOT NULL` | e.g. `Sunrise Slot (6:30 AM - 8:00 AM)` |
| `delivery_address`| `TEXT` | `NOT NULL` | Full shipping destination address |
| `city` | `VARCHAR(100)`| `NOT NULL` | Delivery city |
| `tracking_number`| `VARCHAR(40)` | `NOT NULL UNIQUE` | Courier / dispatch tracking reference |
| `ip_hash` | `CHAR(64)` | `NOT NULL` | SHA-256 anonymized IP digest for audit |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Order placement timestamp |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Last status update timestamp |
| `is_deleted` | `BOOLEAN` | `DEFAULT 0` | Soft delete flag |

---

## 3. Directory File Inventory

All files in this directory are configured for empty production deployment:

| File | Description |
| :--- | :--- |
| **[`vedicfueloon.db`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/vedicfueloon.db)** | Production SQLite 3 binary database with the 3 empty tables (0 rows). |
| **[`schema.sql`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/schema.sql)** | Complete DDL script to create the 3 tables, indexes, and constraints. |
| **[`init_empty_database.sql`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/init_empty_database.sql)** | Standalone SQL script to reset and initialize empty tables. |
| **[`insert_templates.sql`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/insert_templates.sql)** | Ready-to-use SQL `INSERT` statements for storing future products, customers, and orders. |
| **[`products.csv`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/products.csv)** | Empty CSV template with column headers for bulk product imports. |
| **[`customers.csv`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/customers.csv)** | Empty CSV template with column headers for customer imports. |
| **[`orders.csv`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/orders.csv)** | Empty CSV template with column headers for order imports. |
| **[`db_manager.py`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/db_manager.py)** | Python management CLI to inspect status, insert future records, and clear tables. |
| **[`archive_500_demo_rows/`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/archive_500_demo_rows)** | Contains previous synthetic 500-row demo data archived for historical reference. |

---

## 4. How to Inspect & Store Future Data

### Command-Line Status Check:
Run the database manager utility to check current table counts:
```bash
python database/db_manager.py status
```
Output:
```
=================================================================
 VEDICFUELOON ENTERPRISE DATABASE STATUS (vedicfueloon.db)
=================================================================
 • Table 'products    ':     0 rows  --> EMPTY (Ready for future data)
 • Table 'customers   ':     0 rows  --> EMPTY (Ready for future data)
 • Table 'orders      ':     0 rows  --> EMPTY (Ready for future data)
-----------------------------------------------------------------
 Database Health: ok
=================================================================
```

### Storing Future Data via Python:
```python
from database.db_manager import add_future_product, add_future_customer, add_future_order

# 1. Store a future product:
pid = add_future_product(
    sku="SKU-KK-500",
    name="Karupu Kauvni Kanji",
    tamil_name="கருப்பு கவுனி கஞ்சி",
    category="Kanji",
    sub_category="Medicinal Porridge",
    unit="500ml",
    price=89.0,
    cost_price=45.0,
    stock_qty=50
)

# 2. Store a future customer:
cid = add_future_customer(
    first_name="Senthil",
    last_name="Kumar",
    email="senthil@gmail.com",
    phone="+919876543210",
    street_address="42 Anna Nagar West",
    city="Chennai",
    postal_code="600040"
)

# 3. Store a future order:
oid = add_future_order(
    customer_id=cid,
    product_id=pid,
    product_sku="SKU-KK-500",
    product_name="Karupu Kauvni Kanji",
    quantity=2,
    unit_price=89.0,
    payment_method="UPI"
)
```

### Storing Future Data via SQL:
See [`insert_templates.sql`](file:///d:/tools%20docx/Freelancing/VedicFueloon/database/insert_templates.sql) for exact SQL queries.

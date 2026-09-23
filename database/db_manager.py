"""
VEDICFUELOON — DATABASE MANAGER UTILITY
Senior Data Engineer & Database Manager
Manage, Inspect, and Ingest future Customer, Product, and Order data
"""

import sqlite3
import os
import sys
import hashlib
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'vedicfueloon.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.row_factory = sqlite3.Row
    return conn

def show_status():
    conn = get_connection()
    cur = conn.cursor()
    print("=" * 65)
    print(" VEDICFUELOON ENTERPRISE DATABASE STATUS (vedicfueloon.db)")
    print("=" * 65)
    tables = ['products', 'customers', 'orders']
    for t in tables:
        cur.execute(f"SELECT COUNT(*) FROM {t};")
        count = cur.fetchone()[0]
        state = "EMPTY (Ready for future data)" if count == 0 else f"{count} records"
        print(f" • Table '{t:<12}': {count:>5} rows  --> {state}")
    print("-" * 65)
    cur.execute("PRAGMA integrity_check;")
    print(f" Database Health: {cur.fetchone()[0]}")
    print("=" * 65)
    conn.close()

def clear_tables():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys = OFF;")
    cur.execute("DELETE FROM orders;")
    cur.execute("DELETE FROM customers;")
    cur.execute("DELETE FROM products;")
    try:
        cur.execute("DELETE FROM sqlite_sequence WHERE name IN ('products', 'customers', 'orders');")
    except sqlite3.OperationalError:
        pass
    cur.execute("PRAGMA foreign_keys = ON;")
    conn.commit()
    cur.execute("VACUUM;")
    conn.commit()
    conn.close()
    print("[SUCCESS] All 3 tables ('products', 'customers', 'orders') have been cleared to 0 rows.")

def add_future_product(sku, name, tamil_name, category, sub_category, unit, price, cost_price, stock_qty=50, original_price=None, calories=150, protein=5.0, fiber=4.0, iron_pct=15, description=""):
    conn = get_connection()
    cur = conn.cursor()
    orig = original_price if original_price is not None else price
    sql = """
    INSERT INTO products (
        sku, name, tamil_name, category, sub_category, unit,
        price, original_price, cost_price, stock_quantity,
        calories_kcal, protein_g, fiber_g, iron_pct, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cur.execute(sql, (sku, name, tamil_name, category, sub_category, unit, price, orig, cost_price, stock_qty, calories, protein, fiber, iron_pct, description))
    pid = cur.lastrowid
    conn.commit()
    conn.close()
    print(f"[STORED] Future Product added successfully: ID={pid}, SKU={sku}, Name='{name}'")
    return pid

def add_future_customer(first_name, last_name, email, phone, street_address, city="Chennai", postal_code="600040", state="Tamil Nadu"):
    conn = get_connection()
    cur = conn.cursor()
    code = f"CUS-{hashlib.sha256((phone + email).encode()).hexdigest()[:8].upper()}"
    email_hash = hashlib.sha256(email.lower().strip().encode()).hexdigest()
    phone_clean = ''.join(filter(str.isdigit, phone))
    phone_hash = hashlib.sha256(phone_clean.encode()).hexdigest()
    
    # Masking
    email_parts = email.split('@')
    masked_email = email_parts[0][0] + "****@" + (email_parts[1] if len(email_parts) > 1 else 'mail.com')
    masked_phone = phone_clean[:2] + "****" + phone_clean[-2:] if len(phone_clean) >= 4 else phone_clean
    pw_hash = "$2b$12$e8Y6bF5U8mN6oP9qR2sTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZa"

    sql = """
    INSERT INTO customers (
        customer_code, first_name, last_name, email_masked, email_hash,
        phone_masked, phone_hash, password_hash, street_address, city, state, postal_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cur.execute(sql, (code, first_name, last_name, masked_email, email_hash, masked_phone, phone_hash, pw_hash, street_address, city, state, postal_code))
    cid = cur.lastrowid
    conn.commit()
    conn.close()
    print(f"[STORED] Future Customer added successfully: ID={cid}, Code={code}, Name='{first_name} {last_name}'")
    return cid

def add_future_order(customer_id, product_id, product_sku, product_name, quantity, unit_price, payment_method="UPI", delivery_slot="Morning 6:00 AM - 8:00 AM", delivery_address="42 Anna Nagar, Chennai", city="Chennai"):
    conn = get_connection()
    cur = conn.cursor()
    now_str = datetime.now().strftime("%y%m%d")
    cur.execute("SELECT COUNT(*) FROM orders;")
    seq = cur.fetchone()[0] + 1
    order_num = f"ORD-{now_str}-{seq:05d}"
    subtotal = round(quantity * unit_price, 2)
    tax = round(subtotal * 0.05, 2)
    delivery_fee = 0.00 if subtotal >= 499 else 49.00
    net = round(subtotal + tax + delivery_fee, 2)
    tracking = f"TRK-{now_str}-{hashlib.md5(order_num.encode()).hexdigest()[:8].upper()}"
    ip_hash = hashlib.sha256("127.0.0.1".encode()).hexdigest()

    sql = """
    INSERT INTO orders (
        order_number, customer_id, product_id, product_sku, product_name,
        quantity, unit_price, subtotal, tax_amount, delivery_fee, net_payable,
        payment_method, payment_status, order_status, delivery_slot, delivery_address,
        city, tracking_number, ip_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', 'confirmed', ?, ?, ?, ?, ?)
    """
    cur.execute(sql, (order_num, customer_id, product_id, product_sku, product_name, quantity, unit_price, subtotal, tax, delivery_fee, net, payment_method, delivery_slot, delivery_address, city, tracking, ip_hash))
    oid = cur.lastrowid
    
    # Update customer stats
    cur.execute("UPDATE customers SET total_orders = total_orders + 1, total_spent = total_spent + ? WHERE customer_id = ?;", (net, customer_id))
    # Deduct stock
    cur.execute("UPDATE products SET stock_quantity = MAX(0, stock_quantity - ?) WHERE product_id = ?;", (quantity, product_id))
    
    conn.commit()
    conn.close()
    print(f"[STORED] Future Order added successfully: ID={oid}, OrderNo={order_num}, Net=Rs.{net}")
    return oid

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'clear':
        clear_tables()
        show_status()
    elif len(sys.argv) > 1 and sys.argv[1] == 'sample':
        print("Adding sample test record to demonstrate future data storage...")
        pid = add_future_product("SKU-KK-500", "Karupu Kauvni Kanji", "கருப்பு கவுனி கஞ்சி", "Kanji", "Medicinal Porridge", "500ml", 89.0, 45.0, 50, 120.0, 160, 5.2, 4.1, 18, "Clay pot cooked black rice kanji")
        cid = add_future_customer("Senthil", "Kumar", "senthil@gmail.com", "+919876543210", "42 Anna Nagar West", "Chennai", "600040")
        oid = add_future_order(cid, pid, "SKU-KK-500", "Karupu Kauvni Kanji", 2, 89.0, "UPI")
        show_status()
    else:
        show_status()

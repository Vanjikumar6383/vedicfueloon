import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'vedicfueloon.db')
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Check existing counts
print("--- PREVIOUS ROW COUNTS ---")
for t in ['products', 'customers', 'orders']:
    try:
        cur.execute(f"SELECT COUNT(*) FROM {t}")
        print(f"Table '{t}': {cur.fetchone()[0]} rows")
    except Exception as e:
        print(f"Table '{t}': {e}")

# Truncate / delete all records
print("\n--- EMPTYING TABLES ---")
cur.execute("PRAGMA foreign_keys = OFF;")
cur.execute("DELETE FROM orders;")
cur.execute("DELETE FROM customers;")
cur.execute("DELETE FROM products;")

# Reset autoincrement sequences
try:
    cur.execute("DELETE FROM sqlite_sequence WHERE name IN ('products', 'customers', 'orders');")
except sqlite3.OperationalError:
    pass

cur.execute("PRAGMA foreign_keys = ON;")
conn.commit()

# VACUUM to reclaim space and compact the database
cur.execute("VACUUM;")
conn.commit()

print("--- NEW ROW COUNTS ---")
for t in ['products', 'customers', 'orders']:
    cur.execute(f"SELECT COUNT(*) FROM {t}")
    count = cur.fetchone()[0]
    print(f"Table '{t}': {count} rows (EMPTY)")

# Integrity check
cur.execute("PRAGMA integrity_check;")
status = cur.fetchone()[0]
print(f"PRAGMA integrity_check: {status}")

conn.close()
print("vedicfueloon.db is now completely empty and production-ready.")

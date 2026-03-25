import sqlite3
import os

db_path = r'c:\Users\PRABHU\Documents\hushh project (2)\hushh project\dropoff-intelligence\backend\dropoff_analytics.db'
if not os.path.exists(db_path):
    print(f"DB not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT * FROM user_events ORDER BY timestamp DESC LIMIT 10;")
rows = cursor.fetchall()

if not rows:
    print("No events found in user_events table.")
else:
    for row in rows:
        print(row)

conn.close()

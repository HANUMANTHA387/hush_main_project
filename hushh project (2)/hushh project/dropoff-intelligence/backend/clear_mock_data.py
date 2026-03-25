import sqlite3
import os

db_path = r'c:\Users\PRABHU\Documents\hushh project (2)\hushh project\dropoff-intelligence\backend\dropoff_analytics.db'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM user_events WHERE session_id LIKE 'usr_%';")
    print(f"Deleted {cursor.rowcount} rows with session_id starting with 'usr_'.")
    conn.commit()
    conn.close()
else:
    print("Database file not found.")

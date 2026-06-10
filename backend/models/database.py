import sqlite3

# =========================================
# DATABASE CONNECTION
# =========================================

conn = sqlite3.connect(
    "agromind.db",
    check_same_thread=False
)

cursor = conn.cursor()

# =========================================
# USERS TABLE
# =========================================

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        username TEXT,

        email TEXT UNIQUE,

        password BLOB

    )
    """
)

conn.commit()

# =========================================
# CHATS TABLE
# =========================================

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS chats (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        chat_id TEXT,

        user_email TEXT,

        sender TEXT,

        message TEXT

    )
    """
)

conn.commit()

# =========================================
# WEATHER CHECKS TABLE
# =========================================

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS weather_checks (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_email TEXT,

        city TEXT

    )
    """
)

conn.commit()

# =========================================
# SUCCESS MESSAGE
# =========================================

print(
    "✅ Database Connected Successfully"
)
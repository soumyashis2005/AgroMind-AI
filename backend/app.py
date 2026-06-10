import bcrypt
import os
import base64
import requests
import uuid

from flask import (
    Flask,
    request,
    jsonify,
)

from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

from models.database import (
    conn,
    cursor,
)

# =========================================
# LOAD ENV
# =========================================

load_dotenv()

# =========================================
# API KEYS
# =========================================

groq_api_key = os.getenv(
    "GROQ_API_KEY"
)

weather_api_key = os.getenv(
    "WEATHER_API_KEY"
)

# =========================================
# GROQ CLIENT
# =========================================

groq_client = Groq(
    api_key=groq_api_key
)

# =========================================
# FLASK APP
# =========================================

app = Flask(__name__)

CORS(app)

# =========================================
# HOME ROUTE
# =========================================

@app.route("/")
def home():

    return "✅ AgroMind AI Backend Running"

# =========================================
# WEATHER API
# =========================================

@app.route("/weather")
def weather():

    city = request.args.get(
        "city",
        "Kolkata"
    )

    user_email = request.args.get(
        "email"
    )

    try:

        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}"
            f"&appid={weather_api_key}"
            f"&units=metric"
        )

        response = requests.get(
            url,
            timeout=5
        )

        data = response.json()

        if "main" not in data:

            return jsonify({

                "error":
                    data.get(
                        "message",
                        "Weather API Error"
                    )

            })

        # =====================================
        # SAVE WEATHER CHECK
        # =====================================

        cursor.execute(
            """
            INSERT INTO weather_checks (

                city,
                user_email

            )
            VALUES (?, ?)
            """,
            (
                city,
                user_email
            )
        )

        conn.commit()

        return jsonify({

            "city":
                city,

            "temperature":
                data["main"]["temp"],

            "humidity":
                data["main"]["humidity"],

            "wind_speed":
                data["wind"]["speed"],

            "description":
                data["weather"][0]["description"]

        })

    except Exception as e:

        print("WEATHER ERROR:", e)

        return jsonify({

            "error":
                str(e)

        })

# =========================================
# WEATHER PREVIEW
# =========================================

@app.route("/weather-preview")
def weather_preview():

    city = request.args.get(
        "city",
        "Kolkata"
    )

    try:

        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}"
            f"&appid={weather_api_key}"
            f"&units=metric"
        )

        response = requests.get(
            url,
            timeout=5
        )

        data = response.json()

        if data.get("cod") != 200:

            return jsonify({

                "error":
                    "City not found"

            })

        return jsonify({

            "city":
                data["name"],

            "temperature":
                data["main"]["temp"],

            "humidity":
                data["main"]["humidity"],

            "wind_speed":
                data["wind"]["speed"],

            "description":
                data["weather"][0]["description"]

        })

    except Exception as e:

        print("PREVIEW ERROR:", e)

        return jsonify({

            "error":
                str(e)

        })

# =========================================
# CHAT + DISEASE DETECTION
# =========================================

@app.route(
    "/chat",
    methods=["POST"]
)
def chat():

    try:

        user_message = request.form.get(
            "message"
        )

        image = request.files.get(
            "image"
        )

        chat_id = request.form.get(
            "chat_id"
        )

        user_email = request.form.get(
            "user_email"
        )

        print("USER:", user_message)

        print("IMAGE:", image)

        # =====================================
        # GENERATE CHAT ID
        # =====================================

        if not chat_id:

            chat_id = str(
                uuid.uuid4()
            )

        if not user_email:

            user_email = (
                "guest@agromind.ai"
            )

        # =====================================
        # IMAGE ANALYSIS
        # =====================================

        if image:

            image_bytes = image.read()

            base64_image = base64.b64encode(
                image_bytes
            ).decode("utf-8")

            completion = (
                groq_client.chat.completions.create(

                    model=
                    "meta-llama/llama-4-scout-17b-16e-instruct",

                    messages=[

                        {
                            "role": "user",

                            "content": [

                                {
                                    "type": "text",

                                    "text":
"""
Analyze this crop image carefully.

Identify:

1. Crop disease
2. Symptoms
3. Causes
4. Treatment
5. Prevention

Explain simply for farmers.
"""
                                },

                                {
                                    "type":
                                        "image_url",

                                    "image_url": {
                                        "url":
f"data:image/jpeg;base64,{base64_image}"
                                    }
                                }

                            ]
                        }

                    ]

                )
            )

            ai_reply = (
                completion
                .choices[0]
                .message
                .content
            )

            # =====================================
            # SAVE DISEASE SCAN
            # =====================================

            cursor.execute(
                """
                INSERT INTO chats (

                    chat_id,
                    user_email,
                    sender,
                    message

                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    chat_id,
                    user_email,
                    "user",
                    "disease analysis"
                )
            )

            conn.commit()

            print(
                "✅ Disease Scan Saved"
            )

            # =====================================
            # SAVE AI RESPONSE
            # =====================================

            cursor.execute(
                """
                INSERT INTO chats (

                    chat_id,
                    user_email,
                    sender,
                    message

                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    chat_id,
                    user_email,
                    "ai",
                    ai_reply
                )
            )

            conn.commit()

        # =====================================
        # NORMAL CHAT
        # =====================================

        else:

            completion = (
                groq_client.chat.completions.create(

                    model="openai/gpt-oss-20b",

                    messages=[

                        {
                            "role": "system",

                            "content":
"""
You are AgroMind AI.

You help farmers with:
- crops
- diseases
- fertilizers
- irrigation
- weather
- pesticides
- farming tips

Always answer simply.
"""
                        },

                        {
                            "role": "user",

                            "content":
                                user_message
                        }

                    ]

                )
            )

            ai_reply = (
                completion
                .choices[0]
                .message
                .content
            )

            # =====================================
            # SAVE USER MESSAGE
            # =====================================

            cursor.execute(
                """
                INSERT INTO chats (

                    chat_id,
                    user_email,
                    sender,
                    message

                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    chat_id,
                    user_email,
                    "user",
                    user_message
                )
            )

            # =====================================
            # SAVE AI RESPONSE
            # =====================================

            cursor.execute(
                """
                INSERT INTO chats (

                    chat_id,
                    user_email,
                    sender,
                    message

                )
                VALUES (?, ?, ?, ?)
                """,
                (
                    chat_id,
                    user_email,
                    "ai",
                    ai_reply
                )
            )

            conn.commit()

        print("AI:", ai_reply)

        return jsonify({

            "reply":
                ai_reply,

            "chat_id":
                chat_id

        })

    except Exception as e:

        print("CHAT ERROR:", str(e))

        return jsonify({

            "reply":
                f"⚠️ AI Error: {str(e)}"

        })

# =========================================
# REGISTER
# =========================================

@app.route(
    "/register",
    methods=["POST"]
)
def register():

    try:

        data = request.json

        username = data.get(
            "username"
        )

        email = data.get(
            "email"
        )

        password = data.get(
            "password"
        )

        cursor.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        )

        existing_user = (
            cursor.fetchone()
        )

        if existing_user:

            return jsonify({

                "error":
                    "User already exists"

            }), 400

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        cursor.execute(
            """
            INSERT INTO users (

                username,
                email,
                password

            )
            VALUES (?, ?, ?)
            """,
            (
                username,
                email,
                hashed_password
            )
        )

        conn.commit()

        return jsonify({

            "message":
                "User registered successfully"

        })

    except Exception as e:

        print("REGISTER ERROR:", e)

        return jsonify({

            "error":
                str(e)

        })

# =========================================
# LOGIN
# =========================================

@app.route(
    "/login",
    methods=["POST"]
)
def login():

    try:

        data = request.json

        email = data.get(
            "email"
        )

        password = data.get(
            "password"
        )

        cursor.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        )

        user = cursor.fetchone()

        if not user:

            return jsonify({

                "error":
                    "User not found"

            }), 404

        stored_password = user[3]

        if bcrypt.checkpw(
            password.encode("utf-8"),
            stored_password
        ):

            return jsonify({

                "message":
                    "Login successful",

                "username":
                    user[1],

                "email":
                    user[2]

            })

        return jsonify({

            "error":
                "Invalid password"

        }), 401

    except Exception as e:

        print("LOGIN ERROR:", e)

        return jsonify({

            "error":
                str(e)

        })

# =========================================
# GET CHATS
# =========================================

@app.route("/get-chats/<chat_id>")
def get_chats(chat_id):

    try:

        cursor.execute(
            """
            SELECT sender, message
            FROM chats
            WHERE chat_id = ?
            """,
            (chat_id,)
        )

        chats = cursor.fetchall()

        formatted_chats = []

        for chat in chats:

            formatted_chats.append({

                "sender":
                    chat[0],

                "text":
                    chat[1]

            })

        return jsonify(
            formatted_chats
        )

    except Exception as e:

        print("GET CHAT ERROR:", e)

        return jsonify([])

# =========================================
# CHAT HISTORY
# =========================================

@app.route("/get-chat-history/<email>")
def get_chat_history(email):

    try:

        cursor.execute(
            """
            SELECT
                chat_id,
                message
            FROM chats
            WHERE user_email = ?
            AND sender = 'user'
            GROUP BY chat_id
            ORDER BY id DESC
            """,
            (email,)
        )

        chats = cursor.fetchall()

        history = []

        for chat in chats:

            history.append({

                "chat_id":
                    chat[0],

                "title":
                    chat[1][:30]

            })

        return jsonify(history)

    except Exception as e:

        print("HISTORY ERROR:", e)

        return jsonify([])

# =========================================
# DELETE CHAT
# =========================================

@app.route(
    "/delete-chat/<chat_id>",
    methods=["DELETE"]
)
def delete_chat(chat_id):

    try:

        cursor.execute(
            """
            DELETE FROM chats
            WHERE chat_id = ?
            """,
            (chat_id,)
        )

        conn.commit()

        return jsonify({

            "message":
                "Chat deleted"

        })

    except Exception as e:

        print("DELETE ERROR:", e)

        return jsonify({

            "error":
                str(e)

        })

# =========================================
# DASHBOARD STATS
# =========================================

@app.route("/stats")
def get_stats():

    try:

        user_email = request.args.get(
            "email"
        )

        print(
            "USER EMAIL:",
            user_email
        )

        # =====================================
        # AI QUERIES
        # =====================================

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM chats
            WHERE user_email = ?
            AND sender = 'user'
            """,
            (user_email,)
        )

        ai_queries = (
            cursor.fetchone()[0]
        )

        # =====================================
        # DISEASE SCANS
        # =====================================

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM chats
            WHERE user_email = ?
            AND message = 'disease analysis'
            """,
            (user_email,)
        )

        disease_scans = (
            cursor.fetchone()[0]
        )

        # =====================================
        # WEATHER CHECKS
        # =====================================

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM weather_checks
            WHERE user_email = ?
            """,
            (user_email,)
        )

        weather_checks = (
            cursor.fetchone()[0]
        )

        # =====================================
        # FARM HEALTH
        # =====================================

        if disease_scans == 0:

            farm_health = "100%"

        elif disease_scans <= 3:

            farm_health = "92%"

        elif disease_scans <= 7:

            farm_health = "85%"

        else:

            farm_health = "72%"

        return jsonify({

            "ai_queries":
                ai_queries,

            "disease_scans":
                disease_scans,

            "weather_checks":
                weather_checks,

            "farm_health":
                farm_health

        })

    except Exception as e:

        print(
            "STATS ERROR:",
            e
        )

        return jsonify({

            "ai_queries": 0,

            "disease_scans": 0,

            "weather_checks": 0,

            "farm_health": "92%"

        })

# =========================================
# RUN SERVER
# =========================================

if __name__ == "__main__":

    app.run(
        debug=True
    )
import sqlite3
import json
from datetime import datetime
import logging

DB_NAME = "ayurai.db"
logger = logging.getLogger("AyurAI.DB")

def init_db():
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                diagnosis TEXT NOT NULL,
                symptoms TEXT,
                scores TEXT,
                contradictions TEXT,
                explanation TEXT,
                recommendations TEXT
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                report_id INTEGER,
                rating INTEGER,
                comments TEXT,
                timestamp TEXT,
                FOREIGN KEY(report_id) REFERENCES reports(id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                hashed_password TEXT NOT NULL,
                full_name TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

def create_user(email, hashed_password, full_name):
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (email, hashed_password, full_name) VALUES (?, ?, ?)', 
                       (email, hashed_password, full_name))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return user_id
    except sqlite3.IntegrityError:
        return None # Email exists
    except Exception as e:
        logger.error(f"Failed to create user: {e}")
        return None

def get_user_by_email(email):
    try:
        conn = sqlite3.connect(DB_NAME)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        conn.close()
        return dict(user) if user else None
    except Exception as e:
        logger.error(f"Failed to get user: {e}")
        return None

def save_report(diagnosis, symptoms, scores, contradictions, explanation, recommendations):
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        timestamp = datetime.now().isoformat()
        
        cursor.execute('''
            INSERT INTO reports (timestamp, diagnosis, symptoms, scores, contradictions, explanation, recommendations)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            timestamp,
            diagnosis,
            json.dumps(symptoms),
            json.dumps(scores),
            json.dumps(contradictions),
            explanation,
            json.dumps(recommendations)
        ))
        
        conn.commit()
        report_id = cursor.lastrowid
        conn.close()
        return report_id
    except Exception as e:
        logger.error(f"Failed to save report: {e}")
        return None

def save_feedback(report_id, rating, comments):
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        timestamp = datetime.now().isoformat()
        
        cursor.execute('''
            INSERT INTO feedback (report_id, rating, comments, timestamp)
            VALUES (?, ?, ?, ?)
        ''', (report_id, rating, comments, timestamp))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Failed to save feedback: {e}")
        return False

def get_history(limit=10):
    try:
        conn = sqlite3.connect(DB_NAME)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM reports ORDER BY timestamp DESC LIMIT ?', (limit,))
        rows = cursor.fetchall()
        
        history = []
        for row in rows:
            history.append({
                "id": row["id"],
                "timestamp": row["timestamp"],
                "diagnosis": row["diagnosis"],
                "symptoms": json.loads(row["symptoms"]) if row["symptoms"] else [],
                "scores": json.loads(row["scores"]) if row["scores"] else {},
                "contradictions": json.loads(row["contradictions"]) if row["contradictions"] else [],
                "explanation": row["explanation"],
                "recommendations": json.loads(row["recommendations"]) if row["recommendations"] else []
            })
            
        conn.close()
        return history
    except Exception as e:
        logger.error(f"Failed to fetch history: {e}")
        return []

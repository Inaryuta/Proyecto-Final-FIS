from db import get_connection

def create_user(nombre, correo, contrasena, rol_id):
    conn = get_connection()
    if not conn:
        return None
    try:
        cursor = conn.cursor()
        query = """
            INSERT INTO usuarios (nombre, correo, contrasena, rol_id)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (nombre, correo, contrasena, rol_id))
        conn.commit()
        return cursor.lastrowid
    except Exception as e:
        print(f"Error en create_user: {e}")
        return None
    finally:
        cursor.close()
        conn.close()

def get_user_by_email(correo):
    conn = get_connection()
    if not conn:
        return None
    try:
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM usuarios WHERE correo = %s"
        cursor.execute(query, (correo,))
        return cursor.fetchone()
    except Exception as e:
        print(f"Error en get_user_by_email: {e}")
        return None
    finally:
        cursor.close()
        conn.close()

from db import get_connection

def crear_carrito(usuario_id, fecha_creacion):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO carrito (usuario_id, fecha_creacion) VALUES (%s, %s)",
        (usuario_id, fecha_creacion)
    )
    conn.commit()
    carrito_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return carrito_id

def obtener_carrito_por_usuario(usuario_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM carrito WHERE usuario_id = %s",
        (usuario_id,)
    )
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result

def eliminar_carrito(carrito_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM carrito WHERE id = %s", (carrito_id,))
    conn.commit()
    cursor.close()
    conn.close()

# Métodos para manejar los items
def agregar_item_al_carrito(carrito_id, camiseta_personalizada_id, cantidad):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO items_carrito (carrito_id, camiseta_personalizada_id, cantidad) VALUES (%s, %s, %s)",
        (carrito_id, camiseta_personalizada_id, cantidad)
    )
    conn.commit()
    cursor.close()
    conn.close()

def eliminar_item_del_carrito(item_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items_carrito WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    conn.close()

def obtener_items_carrito(carrito_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT i.id, i.cantidad, c.talla, c.color, c.material, c.precio, e.titulo
        FROM items_carrito i
        JOIN camisetas_personalizadas cp ON i.camiseta_personalizada_id = cp.id
        JOIN camisetas c ON cp.camiseta_id = c.id
        JOIN estampas e ON cp.estampa_id = e.id
        WHERE i.carrito_id = %s
        """,
        (carrito_id,)
    )
    items = cursor.fetchall()
    cursor.close()
    conn.close()
    return items

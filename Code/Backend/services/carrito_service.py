from CRUD import carrito as carrito_db
from datetime import datetime

def crear_carrito_para_usuario(usuario_id):
    fecha = datetime.now()
    return carrito_db.crear_carrito(usuario_id, fecha)

def obtener_carrito_de_usuario(usuario_id):
    return carrito_db.obtener_carrito_por_usuario(usuario_id)

def obtener_items_de_carrito(carrito_id):
    return carrito_db.obtener_items_carrito(carrito_id)

def agregar_item(carrito_id, camiseta_personalizada_id, cantidad):
    return carrito_db.agregar_item_al_carrito(carrito_id, camiseta_personalizada_id, cantidad)

def eliminar_item(item_id):
    return carrito_db.eliminar_item_del_carrito(item_id)

def eliminar_carrito(carrito_id):
    return carrito_db.eliminar_carrito(carrito_id)

def crear_carrito_si_no_existe(usuario_id):
    carrito_existente = carrito_db.obtener_carrito_por_usuario(usuario_id)
    if carrito_existente:
        return {"message": "Ya tiene un carrito", "carrito": carrito_existente, "success": True}
    fecha_creacion = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    carrito_db.crear_carrito(usuario_id, fecha_creacion)
    nuevo_carrito = carrito_db.obtener_carrito_por_usuario(usuario_id)
    return {"message": "Carrito creado", "carrito": nuevo_carrito, "success": True}

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

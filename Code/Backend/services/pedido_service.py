from CRUD import pedido as pedido_db
from datetime import datetime

def registrar_pedido(usuario_id, metodo_pago_id, items):
    """
    items: lista de diccionarios con keys:
    - camiseta_personalizada_id
    - cantidad
    - subtotal
    """

    fecha = datetime.now()
    total = sum(item["subtotal"] for item in items)
    estado = "pendiente"  # o "pagado", según lo que definas

    pedido_id = pedido_db.crear_pedido(usuario_id, total, metodo_pago_id, estado, fecha)

    for item in items:
        pedido_db.agregar_detalle_pedido(
            pedido_id,
            item["camiseta_personalizada_id"],
            item["cantidad"],
            item["subtotal"]
        )

    return pedido_id

def obtener_pedidos_de_usuario(usuario_id):
    return pedido_db.obtener_pedidos_por_usuario(usuario_id)

def obtener_detalles_de_pedido(pedido_id):
    return pedido_db.obtener_detalles_pedido(pedido_id)

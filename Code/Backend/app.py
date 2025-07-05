from flask import Flask, request, jsonify
from flask_cors import CORS
from services import user_service, carrito_service, pedido_service

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    rol_id = data.get("rol_id")

    if not all([nombre, correo, contrasena, rol_id]):
        return jsonify({"message": "Faltan campos obligatorios", "success": False}), 400

    result = user_service.register_user(nombre, correo, contrasena, rol_id)
    return jsonify(result)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")

    if not correo or not contrasena:
        return jsonify({"message": "Campos incompletos", "success": False}), 400

    result = user_service.login_user(correo, contrasena)
    return jsonify(result)

@app.route("/carrito", methods=["POST"])
def crear_carrito():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    if not usuario_id:
        return jsonify({"message": "Falta usuario_id", "success": False})
    return jsonify(carrito_service.crear_carrito_si_no_existe(usuario_id))

@app.route("/pedido", methods=["POST"])
def crear_pedido():
    data = request.get_json()
    return jsonify(pedido_service.crear_nuevo_pedido(data))

@app.route("/pedidos/<int:usuario_id>", methods=["GET"])
def listar_pedidos(usuario_id):
    return jsonify(pedido_service.obtener_pedidos_usuario(usuario_id))

if __name__ == '__main__':
    app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from services import user_service

app = Flask(__name__)
CORS(app)

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("username")
    correo = data.get("email")
    contrasena = data.get("password")
    rol_id = data.get("rol_id")

    if not all([nombre, correo, contrasena, rol_id]):
        return jsonify({"message": "Faltan campos obligatorios", "success": False}), 400

    result = user_service.register_user(nombre, correo, contrasena, rol_id)
    return jsonify(result)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    correo = data.get("email")
    contrasena = data.get("password")

    if not correo or not contrasena:
        return jsonify({"message": "Campos incompletos", "success": False}), 400

    result = user_service.login_user(correo, contrasena)
    return jsonify(result)

def login_user(correo, contrasena):
    usuario = user_service.get_user_by_email(correo)
    if not usuario:
        return {"success": False, "message": "Usuario no encontrado"}

    if usuario["contrasena"] != contrasena:
        return {"success": False, "message": "Contraseña incorrecta"}

    return {"success": True, "id": usuario["id"], "correo": usuario["correo"], "nombre": usuario["nombre"]}


if __name__ == '__main__':
    app.run(debug=True)

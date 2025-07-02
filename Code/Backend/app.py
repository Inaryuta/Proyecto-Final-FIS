from flask import Flask, request, jsonify
from services import user_service

app = Flask(__name__)

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

def login_user(correo, contrasena):
    usuario = user.get_user_by_email(correo)
    if not usuario:
        return {"success": False, "message": "Usuario no encontrado"}

    if usuario["contrasena"] != contrasena:
        return {"success": False, "message": "Contraseña incorrecta"}

    return {"success": True, "id": usuario["id"], "correo": usuario["correo"], "nombre": usuario["nombre"]}


if __name__ == '__main__':
    app.run(debug=True)

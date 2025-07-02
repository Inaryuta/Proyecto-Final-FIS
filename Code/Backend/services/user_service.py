import hashlib
from CRUD import user

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def register_user(nombre, correo, contrasena, rol_id):
    success = user.create_user(nombre, correo, contrasena, rol_id)
    if success:
        return {"message": "Usuario registrado correctamente", "success": True}
    else:
        return {"message": "Error al registrar usuario", "success": False}

def login_user(correo, contrasena):
    user_data = user.login_user(correo, contrasena)
    if user_data:
        return {"message": "Login exitoso", "user": user_data, "success": True}
    else:
        return {"message": "Usuario no encontrado", "success": False}

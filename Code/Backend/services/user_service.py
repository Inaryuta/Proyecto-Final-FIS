import hashlib
from CRUD import user

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def register_user(nombre, correo, contrasena, rol_id=2):
    existing = user.get_user_by_email(correo)
    if existing:
        return {"success": False, "message": "Correo ya registrado"}

    hashed_password = hash_password(contrasena)
    user_id = user.create_user(nombre, correo, hashed_password, rol_id)

    if user_id:
        return {"success": True, "user_id": user_id}
    else:
        return {"success": False, "message": "Error al crear usuario"}

def login_user(correo, contrasena):
    existing = user.get_user_by_email(correo)
    if not existing:
        return {"success": False, "message": "Usuario no encontrado"}

    hashed_input = hash_password(contrasena)
    if hashed_input != existing['contrasena']:
        return {"success": False, "message": "Contraseña incorrecta"}

    return {
        "success": True,
        "user": {
            "id": existing['id'],
            "nombre": existing['nombre'],
            "correo": existing['correo'],
            "rol_id": existing['rol_id']
        }
    }

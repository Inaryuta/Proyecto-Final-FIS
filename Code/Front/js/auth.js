function verificarSesion(redirigir = true) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user && redirigir) {
        window.location.href = "/Front/login.html";
    }
    return user;
}
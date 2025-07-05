console.log("Login script loaded");

const loginFrorm = document.getElementById('loginForm');
const message = document.getElementById('message');


loginFrorm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the input fields
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;

    // Perform your login logic here
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);

    try {
            const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: emailValue,
            contrasena: passwordValue
        })
    });

    const data = await response.json();
    if (response.ok) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        // Aquí puedes redirigir si quieres:
        // window.location.href = "/Front/index.html";
    } else {
        message.textContent = data.message || "Login failed.";
        message.style.color = "red";
    }

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor');;
    }
});
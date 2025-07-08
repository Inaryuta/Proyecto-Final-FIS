console.log("Login script loaded");

const loginFrorm = document.getElementById('loginForm');
const message = document.getElementById('message');


loginFrorm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the values from the input fields
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;


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
        console.log("Response data:", data);

        if (response.ok) {
            message.textContent = "Login successful!";
            message.style.color = "green";

            window.location.href = "/Front/index.html";
            localStorage.removeItem("cart");


        } else {
            message.textContent = data.message || "Login failed.";
            message.style.color = "red";

            let attemps = data.attemps || 0; // Obtener el número de intentos desde la respuesta
            if (attemps >= 3) {
                alert("Has alcanzado el número máximo de intentos. Por favor, inténtalo más tarde.");

                //bloquear el acceso temporalmente
                // Aquí podrías implementar una lógica para bloquear el acceso temporalmente



            }
        }

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor');;
    }
});
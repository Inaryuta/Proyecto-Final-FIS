console.log("Login script loaded");

const loginFrorm = document.getElementById('loginForm');
const message = document.getElementById('message');


loginFrorm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the input fields
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;

    // Perform your login logic here
    console.log("Email:", mailValue);
    console.log("Password:", passwordValue);

    try {
        const response = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });

        if (response.ok) {

            const data = await response.json();
            alert('Login exitoso: ' + data.message);

        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor');;
    }
});
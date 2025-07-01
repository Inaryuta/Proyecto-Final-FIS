console.log("Register script loaded");

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the values from the input fields
    const usernameValue = document.getElementById('username').value;
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;

    // Perform your registration logic here
    console.log("Username:", usernameValue);
    console.log("email:", emailValue);
    console.log("Password:", passwordValue);

    try {
        const response = await fetch("http://localhost:3000/T-Prints/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Registration successful: ' + data.message);
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }

    } catch (error) {
        console.error('Connection error:', error);
        alert('Could not connect to the server');
    }
});
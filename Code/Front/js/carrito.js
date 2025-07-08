const menuButton = document.getElementById('menu-button');
const dropdown = document.getElementById('profile-dropdown');

menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
});

window.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});




//Verificar si el usuario está logeado
// y mostrar su nombre en el perfil
const user = JSON.parse(sessionStorage.getItem("user"));
const profile = document.getElementById('perfil');

if (user) {
    console.log("Nombre del usuario:", user.nombre);
    const nombreUsuario = user.nombre || "Usuario Anónimo";

    if (profile) {
        profile.innerText = nombreUsuario;
    }

} else {
    console.warn("Usuario no logeado");

    if (profile) {
        profile.innerText = "Invitado";  // O déjalo vacío si prefieres
    }

    // window.location.href = "/Front/login.html";
}






// Mostrar carrito de compras al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        // Determinar si el producto tiene estampa
        const hasStamp = item.estampa && item.estampa.titulo;
        const displayName = hasStamp ?
            `${item.camisa ? item.camisa.name : item.name} con ${item.estampa.titulo}` :
            item.name;

        cartBody.innerHTML += `
            <tr>
                <td class="py-2 px-4">
                    <div class="flex items-center gap-3">
                        <img src="${item.img}" alt="${displayName}" class="w-12 h-12 object-cover rounded">
                        <div class="text-left">
                            <span class="block font-medium">${displayName}</span>
                            ${item.talla ? `<span class="text-sm text-gray-500">Talla: ${item.talla}</span>` : ''}
                            ${hasStamp ? `<span class="text-xs text-blue-600 block">Estampa: ${item.estampa.titulo}</span>` : ''}
                        </div>
                    </div>
                </td>
                <td class="py-2 px-4 text-center">$${item.price ? item.price.toLocaleString() : 'N/A'}</td>
                <td class="py-2 px-4 text-center">
                    <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)" class="border w-16 text-center">
                </td>
                <td class="py-2 px-4 text-center">$${itemSubtotal.toLocaleString()}</td>
                <td class="py-2 px-4 text-center">
                    <button onclick="removeProduct(${index})" class="text-red-500 hover:text-red-700">🗑️</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("subtotal").innerText = `$${subtotal.toLocaleString()}`;
    document.getElementById("total").innerText = `$${subtotal.toLocaleString()}`;
}

// Cambiar cantidad
function changeQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    quantity = parseInt(quantity);

    if (quantity < 1) quantity = 1;

    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


// Quitar producto
function removeProduct(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // quitar
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Botón volver a la tienda
function returnToShop() {
    window.location.href = '../Front/index.html';
}

// Botón actualizar (opcional)
function updateCart() {
    renderCart();
}

//Boton Borrar Carrito
function deleteCart() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("cart");
        renderCart();
    }
}


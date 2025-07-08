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

        cartBody.innerHTML += `
            <tr>
                <td class="py-2 px-4 flex items-center gap-2">
                    <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <span>${item.name}</span>
                </td>
                <td class="py-2 px-4">$${item.price}</td>
                <td class="py-2 px-4">
                    <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)" class="border w-16 text-center">
                </td>
                <td class="py-2 px-4">$${itemSubtotal}</td>
                <td class="py-2 px-4">
                    <button onclick="removeProduct(${index})" class="text-red-500">🗑️</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("total").innerText = subtotal;
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


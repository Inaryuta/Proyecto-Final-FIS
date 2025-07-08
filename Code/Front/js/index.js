
// Código para el menú desplegable del perfil
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

// Datos de los productos
// nombre, precio, imagen, talla, stock


// Datos de los productos
async function obtenerDatos() {
    try {
        const respuesta = await fetch('/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');

        const datos = await respuesta.json();
        console.log('Datos obtenidos:', datos);

        return datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

const products = [
    { id: 0, name: "Camisa Blanca", price: 50000, img: "images/camisas/camisaBlanca.png", talla: "M", stock: 10 },
    { id: 1, name: "Camisa Blanca manga Larga", price: 60000, img: "images/camisas/camisaBlanca_MangaLarga.png", talla: "L", stock: 5 },
    { id: 2, name: "Camisa Negra", price: 70000, img: "images/camisas/camisaNegra.png", talla: "S", stock: 8 },
    { id: 3, name: "Camisa Negra manga Larga", price: 80000, img: "images/camisas/camisaNegra_mangaLarga.png", talla: "XL", stock: 3 },
    { id: 4, name: "Camisa Azul", price: 90000, img: "images/camisas/camisaAzul.png", talla: "M", stock: 12 },
    { id: 5, name: "Camisa Rosa", price: 100000, img: "images/camisas/camisaRosa.png", talla: "L", stock: 7 },
    { id: 6, name: "Camisa Gris", price: 110000, img: "images/camisas/camisaGris.png", talla: "S", stock: 4 }
];






// Función principal para ejecutar al cargar el DOM
function main() {
    try {

        // const products = await obtenerDatos();
        const container = document.getElementById("products-container");

        products.forEach(product => {
            // Crear un div para cada producto
            const div = document.createElement("div");
            div.className = "bg-white rounded-lg shadow-md overflow-hidden";
            div.innerHTML = `
            <div class="relative group">
                <img 
                    src="${product.img}"   
                    alt="${product.name}" 
                    class="w-full h-64 object-contain transition-all duration-300">

                <div class="absolute bottom-0 left-0 right-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onclick="addProduct('${product.id}')"
                        class="bg-white hover:bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium shadow-md w-full">Agregar al carrito
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-left text-lg font-semibold text-gray-800 pr-2">${product.name}</h3>
                    <p class="text-xl font-bold text-blue-600">$${product.price}</p>
                </div>
                <p class="text-sm text-gray-600 mt-1">${product.talla}</p>
            </div>

        `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        document.getElementById('catalogo').innerText = 'No se pudo cargar el catálogo.';
    }
}

// Ejecutar apenas cargue el DOM
document.addEventListener('DOMContentLoaded', main);


function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('hidden');
}


function addProduct(id) {
    const product = products[id];
    if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} agregado al carrito`);
    } else {
        console.error("Producto no encontrado");
    }
}


// Ver producto
function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}








// Mostrar detalle
if (window.location.pathname.includes("product.html")) {
    const id = localStorage.getItem("selectedProduct");
    const prod = products[id];
    if (prod) {
        document.getElementById("product-detail").innerHTML = `
      <h2>${prod.name}</h2>
      <img src="${prod.img}" width="200" />
      <p>Precio: $${prod.price}</p>
      <button onclick="addToCart('${id}')">Agregar al carrito</button>
    `;
    }
}


// Mostrar carrito
if (window.location.pathname.includes("cart.html")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    let total = 0;
    cart.forEach(item => {
        container.innerHTML += `<p>${item.name} - $${item.price}</p>`;
        total += item.price;
    });
    document.getElementById("total").innerText = total;
}



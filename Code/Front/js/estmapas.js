
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

const estampas = [
    { id: 0, titulo: "America", descripcion: "Logo del equipo de futbol America de Cali", img: "images/estampas/estampaAmerica.png", estado: "aprobada" },
    { id: 1, titulo: "Cali", descripcion: "Logo del equipo de futbol Deportivo Cali", img: "images/estampas/estampaCali.png", estado: "pendiente" },
    { id: 2, titulo: "Millonarios", descripcion: "Logo del equipo del equipo de futbol Millonarios", img: "images/estampas/estampaMillonarios.png", estado: "pendiente" },
    { id: 3, titulo: "Nacional", descripcion: "Logo del equipo de futbol de Nacional", img: "images/estampas/estampaNacional.png", estado: "aprobada" },
    { id: 4, titulo: "Naruto", descripcion: "Logo de la serie animada Naruto", img: "images/estampas/estampaNaruto.png", estado: "pendiente" },
    { id: 5, titulo: "RealMadrid", descripcion: "Logo del equipo de futbol RealMadrid", img: "images/estampas/estampaRM.png", estado: "aprobada" },
];






// Función principal para ejecutar al cargar el DOM
function main() {
    try {

        // const products = await obtenerDatos();
        const container = document.getElementById("products-container");

        estampas.forEach(estampa => {
            // Crear un div para cada producto
            const div = document.createElement("div");
            div.className = "bg-white rounded-lg shadow-md overflow-hidden";
            div.innerHTML = `
            <div class="relative group">
                <img 
                    src="${estampa.img}"   
                    alt="${estampa.titulo}" 
                    class="w-full h-64 object-contain transition-all duration-300">
            </div>
            
            <div class="p-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-left text-lg font-semibold text-gray-800 pr-2">${estampa.titulo}</h3>
                    <p class="text-xs font-bold estado" data-estado="${estampa.estado}">${estampa.estado}</p>
                </div>
                <p class="estado text-sm text-gray-600 mt-1">${estampa.descripcion}</p>
            </div>

        `;
            container.appendChild(div);
        });

        aplicarColoresEstado();

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


function aplicarColoresEstado() {
    const estados = document.querySelectorAll(".estado");

    estados.forEach(el => {
        const estado = el.dataset.estado;

        // Limpiar clases anteriores (si hay)
        el.classList.remove("text-green-500", "text-yellow-500", "text-red-500");

        // Asignar clase según estado
        if (estado === "aprobada") {
            el.classList.add("text-green-500");
        } else if (estado === "pendiente") {
            el.classList.add("text-yellow-500");
        } else if (estado === "no disponible") {
            el.classList.add("text-red-500");
        }
    });
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



const productsData = {
  camisa1: { name: "Camisa Blanca", price: 50000, img: "images/camisas/camisaBlanca.png" },
  camisa2: { name: "Camisa Blanca manga Larga", price: 60000, img: "images/camisas/camisaBlanca_MangaLarga.png" },
  camisa3: { name: "Camisa Negra", price: 50000, img: "images/camisas/camisaNegra.png" },
  camisa4: { name: "Camisa Negra manga Larga", price: 60000, img: "images/camisas/camisaNegra_mangaLarga.png" },
  camisa5: { name: "Camisa Azul", price: 50000, img: "images/camisas/camisaAzul.png" },
  camisa6: { name: "Camisa Rosa", price: 60000, img: "images/camisas/camisaRosa.png" },
  camisa7: { name: "Camisa Gris", price: 60000, img: "images/camisas/camisaGris.png" }
};

if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/T-Prints/") {
  const container = document.getElementById("products");
  if (container) {
    Object.entries(productsData).forEach(([id, product]) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <button class="btn" onclick="viewProduct('${id}')">Ver</button>
      `;
      container.appendChild(div);
    });
  }
}

// Asegura que la función viewProduct exista
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
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

// Agregar al carrito
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products[id]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto agregado al carrito");
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



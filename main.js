let cart = [];
let productList = [];

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('data.json');
  productList = await response.json();

  const productListElement = document.getElementById("product-list");
  productList.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "product-item";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="150">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    productListElement.appendChild(productElement);
  });

  updateCartButton();
});

function addToCart(productId) {
  const product = productList.find(p => p.id === productId);
  cart.push(product);
  updateCartButton();
  Swal.fire('Producto agregado', `${product.name} ha sido agregado al carrito.`, 'success');
}

function updateCartButton() {
  document.getElementById("viewCartButton").innerText = `Ver Carrito (${cart.length})`;
}

document.getElementById("viewCartButton").addEventListener("click", () => {
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = '';
  
  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
    cartItems.appendChild(itemElement);
  });

  cartModal.style.display = 'block';
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  Swal.fire('Compra exitosa', `El total de tu compra es $${total}. ¡Gracias por tu compra!`, 'success');
  cart = [];
  updateCartButton();
  document.getElementById("cart-modal").style.display = 'none';
});

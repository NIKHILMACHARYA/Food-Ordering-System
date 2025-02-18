document.addEventListener("DOMContentLoaded", function () { fetchMenu(); loadCart(); });
async function fetchMenu() {
    const response = await fetch('http://localhost:5000/api/menu');
    const menuItems = await response.json();
    const menuList = document.getElementById('menu-list');
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${item.image}" alt="${item.name}"><h3>${item.name}</h3><p>${item.description}</p><p>$${item.price}</p><button class="btn" onclick="addToCart('${item._id}', '${item.name}', ${item.price})">Add to Cart</button>`;
        menuList.appendChild(div);
    });
}
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `<p>${item.name} - $${item.price} <button onclick="removeItem(${index})">Remove</button></p>`;
    });
}
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, totalPrice: cart.reduce((sum, item) => sum + item.price, 0) })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        localStorage.removeItem('cart');
        window.location.href = 'order_status.html';
    });
}

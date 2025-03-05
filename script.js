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

document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("order-form");
    const orderStatusContainer = document.getElementById("order-status-container");
    const orderStatusText = document.getElementById("order-status-text");
    const progressBar = document.getElementById("progress");

    const orderSteps = [
        { status: " Preparing Your Order", progress: "20%" },
        { status: "Order Placed", progress: "40%" },
        { status: "Out for Delivery", progress: "70%" },
        { status: "Order will be Comming Soon !", progress: "100%" }
    ];

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
        orderStatusContainer.classList.remove("hidden");
        trackOrder();
    });

    function trackOrder() {
        let step = 0;
        orderStatusText.innerHTML = `<strong>Status:</strong> ${orderSteps[step].status}`;
        progressBar.style.width = orderSteps[step].progress;

        const interval = setInterval(() => {
            step++;
            if (step < orderSteps.length) {
                orderStatusText.innerHTML = `<strong>Status:</strong> ${orderSteps[step].status}`;
                progressBar.style.width = orderSteps[step].progress;
            } else {
                clearInterval(interval);
            }
        }, 2000); // Updates every 2 seconds
    }
});


 

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
        }
    });
});



fetch("http://localhost:5000/api/menu")
  .then(response => response.json())
  .then(data => {
      console.log(data); // Populate the menu dynamically
  })
  .catch(error => console.error("Error fetching menu:", error));

  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Basic validation
    if (email === "" || password === "") {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    if (!email.includes("@")) {
        errorMessage.textContent = "Enter a valid email!";
        return;
    }

    // Simulated login authentication (Replace with backend API call)
    if (email === "awt@123.com" && password === "1234") {
        alert("Login Successful!");
        window.location.href = "index.html"; // Redirect to dashboard
    } else {
        errorMessage.textContent = "Invalid email or password!";
    }
});





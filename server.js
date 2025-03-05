const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Sample menu data
const menu = [
    { id: 1, name: "Classic Burger", price: 8.99, image: "burger.jpg" },
    { id: 2, name: "Margherita Pizza", price: 10.99, image: "pizza.jpg" },
    { id: 3, name: "Italian Pasta", price: 12.99, image: "pasta.jpg" },
    { id: 4, name: "Fresh Sushi", price: 15.99, image: "sushi.jpg" },
    { id: 5, name: "Mexican Tacos", price: 7.99, image: "tacos.jpg" },
    { id: 6, name: "Grilled Steak", price: 20.99, image: "steak.jpg" },
];

// Cart (for simplicity, stored in memory)
let cart = [];

// API Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Food Ordering API!");
});

// Get menu items
app.get("/api/menu", (req, res) => {
    res.json(menu);
});

// Get cart items
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

// Add item to cart
app.post("/api/cart", (req, res) => {
    const item = req.body;
    cart.push(item);
    res.status(201).json({ message: "Item added to cart", cart });
});

// Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== id);
    res.json({ message: "Item removed from cart", cart });
});

// Checkout (clear the cart)
app.post("/api/checkout", (req, res) => {
    const order = {
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: new Date(),
    };
    cart = []; // Clear cart after checkout
    res.json({ message: "Order placed successfully", order });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







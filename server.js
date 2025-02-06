const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files (e.g., HTML, CSS, JS)

// Mock menu and cart data
let menuItems = [
    { id: 1, name: "Classic Burger", description: "Juicy grilled burger with fresh toppings.", price: 8.99, image: "burger.jpg" },
    { id: 2, name: "Margherita Pizza", description: "Classic cheese and tomato pizza with fresh basil.", price: 12.99, image: "pizza.jpg" },
    { id: 3, name: "Italian Pasta", description: "Delicious pasta with rich tomato sauce.", price: 10.99, image: "pasta.jpg" },
    { id: 4, name: "Fresh Sushi", description: "Authentic Japanese sushi with fresh ingredients.", price: 15.99, image: "sushi.jpg" },
    { id: 5, name: "Mexican Tacos", description: "Spicy and flavorful tacos with fresh toppings.", price: 7.99, image: "tacos.jpg" },
    { id: 6, name: "Grilled Steak", description: "Perfectly grilled steak with a side of vegetables.", price: 18.99, image: "steak.jpg" }
];

let cart = [];

// Routes

// Get menu items
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

// Add item to cart
app.post('/api/cart', (req, res) => {
    const { itemId, quantity } = req.body;
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const cartItem = { ...item, quantity };
        cart.push(cartItem);
        res.status(200).json({ message: 'Item added to cart', cart });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// View cart
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Checkout
app.post('/api/checkout', (req, res) => {
    if (cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }
    // Process the checkout (e.g., save order to database)
    cart = [];  // Clear cart after checkout
    res.status(200).json({ message: 'Checkout successful, order placed' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

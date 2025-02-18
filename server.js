const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodOrderDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Menu Schema
const MenuItem = mongoose.model('MenuItem', {
    name: String,
    description: String,
    price: Number,
    image: String
});

// Order Schema
const Order = mongoose.model('Order', {
    items: Array,
    totalPrice: Number,
    status: { type: String, default: 'Pending' }
});

// Routes
app.get('/api/menu', async (req, res) => {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
});

app.post('/api/order', async (req, res) => {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({ items, totalPrice });
    await newOrder.save();
    res.json({ message: 'Order placed successfully!', orderId: newOrder._id });
});

app.get('/api/order/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
});

app.listen(port, () => console.log(`Server running on port ${port}`));


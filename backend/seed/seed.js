require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Return = require('../models/Return');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

const customers = [
  { customerId: 'C1001', name: 'Alice Smith', email: 'alice@example.com' },
  { customerId: 'C1002', name: 'Bob Jones', email: 'bob@example.com' }
];

const orders = [
  { orderId: 'NS1001', customerId: 'C1001', status: 'Delivered' },
  { orderId: 'NS1002', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS1003', customerId: 'C1001', status: 'Delivered' },
  { orderId: 'NS1004', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS1005', customerId: 'C1001', status: 'Processing' }
];

const returns = [
  { returnId: 'R1001', orderId: 'NS1001', returnEligible: true, returnStatus: 'Approved', refundStatus: 'Completed' },
  { returnId: 'R1002', orderId: 'NS1002', returnEligible: false, returnStatus: 'Rejected', refundStatus: 'Not Applicable' },
  { returnId: 'R1003', orderId: 'NS1003', returnEligible: true, returnStatus: 'Approved', refundStatus: 'Pending' }
];

const products = [
  { productId: 'P1001', name: 'Northstar Running Shoe', category: 'Shoes' },
  { productId: 'P1002', name: 'Northstar T-Shirt', category: 'Apparel' },
  { productId: 'P1003', name: 'Northstar Backpack', category: 'Accessories' }
];

const inventory = [
  { productId: 'P1001', variant: 'Size 42', quantity: 6 },
  { productId: 'P1001', variant: 'Size 44', quantity: 0 },
  { productId: 'P1002', variant: 'Medium', quantity: 10 },
  { productId: 'P1003', variant: 'One Size', quantity: 0 }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Customer.deleteMany({});
    await Order.deleteMany({});
    await Return.deleteMany({});
    await Product.deleteMany({});
    await Inventory.deleteMany({});

    await Customer.insertMany(customers);
    await Order.insertMany(orders);
    await Return.insertMany(returns);
    await Product.insertMany(products);
    await Inventory.insertMany(inventory);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

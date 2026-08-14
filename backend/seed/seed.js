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
  { customerId: 'C1002', name: 'Bob Jones', email: 'bob@example.com' },
  { customerId: 'C1003', name: 'Charlie Brown', email: 'charlie@example.com' },
  { customerId: 'C1004', name: 'Diana Prince', email: 'diana@example.com' }
];

const orders = [
  { orderId: 'NS1001', customerId: 'C1001', status: 'Delivered' },
  { orderId: 'NS1002', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS1003', customerId: 'C1001', status: 'Delivered' },
  { orderId: 'NS1004', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS1005', customerId: 'C1001', status: 'Processing' },
  { orderId: 'NS1006', customerId: 'C1003', status: 'Delivered' },
  { orderId: 'NS1007', customerId: 'C1004', status: 'Delivered' },
  { orderId: 'NS1008', customerId: 'C1003', status: 'Delivered' },
  { orderId: 'NS2001', customerId: 'C1001', status: 'Delivered' },
  { orderId: 'NS2002', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS2003', customerId: 'C1002', status: 'Delivered' },
  { orderId: 'NS2004', customerId: 'C1001', status: 'Delivered' }
];

const returns = [
  { returnId: 'R1001', orderId: 'NS1001', returnEligible: true, returnStatus: 'Approved', refundStatus: 'Completed', reason: 'Size did not fit' },
  { returnId: 'R1002', orderId: 'NS1002', returnEligible: false, returnStatus: 'Rejected', refundStatus: 'Not Applicable', reason: 'Return window expired' },
  { returnId: 'R1003', orderId: 'NS1003', returnEligible: true, returnStatus: 'Received', refundStatus: 'Pending', reason: 'Item defective on arrival' },
  { returnId: 'R1004', orderId: 'NS1006', returnEligible: true, returnStatus: 'Requested', refundStatus: 'Not Started', reason: 'Wrong color received' },
  { returnId: 'R1005', orderId: 'NS1007', returnEligible: true, returnStatus: 'Completed', refundStatus: 'Processed', reason: 'Unopened return' },
  { returnId: 'R1006', orderId: 'NS1008', returnEligible: true, returnStatus: 'Approved', refundStatus: 'Failed', reason: 'Payment method declined for refund' },
  { returnId: 'R2001', orderId: 'NS2001', returnEligible: true, returnStatus: 'In Transit', refundStatus: 'Pending' },
  { returnId: 'R2002', orderId: 'NS2002', returnEligible: true, returnStatus: 'Processing', refundStatus: 'Pending' },
  { returnId: 'R2003', orderId: 'NS2003', returnEligible: true, returnStatus: 'Received', refundStatus: 'Processing' },
  { returnId: 'R2004', orderId: 'NS2004', returnEligible: false, returnStatus: 'Past 30 Days', refundStatus: 'Not Applicable' }
];

const products = [
  { productId: 'P1001', name: 'Northstar Running Shoe', category: 'Shoes', description: 'High-performance running shoe with responsive cushioning' },
  { productId: 'P1002', name: 'Northstar Performance T-Shirt', category: 'Apparel', description: 'Breathable lightweight athletic shirt' },
  { productId: 'P1003', name: 'Northstar Everyday Backpack', category: 'Accessories', description: 'Durable water-resistant commuter backpack' },
  { productId: 'P1004', name: 'Northstar Pro Basketball Shoe', category: 'Shoes', description: 'Ankle support basketball sneaker with traction grip' },
  { productId: 'P1005', name: 'Northstar Trail Hiking Boots', category: 'Shoes', description: 'All-weather waterproof trail hiking boots' },
  { productId: 'P2001', name: 'Northstar Winter Parka', category: 'Apparel' },
  { productId: 'P2002', name: 'Northstar Pro Yoga Mat', category: 'Accessories' }
];

const inventory = [
  // P1001 - Running Shoe: Mixed availability
  { productId: 'P1001', variant: 'Size 40', quantity: 8 },
  { productId: 'P1001', variant: 'Size 42', quantity: 6 },
  { productId: 'P1001', variant: 'Size 44', quantity: 0 },

  // P1002 - T-Shirt: Fully in stock
  { productId: 'P1002', variant: 'Small', quantity: 8 },
  { productId: 'P1002', variant: 'Medium', quantity: 10 },
  { productId: 'P1002', variant: 'Large', quantity: 15 },

  // P1003 - Backpack: Completely out of stock
  { productId: 'P1003', variant: 'One Size', quantity: 0 },

  // P1004 - Basketball Shoe: Mixed availability
  { productId: 'P1004', variant: 'Size 8', quantity: 5 },
  { productId: 'P1004', variant: 'Size 9', quantity: 0 },
  { productId: 'P1004', variant: 'Size 10', quantity: 4 },
  { productId: 'P1004', variant: 'Size 11', quantity: 0 },

  // P1005 - Hiking Boots: Completely out of stock
  { productId: 'P1005', variant: 'Size 9', quantity: 0 },
  { productId: 'P1005', variant: 'Size 10', quantity: 0 },

  // P2001 - Winter Parka: Low stock on some sizes
  { productId: 'P2001', variant: 'Large', quantity: 15 },
  { productId: 'P2001', variant: 'Medium', quantity: 2 },
  { productId: 'P2001', variant: 'Small', quantity: 0 },

  // P2002 - Yoga Mat: Well stocked
  { productId: 'P2002', variant: 'One Size', quantity: 45 }
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

    console.log('Database successfully seeded with comprehensive MVP demo data!');
    process.exit(0);
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

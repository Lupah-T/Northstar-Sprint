const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Return = require('../models/Return');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const stockService = require('../services/stockService');
const returnsService = require('../services/returnsService');

describe('Database Layer - Schemas, Validation & Business Logic', () => {
  describe('1. Customer Model', () => {
    it('should validate a correct customer and normalize uppercase ID', () => {
      const customer = new Customer({
        customerId: 'c1001',
        name: 'Alice Smith',
        email: 'ALICE@EXAMPLE.COM'
      });
      const err = customer.validateSync();
      expect(err).toBeUndefined();
      expect(customer.customerId).toBe('C1001');
      expect(customer.email).toBe('alice@example.com');
    });

    it('should reject missing required fields', () => {
      const customer = new Customer({});
      const err = customer.validateSync();
      expect(err.errors.customerId).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.email).toBeDefined();
    });

    it('should reject invalid email format', () => {
      const customer = new Customer({
        customerId: 'C1001',
        name: 'Alice Smith',
        email: 'not-an-email'
      });
      const err = customer.validateSync();
      expect(err.errors.email).toBeDefined();
    });
  });

  describe('2. Order Model', () => {
    it('should validate a valid order and default orderDate and status', () => {
      const order = new Order({
        orderId: 'ns1001',
        customerId: 'c1001'
      });
      const err = order.validateSync();
      expect(err).toBeUndefined();
      expect(order.orderId).toBe('NS1001');
      expect(order.customerId).toBe('C1001');
      expect(order.status).toBe('Processing');
      expect(order.orderDate).toBeInstanceOf(Date);
    });

    it('should accept valid order statuses', () => {
      const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
      statuses.forEach(status => {
        const order = new Order({
          orderId: 'NS1001',
          customerId: 'C1001',
          status
        });
        const err = order.validateSync();
        expect(err).toBeUndefined();
      });
    });

    it('should reject invalid order status', () => {
      const order = new Order({
        orderId: 'NS1001',
        customerId: 'C1001',
        status: 'InTransitToMars'
      });
      const err = order.validateSync();
      expect(err.errors.status).toBeDefined();
    });
  });

  describe('3. Return Model (Returns & Refunds Lifecycle)', () => {
    it('should validate return lifecycle states: requested, approved, rejected, received, completed', () => {
      const validReturnStatuses = ['Requested', 'Approved', 'Rejected', 'Received', 'Completed', 'requested', 'approved', 'rejected', 'received', 'completed'];
      validReturnStatuses.forEach((status, idx) => {
        const returnDoc = new Return({
          returnId: `R100${idx}`,
          orderId: `NS100${idx}`,
          returnEligible: true,
          returnStatus: status,
          refundStatus: 'Not Started'
        });
        const err = returnDoc.validateSync();
        expect(err).toBeUndefined();
      });
    });

    it('should validate refund lifecycle states: not_started, pending, processed, completed, failed, not_applicable', () => {
      const validRefundStatuses = [
        'Not Started',
        'Pending',
        'Processed',
        'Completed',
        'Failed',
        'Not Applicable',
        'not_started',
        'pending',
        'processed',
        'completed',
        'failed',
        'not_applicable'
      ];
      validRefundStatuses.forEach((status, idx) => {
        const returnDoc = new Return({
          returnId: `R200${idx}`,
          orderId: `NS200${idx}`,
          returnEligible: true,
          returnStatus: 'Approved',
          refundStatus: status
        });
        const err = returnDoc.validateSync();
        expect(err).toBeUndefined();
      });
    });

    it('should reject invalid returnStatus and refundStatus', () => {
      const invalidReturn = new Return({
        returnId: 'R9001',
        orderId: 'NS9001',
        returnEligible: true,
        returnStatus: 'UnknownReturnStatus',
        refundStatus: 'UnknownRefundStatus'
      });
      const err = invalidReturn.validateSync();
      expect(err.errors.returnStatus).toBeDefined();
      expect(err.errors.refundStatus).toBeDefined();
    });

    it('should properly format IDs and store return reasons', () => {
      const returnDoc = new Return({
        returnId: 'r1001',
        orderId: 'ns1001',
        returnEligible: true,
        returnStatus: 'Approved',
        refundStatus: 'Completed',
        reason: 'Size too large'
      });
      const err = returnDoc.validateSync();
      expect(err).toBeUndefined();
      expect(returnDoc.returnId).toBe('R1001');
      expect(returnDoc.orderId).toBe('NS1001');
      expect(returnDoc.reason).toBe('Size too large');
    });
  });

  describe('4. Product Model', () => {
    it('should validate a correct product and format productId', () => {
      const product = new Product({
        productId: 'p1001',
        name: 'Northstar Running Shoe',
        category: 'Shoes',
        description: 'Lightweight high-performance runner'
      });
      const err = product.validateSync();
      expect(err).toBeUndefined();
      expect(product.productId).toBe('P1001');
    });

    it('should reject missing product name and category', () => {
      const product = new Product({
        productId: 'P1001'
      });
      const err = product.validateSync();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.category).toBeDefined();
    });
  });

  describe('5. Inventory Model (Stock Availability)', () => {
    it('should validate a correct inventory record', () => {
      const inventory = new Inventory({
        productId: 'p1001',
        variant: 'Size 42',
        quantity: 12
      });
      const err = inventory.validateSync();
      expect(err).toBeUndefined();
      expect(inventory.productId).toBe('P1001');
      expect(inventory.quantity).toBe(12);
    });

    it('should allow 0 quantity for out-of-stock items', () => {
      const inventory = new Inventory({
        productId: 'P1001',
        variant: 'Size 44',
        quantity: 0
      });
      const err = inventory.validateSync();
      expect(err).toBeUndefined();
      expect(inventory.quantity).toBe(0);
    });

    it('should reject negative stock quantities', () => {
      const inventory = new Inventory({
        productId: 'P1001',
        variant: 'Size 42',
        quantity: -10
      });
      const err = inventory.validateSync();
      expect(err.errors.quantity).toBeDefined();
      expect(err.errors.quantity.message).toContain('cannot be negative');
    });

    it('should reject non-integer stock quantities', () => {
      const inventory = new Inventory({
        productId: 'P1001',
        variant: 'Size 42',
        quantity: 5.75
      });
      const err = inventory.validateSync();
      expect(err.errors.quantity).toBeDefined();
    });
  });

  describe('6. Stock Service Business Logic Integration', () => {
    it('should calculate total product availability correctly when in stock', async () => {
      jest.spyOn(Product, 'findOne').mockResolvedValue({
        productId: 'P1001',
        name: 'Northstar Running Shoe'
      });
      jest.spyOn(Inventory, 'find').mockResolvedValue([
        { variant: 'Size 40', quantity: 8 },
        { variant: 'Size 42', quantity: 6 },
        { variant: 'Size 44', quantity: 0 }
      ]);

      const result = await stockService.checkStock('P1001');
      expect(result.available).toBe(true);
      expect(result.quantity).toBe(14);
      expect(result.productName).toBe('Northstar Running Shoe');

      Product.findOne.mockRestore();
      Inventory.find.mockRestore();
    });

    it('should report product as unavailable when total quantity is 0', async () => {
      jest.spyOn(Product, 'findOne').mockResolvedValue({
        productId: 'P1003',
        name: 'Northstar Backpack'
      });
      jest.spyOn(Inventory, 'find').mockResolvedValue([
        { variant: 'One Size', quantity: 0 }
      ]);

      const result = await stockService.checkStock('P1003');
      expect(result.available).toBe(false);
      expect(result.quantity).toBe(0);

      Product.findOne.mockRestore();
      Inventory.find.mockRestore();
    });

    it('should return availability for specific in-stock and out-of-stock variants', async () => {
      jest.spyOn(Product, 'findOne').mockResolvedValue({
        productId: 'P1004',
        name: 'Northstar Pro Basketball Shoe'
      });
      jest.spyOn(Inventory, 'findOne')
        .mockResolvedValueOnce({ variant: 'Size 8', quantity: 5 })
        .mockResolvedValueOnce({ variant: 'Size 9', quantity: 0 });

      const inStockVariant = await stockService.checkVariantStock('P1004', 'Size 8');
      expect(inStockVariant.available).toBe(true);
      expect(inStockVariant.quantity).toBe(5);

      const outOfStockVariant = await stockService.checkVariantStock('P1004', 'Size 9');
      expect(outOfStockVariant.available).toBe(false);
      expect(outOfStockVariant.quantity).toBe(0);

      Product.findOne.mockRestore();
      Inventory.findOne.mockRestore();
    });

    it('should throw error when variant is not found in database', async () => {
      jest.spyOn(Product, 'findOne').mockResolvedValue({
        productId: 'P1004',
        name: 'Northstar Pro Basketball Shoe'
      });
      jest.spyOn(Inventory, 'findOne').mockResolvedValue(null);

      await expect(stockService.checkVariantStock('P1004', 'Size 15')).rejects.toThrow('Size 15 is currently unavailable');

      Product.findOne.mockRestore();
      Inventory.findOne.mockRestore();
    });
  });

  describe('7. Returns Service Business Logic Integration', () => {
    it('should return correct return and refund status for an existing return', async () => {
      jest.spyOn(Order, 'findOne').mockResolvedValue({ orderId: 'NS1001' });
      jest.spyOn(Return, 'findOne').mockResolvedValue({
        returnId: 'R1001',
        orderId: 'NS1001',
        returnEligible: true,
        returnStatus: 'Approved',
        refundStatus: 'Completed'
      });

      const result = await returnsService.checkReturnStatus('NS1001');
      expect(result.orderId).toBe('NS1001');
      expect(result.eligible).toBe(true);
      expect(result.returnStatus).toBe('Approved');
      expect(result.refundStatus).toBe('Completed');

      Order.findOne.mockRestore();
      Return.findOne.mockRestore();
    });

    it('should deflect with Not Requested / Not Applicable when order has no return record', async () => {
      jest.spyOn(Order, 'findOne').mockResolvedValue({ orderId: 'NS1004' });
      jest.spyOn(Return, 'findOne').mockResolvedValue(null);

      const result = await returnsService.checkReturnStatus('NS1004');
      expect(result.orderId).toBe('NS1004');
      expect(result.eligible).toBe(false);
      expect(result.returnStatus).toBe('Not Requested');
      expect(result.refundStatus).toBe('Not Applicable');

      Order.findOne.mockRestore();
      Return.findOne.mockRestore();
    });

    it('should throw not found error when order does not exist', async () => {
      jest.spyOn(Order, 'findOne').mockResolvedValue(null);

      await expect(returnsService.checkReturnStatus('NS9999')).rejects.toThrow('Order NS9999 was not found');

      Order.findOne.mockRestore();
    });
  });
});

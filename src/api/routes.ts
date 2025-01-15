import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { Container } from 'typedi';
import { TOKENS } from '../infrastructure/Tokens';
import { CreateProductCommand } from '../application/commands/CreateProductCommand';
import { RestockProductCommand } from '../application/commands/RestockProductCommand';
import { SellProductCommand } from '../application/commands/SellProductCommand';
import { GetAllProductsQuery } from '../application/queries/GetAllProductsQuery';
import { CreateOrderCommand } from '../application/commands/CreateOrderCommand';

const router = Router();

// Validation Middleware Helper
function validateRequest(req: Request, res: Response, next: Function): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}

// GET /products with validation for query parameters
router.get(
  '/products',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('pageSize').optional().isInt({ min: 1 }).withMessage('PageSize must be a positive integer'),
    query('sortBy').optional().isString().withMessage('SortBy must be a string'),
    query('sortDirection')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('SortDirection must be either "asc" or "desc"'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const queryHandler = Container.get(TOKENS.GetAllProductsQueryHandler);

    const { page = 1, pageSize = 10, sortBy = 'name', sortDirection = 'asc' } = req.query;

    try {
      const query = new GetAllProductsQuery(
        Number(page),
        Number(pageSize),
        String(sortBy),
        sortDirection === 'asc' || sortDirection === 'desc' ? sortDirection : 'asc'
      );

      const products = await queryHandler.execute(query);
      res.json(products);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
      res.status(400).json({ error: errorMessage });
    }
  }
);

// POST /products with validation
router.post(
  '/products',
  [
    body('name').notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be at most 50 characters long'),
    body('description').notEmpty().withMessage('Description is required').isLength({ max: 50 }).withMessage('Description must be at most 50 characters long'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('stock').notEmpty().withMessage('Stock is required').isNumeric().withMessage('Stock must be a number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    try {
      const commandHandler = Container.get(TOKENS.CreateProductCommandHandler);
      const command = new CreateProductCommand(name, description, price, stock);
      await commandHandler.handleAsync(command);
      res.status(201).json({ message: 'Product created successfully.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
      res.status(400).json({ error: errorMessage });
    }
  }
);

// POST /products/:id/restock with validation
router.post(
  '/products/:id/restock',
  [
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const commandHandler = Container.get(TOKENS.RestockProductCommandHandler);
    const { id } = req.params;
    const { amount } = req.body;

    try {
      const command = new RestockProductCommand(id, Number(amount));
      await commandHandler.handleAsync(command);
      res.status(200).json({ message: 'Product restocked successfully.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
      res.status(400).json({ error: errorMessage });
    }
  }
);

// POST /products/:id/sell with validation
router.post(
  '/products/:id/sell',
  [
    body('amount').notEmpty().withMessage('Amount is required').isNumeric().withMessage('Amount must be a number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const commandHandler = Container.get(TOKENS.SellProductCommandHandler);
    const { id } = req.params;
    const { amount } = req.body;

    try {
      const command = new SellProductCommand(id, Number(amount));
      await commandHandler.handleAsync(command);
      res.status(200).json({ message: 'Product sold successfully.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
      res.status(400).json({ error: errorMessage });
    }
  }
);

// POST /orders with validation
router.post(
  '/orders',
  [
    body('customerId').notEmpty().withMessage('CustomerId is required'),
    body('products')
      .isArray({ min: 1 })
      .withMessage('Products must be an array with at least one item'),
    body('products.*.productId').notEmpty().withMessage('ProductId is required for each product'),
    body('products.*.quantity').notEmpty().withMessage('Quantity is required for each product').isNumeric().withMessage('Quantity must be a number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const commandHandler = Container.get(TOKENS.CreateOrderCommandHandler);
    const { customerId, products } = req.body;

    try {
      const command = new CreateOrderCommand(customerId, products);
      await commandHandler.handleAsync(command);
      res.status(201).json({ message: 'Order created successfully.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
      res.status(400).json({ error: errorMessage });
    }
  }
);

export default router;

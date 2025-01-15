import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import { AddInfrastrucutre } from '../infrastructure/Extensions';
import { TOKENS } from '../infrastructure/Tokens';
import { CreateProductCommand } from '../application/commands/CreateProductCommand';
import { RestockProductCommand } from '../application/commands/RestockProductCommand';
import { SellProductCommand } from '../application/commands/SellProductCommand';
import { GetAllProductsQuery } from '../application/queries/GetAllProductsQuery';

// Configure DI container
AddInfrastrucutre();

const app = express();
app.use(bodyParser.json());

// Routes
app.get('/products', async (req: Request, res: Response) => {
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
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred.';
    res.status(400).json({ error: errorMessage });
  }
});

app.post('/products', async (req: Request, res: Response) => {
  const commandHandler = Container.get(TOKENS.CreateProductCommandHandler);
  const { name, description, price, stock } = req.body;

  try {
    const command = new CreateProductCommand(name, description, price, stock);
    await commandHandler.handleAsync(command);
    res.status(201).json({ message: 'Product created successfully.' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred.';
    res.status(400).json({ error: errorMessage });
  }
});

app.post('/products/:id/restock', async (req: Request, res: Response) => {
  const commandHandler = Container.get(TOKENS.RestockProductCommandHandler);
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const command = new RestockProductCommand(id, Number(amount));
    await commandHandler.handleAsync(command);
    res.status(200).json({ message: 'Product restocked successfully.' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred.';
    res.status(400).json({ error: errorMessage });
  }
});

app.post('/products/:id/sell', async (req: Request, res: Response) => {
  const commandHandler = Container.get(TOKENS.SellProductCommandHandler);
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const command = new SellProductCommand(id, Number(amount));
    await commandHandler.handleAsync(command);
    res.status(200).json({ message: 'Product sold successfully.' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred.';
    res.status(400).json({ error: errorMessage });
  }
});

app.post('/orders', async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Order management is not implemented yet.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

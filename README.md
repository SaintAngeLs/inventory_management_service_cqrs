# Inventory Management Service (CQRS)

This project is a CQRS-based Inventory Management Service that provides APIs for managing products, stock, and orders. Below are the available API endpoints and their respective request examples.

---

## API Endpoints

### 1. Create Product
**Endpoint**: `POST /api/products`

**Request Body**:
```json
{
  "name": "Test Product",
  "description": "Test Description",
  "price": 100,
  "stock": 10
}
```

---

### 2. Get All Products
**Endpoint**: `GET /api/products`

**Example Request**:
```sh
GET http://localhost:3000/api/products
```

---

### 3. Restock Product
**Endpoint**: `POST /api/products/:id/restock`

**Request Example**:
```sh
POST http://localhost:3000/api/products/6787d931083d883262b4cd70/restock
```

**Request Body**:
```json
{
  "amount": 5
}
```

---

### 4. Sell Product
**Endpoint**: `POST /api/products/:id/sell`

**Request Example**:
```sh
POST http://localhost:3000/api/products/6787d931083d883262b4cd70/sell
```

**Request Body**:
```json
{
  "amount": 5
}
```

---

### 5. Create Order
**Endpoint**: `POST /api/orders`

**Request Example**:
```sh
POST http://localhost:3000/api/orders
```

**Request Body**:
```json
{
  "customerId": "123e4567-e89b-12d3-a456-426614174000",
  "products": [
    {
      "productId": "6787d931083d883262b4cd70",
      "quantity": 2
    },
    {
      "productId": "6787d93b083d883262b4cd73",
      "quantity": 1
    },
    {
      "productId": "6787dbc126686db4e7672984",
      "quantity": 3
    }
  ]
}
```

---


## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SaintAngeLs/inventory_management_service_cqrs.git
   cd inventory_management_service_cqrs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with the necessary environment variables:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/inventory
   KAFKA_BROKER=localhost:9092
   PORT=3000
   ```

4. If MongoDB or Kafka is not available on your system, use `docker-compose` to set up the required services. Run the following command:
   ```bash
   docker-compose up -d
   ```

   This will start the following services:
   - **Zookeeper**: Required by Kafka.
   - **Kafka**: The message broker for the system.
   - **Kafka-UI**: A user interface to monitor Kafka.
   - *(Optional)* Uncomment the `mongo` and `mongo-express` services in `docker-compose.yml` to run a MongoDB instance with a web-based admin interface.

5. Start the application server:
   ```bash
   npm run dev
   ```

6. Run tests to verify the setup:
   ```bash
   npm test
   ```

---

## Notes
- Ensure MongoDB and Kafka are running locally or update the configuration in `src/config.ts`.
- Use tools like Postman, Insomnia, or cURL to interact with the API.

---

## License
This project is licensed under the MIT License.
```

You can save this content as `README.md` in the root of your project directory.
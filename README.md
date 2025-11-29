# 📦 Inventory Management Service (CQRS + DDD + Event-Driven Architecture)

A scalable **Inventory Management Service** built with **CQRS**, **Domain-Driven Design (DDD)**, **Kafka event streaming**, **MongoDB**, and **TypeScript**.
This service handles **product management**, **stock operations**, and **order creation** with a clean, enterprise-grade architecture.

---

## 🚀 Key Features

* **CQRS Architecture** (write/read separation)
* **Domain-Driven Design (DDD)** with Aggregates, Value Objects & Domain Events
* **Event-Driven** with Kafka producers
* **MongoDB** persistence with clean repository abstraction
* **Fully typed (TypeScript)**
* **Express.js REST API**
* **Dependency Injection** using `typedi`
* **Validation** using `express-validator`
* **Comprehensive error handling**
* **Extensible infrastructure layer**
* **Docker support** (Kafka, Zookeeper, MongoDB)

---

## 📚 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [High-Level System Flow](#-high-level-system-flow)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [API Endpoints](#-api-endpoints)
6. [Setup Instructions](#-setup-instructions)
7. [Environment Variables](#-environment-variables)
8. [Docker Setup (Kafka + Mongo)](#-docker-setup-kafka--mongo)
9. [Running the Application](#-running-the-application)
10. [Event Topics](#-event-topics)
11. [Testing](#-testing)
12. [Troubleshooting](#-troubleshooting)
13. [License](#-license)

---

# 🏗 Architecture Overview

This project follows **CQRS** + **Domain-Driven Design**, splitting responsibilities:

* **Commands** modify state (Create Product, Restock, Sell, Create Order)
* **Queries** retrieve data
* **Domain Layer** contains business rules & aggregates
* **Infrastructure Layer** handles Kafka, MongoDB, repositories
* **Application Layer** orchestrates commands, events & services

---

### 🧩 Architectural Diagram (Conceptual)

```
        ┌─────────────────────────┐
        │        API Layer        │
        │  Express.js Controllers │
        └─────────────┬──────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   Application Layer     │
        │ Commands | Queries | DTO │
        └─────────────┬──────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │      Domain Layer       │
        │ Aggregates | Events     │
        └─────────────┬──────────┘
                      │
                      ▼
      ┌───────────────────────────────┐
      │     Infrastructure Layer       │
      │ MongoDB | Kafka | Repositories │
      └───────────────────────────────┘
```

---

# ⚙ Tech Stack

| Category  | Technology                          |
| --------- | ----------------------------------- |
| Language  | **TypeScript**                      |
| Runtime   | **Node.js**                         |
| Framework | **Express.js**                      |
| Patterns  | **CQRS**, **DDD**, **Event-Driven** |
| Database  | **MongoDB**                         |
| Messaging | **Kafka**                           |
| DI        | **typedi**                          |
| Testing   | **Jest**                            |
| Dev Tools | Docker, ESLint, Prettier            |

---

# 📁 Project Structure

```
src
├── api
├── application
│   ├── commands
│   ├── queries
│   ├── events
│   ├── services
│   └── dto
├── core
│   ├── entities
│   ├── events
│   ├── repositories
│   └── exceptions
└── infrastructure
    ├── database
    ├── services
    ├── logging
    ├── queries
    └── repositories
```

This structure fully supports **scalable enterprise systems**.

---

# 🔌 API Endpoints

## 1. Create Product

**POST** `/api/products`

```json
{
  "name": "Test Product",
  "description": "Test Description",
  "price": 100,
  "stock": 10
}
```

---

## 2. Get All Products

**GET** `/api/products`

Supports:
`page`, `pageSize`, `sortBy`, `sortDirection`

---

## 3. Restock Product

**POST** `/api/products/:id/restock`

```json
{
  "amount": 5
}
```

---

## 4. Sell Product

**POST** `/api/products/:id/sell`

```json
{
  "amount": 5
}
```

---

## 5. Create Order

**POST** `/api/orders`

```json
{
  "customerId": "123e4567-e89b-12d3-a456-426614174000",
  "products": [
    { "productId": "6787d931083d883262b4cd70", "quantity": 2 },
    { "productId": "6787d93b083d883262b4cd73", "quantity": 1 }
  ]
}
```

---

# 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/SaintAngeLs/inventory_management_service_cqrs.git
cd inventory_management_service_cqrs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

```env
MONGO_URI=mongodb://localhost:27017/inventory
KAFKA_BROKER=localhost:9092
PORT=3000
```

---

# 🐳 Docker Setup (Kafka + Zookeeper + MongoDB)

Start infrastructure services:

```bash
docker-compose up -d
```

Services included:

* Kafka
* Zookeeper
* Kafka-UI
* (Optional) MongoDB + Mongo Express

---

# ▶ Running the Application

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

---

# 📡 Kafka Event Topics

| Event                 | Topic               |
| --------------------- | ------------------- |
| ProductCreatedEvent   | `product.created`   |
| ProductRestockedEvent | `product.restocked` |
| ProductSoldEvent      | `product.sold`      |
| OrderCreatedEvent     | `order.created`     |

Every write operation triggers a domain event, then publishes to Kafka.

---

# 🧪 Testing

Run all tests:

```bash
npm test
```

Test environment uses **supertest + jest**.

---

# 🐞 Troubleshooting

### Kafka connection errors

Ensure Zookeeper & Kafka are running:

```bash
docker ps
```

### MongoDB connection refused

```bash
docker-compose up -d mongo
```

### TypeScript compilation issue

```bash
npm run build
```

---

# 📄 License

MIT License – free to use & modify.

---

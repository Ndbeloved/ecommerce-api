# High-Performance E-commerce API  

This project is a high-performance RESTful API built with Node.js and Express, designed to power an e-commerce platform. It provides functionality for user authentication, product management, shopping cart operations, and order processing, with performance optimizations such as Redis caching.

---

## **Features**  
- **User Authentication**: JWT-based secure login and registration.  
- **Product Management**: CRUD operations for products (admin only).  
- **Shopping Cart**: Add, update, and remove items in the user’s cart.  
- **Order Processing**: Place and manage orders with real-time status updates.  
- **Caching**: Uses Redis for caching frequently accessed data.  
- **Security**: Implements secure input validation, authentication, and access control.  
- **Scalability**: Optimized for high traffic and low-latency responses.  

---

## **Technologies Used**  
- **Node.js**: Backend runtime environment.  
- **Express.js**: Web framework for building RESTful APIs.  
- **MongoDB**: NoSQL database for data storage.  
- **Redis**: In-memory data structure store for caching.  
- **JWT**: JSON Web Tokens for secure user authentication.  
- **Docker (Optional)**: Containerization for consistent deployment.  

---

## **Installation**  

### Prerequisites  
- [Node.js](https://nodejs.org/) installed (v14+ recommended).  
- [MongoDB](https://www.mongodb.com/) installed and running.  
- [Redis](https://redis.io/) installed and running.  

### Steps  

1. Clone the repository:  
   ```bash
   git clone https://github.com/Ndbeloved/ecommerce-api.git
   cd ecommerce-api

2. Install dependencies:
   ```bash
   npm install

3. Set up environment variables:
   Create a .env file in the root directory and add the following:

   ```env
    PORT = 3000
    ENV = "dev"
    MONGO_URL = "mongodb://127.0.0.1:27017/lovegood"
    JWT_SECRET = "your-jwt-secret"
    CLOUD_API_NAME = "your-cloudinary-api-name"
    CLOUD_API_KEY = "your-cloudinary-api-key"
    CLOUD_API_SECRET = "your-cloudinary-api-secret"

4. Start the development server:

    ```bash
    npm run dev

5. Test the API in your browser or API testing tool (e.g., Postman):
   Example: http://localhost:3000/api/products


## **API Documentation**

### **Authentication**

| Method | Endpoint                | Description                     | Authorization |
|--------|-------------------------|---------------------------------|---------------|
| POST   | `/api/auth/register`     | Register a new user             | No            |
| POST   | `/api/auth/login`        | Log in and get JWT token        | No            |
| POST   | `/api/auth/logout`       | Log out (invalidate token)      | Yes           |

### **Products**

| Method | Endpoint              | Description                     | Authorization |
|--------|-----------------------|---------------------------------|---------------|
| GET    | `/api/products`        | Retrieve all products           | No            |
| GET    | `/api/products/:id`    | Retrieve a specific product     | No            |
| POST   | `/api/products`        | Add a new product               | Admin Only    |
| PUT    | `/api/products/:id`    | Update a product                | Admin Only    |
| DELETE | `/api/products/:id`    | Delete a product                | Admin Only    |

### **Shopping Cart**

| Method | Endpoint              | Description                     | Authorization |
|--------|-----------------------|---------------------------------|---------------|
| GET    | `/api/cart`           | Get items in the user’s cart    | Yes           |
| POST   | `/api/cart`           | Add item to cart                | Yes           |
| PUT    | `/api/cart/:id`       | Update item quantity in cart    | Yes           |
| DELETE | `/api/cart/:id`       | Remove item from cart           | Yes           |

### **Orders**

| Method | Endpoint              | Description                     | Authorization |
|--------|-----------------------|---------------------------------|---------------|
| POST   | `/api/orders`         | Place a new order               | Yes           |
| GET    | `/api/orders`         | Get all user orders             | Yes           |
| GET    | `/api/orders/:id`     | Get details of a specific order | Yes           |
| PUT    | `/api/orders/:id`     | Update order status             | Admin Only    |


## **Folder Structure**

    ecommerce-api/ 
        ├── config/ # Configuration files (e.g., database, server) 
        ├── controllers/ # API request handlers 
        ├── models/ # Database models (e.g., User, Product, Order) 
        ├── routes/ # Express routes 
        ├── services/ # Business logic and external integrations 
        ├── utils/ # Utility functions and helpers 
        ├── middleware/ # Middleware functions (e.g., authentication) 
        ├── tests/ # Test files 
        ├── .env # Environment variables 
        ├── .gitignore # Git ignore file 
        ├── server.js # Main application entry point 
        ├── package.json # Project metadata and dependencies 
        └── README.md # Project documentation


## **Contributing**

We welcome contributions! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Open a pull request describing the changes.

Please ensure that your code follows the existing coding style and includes tests where applicable.

## **License**

This project is licensed under the [MIT License](LICENSE).

## **Contact**

For any questions or inquiries, feel free to contact:

- Name: Erastus Beloved
- Email: belovederastus@gmail.com
- GitHub: [Ndbeloved](https://github.com/Ndbeloved)

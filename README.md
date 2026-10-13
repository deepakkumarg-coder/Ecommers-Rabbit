# 🐰 Ecommers Rabbit — Full-Stack E-Commerce Platform

A full-stack e-commerce application built with **React, Vite, Tailwind CSS, Redux, Node.js, Express, and MongoDB**. Rabbit provides a complete shopping experience, including guest product browsing, cart management, secure user authentication, PayPal payments, order confirmation, and a dedicated admin dashboard.

🌐 **Live Website:** [Visit Rabbit](https://ecommers-rabbit-frontend-snowy.vercel.app/)

💻 **GitHub Repository:** [Ecommers Rabbit](https://github.com/deepakkumarg-coder/Ecommers-Rabbit)

☁️ **Frontend Deployment:** [Vercel Project Dashboard](https://vercel.com/acme-c487/ecommers-rabbit-frontend)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Customer Shopping Journey](#-customer-shopping-journey)
- [Admin Dashboard](#-admin-dashboard)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Payment Integration](#-payment-integration)
- [Deployment](#-deployment)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 📌 About the Project

**Rabbit** is a full-stack e-commerce platform designed to deliver a convenient shopping experience for customers and powerful management tools for administrators.

Customers can browse products, add items to their cart, authenticate when required, complete checkout, pay through PayPal, and view their order confirmation.

Administrators have access to a dedicated dashboard where they can monitor revenue and orders, manage users and product listings, and update order statuses.

The application uses a React-based frontend and a Node.js/Express backend connected to MongoDB. JWT and bcrypt support the authentication system, while Cloudinary handles product image uploads.

## ✨ Key Features

### 🛍️ Customer Experience

- Browse products as a guest.
- Select products and add them to the shopping cart.
- Review cart items and remove unwanted products.
- Sign in or log in when authentication is required during checkout.
- Complete a checkout form with delivery details.
- Review the order summary and pricing before payment.
- Pay through the PayPal payment gateway.
- View an order confirmation page after successful payment.
- Review order details and the estimated delivery date.

### 🔐 Authentication and Authorization

- User authentication using JSON Web Tokens (JWT).
- Password hashing with bcrypt.
- Role-based access for customers and administrators.
- Admin badge displayed for administrator accounts.
- Protected admin functionality based on user roles.

### 🛠️ Admin Dashboard

- View dashboard statistics, including orders and revenue.
- Manage users and update user roles.
- Create, edit, and delete products.
- View all customer orders.
- Update order statuses.
- Manage important aspects of the e-commerce platform from a dedicated dashboard.

### 💳 Payment and Media

- PayPal checkout integration.
- Payment workflow connected to order placement.
- Cloudinary integration for product image uploads.
- Centralized application state management with Redux.

---

## 🛒 Customer Shopping Journey

Rabbit is designed to make the shopping process straightforward, from browsing products to confirming an order.

### Step 1 — Browse Products

Customers can explore products without logging in. They can select items and add them to their shopping cart.

### Step 2 — Proceed to Checkout

When a guest attempts to check out, the application directs them to log in or authenticate as required. After successful authentication, they can continue to the checkout page.

### Step 3 — Review Cart and Order Summary

The checkout page displays the cart summary, item prices, and applicable totals. Customers can remove items they no longer want before completing the purchase.

### Step 4 — Enter Delivery Details

Customers complete the checkout form with the information required to process and deliver their order.

### Step 5 — Pay with PayPal

After the required checkout information is completed, the PayPal payment option becomes available. Customers use the payment gateway to complete the transaction.

### Step 6 — Order Confirmation

After successful payment and order processing, customers are taken to the order confirmation page.

The confirmation page provides details about the order and its estimated delivery date.

---

## 🛡️ Admin Dashboard

Rabbit includes a dedicated administrative interface for managing the platform.

### Dashboard Overview

Administrators can view key business information, including order activity and revenue earned.

### User Management

The admin user management page allows administrators to:

- View users.
- Create users, if supported by the application workflow.
- Update user roles.
- Manage user access according to the available administrative functionality.

### Product Management

The admin products page supports:

- Creating products.
- Editing existing products.
- Deleting products.
- Managing product listings and their associated images.

### Order Management

The admin orders page allows administrators to:

- View all orders.
- Inspect order details.
- Change order statuses.
- Track order progress through the available status options.

These features provide a central place to manage customer accounts, product listings, and order fulfillment.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Frontend development server and build tool |
| Tailwind CSS | Utility-first styling and responsive layouts |
| Redux | Application state management |
| PayPal | Payment gateway integration |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server-side routing |
| MongoDB | Database for application data |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Cloudinary | Product image upload and media storage |
| Git and GitHub | Version control |
| Vercel | Frontend deployment |

---

## 🏗️ Project Architecture

```text
                     CUSTOMER / ADMIN
                            |
                            v
                 +----------------------+
                 |      Frontend        |
                 | React + Vite         |
                 | Tailwind CSS + Redux |
                 +----------------------+
                            |
                       HTTP / API
                            |
                            v
                 +----------------------+
                 |       Backend        |
                 |    Node.js + Express |
                 +----------------------+
                    |        |        |
                    v        v        v
                MongoDB     JWT    Cloudinary
                 Data    Auth &     Image
                         Access     Upload
                            |
                            v
                    PayPal Payment
                    Integration
```

The frontend manages the user interface and application state. The Express backend handles API requests, authentication, authorization, data access, and integrations with external services.

MongoDB stores application data, JWT supports authenticated requests, bcrypt protects stored passwords through hashing, and Cloudinary manages image uploads.

PayPal provides the payment gateway used in the checkout workflow.

---

## 📂 Project Structure

The repository contains separate frontend and backend applications.

```text
Ecommers-Rabbit/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

*The directory names inside `src/` are illustrative. Retain your actual file structure if it differs.*

---

## 🚀 Getting Started

Follow these steps to run Rabbit locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A MongoDB database or MongoDB Atlas account
- A Cloudinary account for image uploads
- PayPal developer credentials for payment integration

### 1. Clone the repository

```bash
git clone https://github.com/deepakkumarg-coder/Ecommers-Rabbit.git
cd Ecommers-Rabbit
```

### 2. Install frontend dependencies

```bash
cd Frontend
npm install
```

### 3. Install backend dependencies

Open another terminal from the repository root:

```bash
cd Backend
npm install
```

### 4. Configure environment variables

Create the following local files:

- `Frontend/.env`
- `Backend/.env`

Use the `.env.example` templates described below as your starting point.

### 5. Start the backend

```bash
cd Backend
npm run dev
```

Use the development script configured in `Backend/package.json`. If the project uses a different script, run the appropriate one.

### 6. Start the frontend

In another terminal:

```bash
cd Frontend
npm run dev
```

Open the local URL shown by Vite, commonly `http://localhost:5173`.

Make sure the frontend's backend URL matches the address and port on which the backend is actually running.

---

## 🔧 Environment Configuration

Rabbit uses separate environment variables for the frontend and backend.

### Frontend — `Frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_PAYPAL_CLIENTTD=your_paypal_client_id
```

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL used by the frontend to communicate with the backend API |
| `VITE_PAYPAL_CLIENTTD` | PayPal client ID used by the frontend payment integration |

Vite variables can be accessed in React using:

```javascript
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENTTD;
```

These names must match the references in your actual frontend source code.

**Important:** Variables prefixed with `VITE_` are included in the client-side build. Do not store private credentials in frontend environment variables.

### Backend — `Backend/.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRETE_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLOUD_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_API_SECRETE=your_cloudinary_api_secret
```

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server, if configured by the application |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRETE_KEY` | Secret used to sign or verify JWTs, if this is the variable referenced by the backend |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_CLOUD_API_KEY` | Cloudinary API key |
| `CLOUDINARY_CLOUD_API_SECRETE` | Cloudinary API secret |

The backend can access these values through `process.env` when its environment-loading setup is configured correctly.

**Variable naming note:** The names `JWT_SECRETE_KEY` and `CLOUDINARY_CLOUD_API_SECRETE` have been retained as supplied. Check the backend source code before renaming them; environment variable names must match exactly.

---

## 💳 PayPal Payment Workflow

The payment flow allows customers to review their order before proceeding to PayPal.

1. The customer completes the checkout form.
2. The checkout page displays the PayPal payment option.
3. The customer completes the payment process.
4. The application processes the payment result.
5. After successful payment and order processing, the customer sees the order confirmation page.

The frontend PayPal client ID is configuration, not proof that a payment is valid. A production payment implementation should verify payment status on the backend before marking an order as paid or confirming fulfillment.

Never expose a PayPal client secret in the frontend.

---

## ☁️ Deployment

Rabbit's frontend and backend are deployed separately.

### Frontend — Vercel

Vercel dashboard:

[Open the Rabbit frontend project](https://vercel.com/acme-c487/ecommers-rabbit-frontend)

For a standard Vite frontend, configure:

| Setting | Value |
|---|---|
| Root Directory | `Frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Add these environment variables to the frontend Vercel project:

```env
VITE_BACKEND_URL=https://your-deployed-backend-domain
VITE_PAYPAL_CLIENTTD=your_paypal_client_id
```

Replace the example backend URL with your real deployed backend API URL.

Redeploy the frontend after updating environment variables.

### Backend — Express Hosting

Deploy the Express backend separately on your chosen Node.js hosting provider.

Configure the following backend environment variables through that provider's settings:

```text
PORT
MONGODB_URI
JWT_SECRETE_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_CLOUD_API_KEY
CLOUDINARY_CLOUD_API_SECRETE
```

Use your actual private values in the hosting dashboard, not in this README.

After deployment:

- Confirm the backend is reachable.
- Verify MongoDB connectivity.
- Check Cloudinary image upload functionality.
- Confirm JWT authentication and authorization work.
- Configure CORS to allow requests from the public frontend domain, if required.
- Update `VITE_BACKEND_URL` with the deployed backend URL.

The exact backend deployment instructions depend on the hosting provider and how the Express application is configured.

---

## 🔐 Security Best Practices

- Never commit real `.env` files or credentials to GitHub.
- Keep MongoDB credentials, JWT secrets, and Cloudinary API secrets on the backend.
- Never expose private payment credentials in frontend code.
- Hash passwords using bcrypt rather than storing plaintext passwords.
- Verify authorization on the backend for every admin-only operation.
- Validate and verify payment results on the backend.
- Validate user input and handle errors securely.
- Restrict database access and configure CORS appropriately.
- Rotate credentials immediately if they are accidentally exposed.

Recommended `.gitignore` entries:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
```

Check your existing `.gitignore` before replacing it.

---

## 🚧 Future Improvements

Potential improvements for Rabbit include:

- Automated tests for checkout and authentication flows.
- Enhanced order tracking and delivery notifications.
- Pagination for admin users, products, and orders.
- More detailed sales analytics.
- Improved accessibility and mobile responsiveness.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Open a pull request describing your contribution.


## 👨‍💻 Author

**Deepak Kumar G**

- GitHub: [@deepakkumarg-coder](https://github.com/deepakkumarg-coder)
- Repository: [Ecommers Rabbit](https://github.com/deepakkumarg-coder/Ecommers-Rabbit)

---

**Built with ❤️ using React, Tailwind CSS, Redux, Node.js, Express, and MongoDB.**
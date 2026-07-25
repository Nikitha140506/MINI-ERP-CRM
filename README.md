# Mini ERP CRM 
# Mini ERP CRM System 🚀

A full-stack Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) application developed to manage business operations digitally.

The system provides modules for authentication, customer management, product management, inventory tracking, sales management, invoice generation, and dashboard analytics.

---

# Project Overview

Mini ERP CRM helps organizations manage their daily business activities from a single platform.

The application follows a modern full-stack architecture where:

- Frontend handles user interaction and UI rendering.
- Backend provides REST APIs and business logic.
- Database stores and manages application data securely.

---

# Technology Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- React Icons

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt Password Encryption

---

# Features

## 1. Authentication and Role Management

The application provides secure authentication using JWT.

Features:

- User registration
- User login
- Password encryption using bcrypt
- Token-based authentication
- Role-based authorization

Supported roles:

- ADMIN
- SALES
- WAREHOUSE
- ACCOUNTS

---

## 2. Customer CRM Module

The CRM module manages customer information.

Capabilities:

- Add customers
- Update customer details
- Delete customers
- View customer records
- Search customers

Customer information includes:

- Name
- Email
- Mobile number
- Address

---

## 3. Product Management

The product module manages business products.

Features:

- Create products
- Update products
- Delete products
- View product details
- Manage product categories

---

## 4. Inventory Management

The inventory module tracks stock availability.

Features:

- Real-time stock monitoring
- Increase stock quantity
- Decrease stock quantity
- Low stock detection
- Inventory overview dashboard

---

## 5. Sales Management

The sales module manages business transactions.

Features:

- Create sales records
- Track sold products
- Calculate total amount
- Maintain sales history

---

## 6. Invoice Management

The invoice module helps generate and manage invoices.

Features:

- Create invoices
- View invoice details
- Maintain billing records

---

## 7. Dashboard Analytics

The dashboard provides business insights.

Displays:

- Total users
- Total customers
- Total products
- Sales summary
- Revenue analysis
- Inventory statistics
- Recent activities

Charts are implemented using Recharts for data visualization.

---

# System Architecture

```
User
 |
 |
Frontend (React + TypeScript)
 |
 |
REST API Communication
 |
 |
Backend (Node.js + Express)
 |
 |
Prisma ORM
 |
 |
PostgreSQL Database
```

---

# Authentication Flow

1. User enters login credentials.
2. Backend validates user details.
3. Password is verified using bcrypt.
4. JWT token is generated.
5. Token is stored on the client side.
6. Protected routes verify the token before allowing access.

---

# Database Design

Main entities:

- User
- Customer
- Product
- Inventory
- Sale
- Invoice
- Supplier
- Activity Log


Relationships are managed using Prisma ORM.

---

# API Structure

Example endpoints:

Authentication:

```
POST /api/auth/register
POST /api/auth/login
```

Customers:

```
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

Products:

```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Inventory:

```
GET /api/inventory
PUT /api/inventory/add/:id
PUT /api/inventory/remove/:id
```

---

# Deployment

Frontend:

- Hosted using Vercel

Backend:

- Hosted using Render

Database:

- PostgreSQL Database

---

# Future Enhancements

Possible improvements:

- Email notifications
- Advanced reporting
- Payment integration
- Export reports to PDF/Excel
- Multi-company support
- Cloud file storage

---

# Author

Nikitha

Full Stack Developer Project

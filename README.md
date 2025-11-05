# 🛍️ E-Commerce Platform (MERN)

A full-stack e-commerce application built using the MERN stack — allowing users to browse and purchase products, while merchants can manage and sell their items online.

## 🚀 Tech Stack
- **MongoDB** – Database
- **Express.js** – Backend Framework
- **React.js** – Frontend Library
- **Node.js** – Server Environment

## ⚙️ Features
- User authentication (Signup / Login)
- Browse products
- Add to cart & checkout
- Manage multiple addresses
- Admin panel for managing products

## 🧠 Setup Instructions
1. Clone the repository  
    ```bash
    git clone https://github.com/pramodrawat01/E-bajar.git

2. Navigate to the project folder
    ```bash
    cd E-bajar

3. Install dependencies for both frontend and backend
    ```bash
    cd backend && npm install
    cd ../frontend && npm install

4. Create a .env file in the backend with your credentials
    ```bash
    mongodb_uri=your_mongodb_uri
    secret_key=your_secret_key
    admin_username=admin-username
    admin_password=admin-password

    and cloudinary setup

5. Run the project
    ```bash
    npm run dev
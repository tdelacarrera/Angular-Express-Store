# About this project

This is a web store application built with **Angular** for the frontend and **Express.js** for the backend.

## 📋 Prerequisites

- **Node.js & npm**
- **Angular CLI**
- **MySQL**

## 🚀 Getting Started

**1. Clone the repository**

    git clone https://github.com/tdelacarrera/angular-express-store.git
    cd angular-express-store

## ⚙️ Backend Setup

**1. Navigate to backend folder**

    cd backend

**2. Install dependencies**

    npm install

**3. Create environment file**

    cp .env.example .env

**4. Create database, run migrations and seed data**

    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all

**5. Start the server**

    npm run dev

## 🌐 Frontend Setup 

**1. Navigate to frontend folder**

    cd frontend

**2. Install dependencies**

    npm install

**3. Start the server**

    ng serve


You can use following login credentials.

    Email: admin@example.com

    Password: admin

✅ Ready!

Visit http://localhost:4200 to view the application in your browser.
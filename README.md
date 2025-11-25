

# Budget Buddy

## Overview

Budget Buddy is a full-stack finance tracking app that helps users monitor their income and expenses in real time. It allows users to log transactions, view monthly summaries, and track their balance through an interactive dashboard.

The app is designed for people who want an easy way to understand and control their spending habits.

---

## Tech Stack

**Frontend**

* React (Vite)
* Recharts for data visualization
* Hosted on Vercel

**Backend**

* Node.js + Express
* Google OAuth for authentication
* Hosted on Render

**Database**

* PostgreSQL (Neon)

**External API**

* Quotes API (displays motivational financial quotes)

---

## Key Features

* Google OAuth login
* Add, view, edit, and delete transactions
* Monthly income vs expense bar chart
* Real-time balance tracking
* PostgreSQL data persistence
* Secure session handling

---

## API Endpoints

### POST – Add a transaction

```
POST /api/transactions
```

### GET – Get all transactions

```
GET /api/transactions
```

### GET – Get monthly summary

```
GET /api/transactions/monthly
```

### GET – Get random quote

```
GET /api/quote
```

---

## Live Links

**Frontend (Vercel)**
[https://budget-buddy-seven-rho.vercel.app](https://budget-buddy-seven-rho.vercel.app)

**Backend (Render)**
[https://budget-buddy-api-uic5.onrender.com](https://budget-buddy-api-uic5.onrender.com)

---

## How It Works

1. User logs in with Google
2. User is taken to dashboard
3. Transactions are fetched from PostgreSQL
4. Monthly summary is generated from stored data
5. When user adds a transaction, it is saved in the database and appears instantly on the UI

---

## Setup (Local Development)

### 1. Clone the repo

```bash
git clone <https://github.com/Seimht/budget-buddy.git>
cd budget-buddy
```

### 2. Start server

```bash
cd server
npm install
npm run dev
```

### 3. Start client in another terminal

```bash
cd client
npm install
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## Reflection

**Most challenging part**
Setting up Google OAuth and connecting it correctly between local and production environments.

**What I’m proud of**
Successfully building and deploying a complete full-stack application with authentication, database, API routes, and visualizations.

**What’s next**

* Budgeting goals
* Category breakdown charts
  
## Video link
 https://uncg-my.sharepoint.com/:v:/g/personal/sthabte_uncg_edu/IQB0OUNgR5WoSojrQKKkSteUAZyIskIcYCxiS9vE-FIMYro?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=TvAH64

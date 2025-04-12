# 🎯 Auction Frontend - React + Chakra UI

This is a frontend application built with **React** and styled using **Chakra UI**. It consumes a Django-based REST API for an auction platform. The application supports both user and company accounts, allowing them to interact with auctions, place bids, and for companies, create new auctions.

It also includes a **currency conversion feature** powered by the [Frankfurter API](https://www.frankfurter.app/), allowing users to view auction prices in different currencies.

---

## ⚙️ Features

### 🧑 User
- Register & login
- View all auctions
- Place bids
- Convert auction prices to another currency

### 🏢 Company
- Register & login
- View all auctions
- Place bids
- Create new auctions
- Convert auction prices to another currency

### 💱 Currency Conversion
- Real-time conversion using [Frankfurter API](https://www.frankfurter.app/)
- Supported currencies: USD, EUR, BRL, GBP, etc.

---

## 🛠️ Tech Stack

- React
- Chakra UI
- Axios
- React Router
- Context API (for Auth and Global State)
- Frankfurter API (for exchange rates)

---

## 🧑‍💻 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/derleysoares94/auction_frontend.git
cd auction_frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

---

## 🔐 Authentication Flow

- JWT or token-based auth using the Django backend.
- Auth tokens are stored in cookies.
- Protected routes are available based on the role (User or Company).

---

## 🔄 Currency Conversion

The conversion utility fetches exchange rates from Frankfurter.


Chakra components (like Select) are used to let users choose their desired currency.

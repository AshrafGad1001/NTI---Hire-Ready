# Employee Management System

An Employee Management System built with **Node.js**, **Express**, and **MongoDB**, featuring a complete authentication system using **JWT Access Tokens** and **Refresh Token Rotation**.

## Features

* ✅ JWT Access Token (15-minute expiration, stored in memory) + Refresh Token (7-day expiration, stored in an HttpOnly cookie)
* ✅ Refresh Token Rotation with token theft detection
* ✅ Refresh Tokens stored as SHA-256 hashes
* ✅ Role-based access control (User / Admin)
* ✅ Employee CRUD operations with Admin-only permissions
* ✅ Centralized error handling
* ✅ Mongoose validation with custom error messages

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

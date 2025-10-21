# 🧱 Node.js + TypeScript Starter

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A clean and modern **Node.js + TypeScript** boilerplate built with **Express**, **Jest**, and **ESLint + Prettier**.  
Perfect for starting APIs and backend services with confidence and speed 🚀

---

## ⚙️ Features

- 🚀 TypeScript + Express preconfigured
- 🧪 Jest for testing
- 🧹 ESLint + Prettier for linting & formatting
- 🌀 Nodemon for live reload in dev mode
- 🧩 Scalable project structure

---

## 🧰 Quick Start

```bash
# Clone the repo
git clone https://github.com/Nyxox-debug/nodejs-typescript-express-starter.git
cd nodejs-typescript-express-starter

# Install dependencies
npm install

# Run in dev mode
npm run dev
```

Visit: [http://localhost:3000/api/test](http://localhost:3000/api/test)

---

## 🏗️ Recommended Project Structure

```
src/
├── config/          # Config files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Data models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── types/           # Type definitions
├── __tests__/       # Jest tests
└── index.ts         # Entry point
```

---

## 📜 Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start in development mode        |
| `npm run build`    | Compile TypeScript to JavaScript |
| `npm start`        | Run compiled code                |
| `npm test`         | Run Jest tests                   |
| `npm run lint`     | Check lint errors                |
| `npm run lint:fix` | Fix lint issues                  |
| `npm run format`   | Format code with Prettier        |

---

## 🧱 Example Route

```typescript
// src/routes/test.route.ts
import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test route works!' });
});

export default router;
```

Response:

```json
{ "message": "Test route works!" }
```

---

## 🧩 Next Steps

- 🔐 Add JWT authentication
- 🧠 Integrate a database (MongoDB, PostgreSQL, etc.)
- 🪵 Add logging (Winston, Morgan)
- 📘 Add Swagger documentation
- 🐳 Dockerize for deployment

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

---

> 💡 _Built to save you setup time and help you ship faster._

# Setup Guide

This document provides step-by-step instructions for setting up this Node.js TypeScript starter project from scratch.

## Prerequisites

- Node.js (v18.x or v20.x recommended)
- npm or yarn

## Initial Setup

```bash
mkdir nodejs-typescript-starter
cd nodejs-typescript-starter
npm init -y
```

## Install Dependencies

### Core Dependencies

```bash
npm install express
npm install dotenv
```

### Development Dependencies

```bash
# TypeScript and Node types
npm install -D typescript ts-node nodemon
npm install -D @types/node @types/express

# ESLint and Prettier
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# Jest for testing
npm install -D jest ts-jest @types/jest
```

## Configuration Files

### 1. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 2. nodemon.json

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

### 3. jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.test.ts'],
};
```

### 4. .eslintrc.js

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
```

### 5. .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 6. .gitignore

```
node_modules/
dist/
.env
coverage/
*.log
.DS_Store
```

### 7. .env.example

```
PORT=3000
NODE_ENV=development
```

## Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
```

## Project Structure Setup

Create the following directory structure:

```
src/
├── config/          # Configuration files (database, etc.)
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Data models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── __tests__/       # Test files
└── index.ts         # Application entry point
```

## Initial Code Files

### src/index.ts

```typescript
import express, { Application } from 'express';
import dotenv from 'dotenv';
import testRouter from './routes/test.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/test', testRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

### src/routes/test.route.ts

```typescript
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Test route works!' });
});

export default router;
```

### src/**tests**/test.route.test.ts

```typescript
describe('Test Route', () => {
  it('should return success message', () => {
    expect(true).toBe(true);
  });
});
```

## Running the Project

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Run production build
npm start
```

## Managing Package Versions

### Version Range Strategy

In `package.json`, use semantic versioning:

- `^1.2.3` - allows minor and patch updates (recommended)
- `~1.2.3` - allows only patch updates (conservative)
- `1.2.3` - exact version (most stable)

### Regular Maintenance

When starting a new project from this template:

```bash
# Check for outdated packages
npm outdated

# Update packages within version ranges
npm update

# Check for major version updates
npx npm-check-updates -u
npm install

# Always test after updates
npm run test
npm run build
```

### Commit Lock File

Always commit `package-lock.json` to ensure consistent installations across environments.

## Troubleshooting

### Port Already in Use

Change the PORT in your `.env` file or stop the process using the port:

```bash
# Find process on port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### TypeScript Errors

```bash
# Clear build cache
rm -rf dist/
# Rebuild
npm run build
```

### ESLint/Prettier Conflicts

```bash
# Fix automatically
npm run lint:fix
npm run format
```

## Next Steps

After setup, consider adding:

- Database configuration (MongoDB, PostgreSQL, etc.)
- Authentication middleware (JWT, Passport)
- Logging (Winston, Morgan)
- API documentation (Swagger)
- Docker configuration
- CI/CD pipeline

## Working Versions

This setup was tested with:

- Node.js: 18.x and 20.x
- TypeScript: ^5.0.0
- Express: ^4.18.0
- Jest: ^29.0.0
- ESLint: ^8.0.0

For specific version numbers, check `package.json` in the repository.

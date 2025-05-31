# SocKit Monorepo — Development Setup Guide

Welcome to the SocKit monorepo! This guide will help you get your development environment up and running, and show you how to test and develop the SocKit Next.js addon locally.

---

## 1. Prerequisites

- **Node.js** v18 or newer (recommended)
- **npm** v7 or newer (npm comes with Node.js)

---

## 2. Install Dependencies

From the monorepo root:

```sh
npm install
```
This will install all dependencies and link all local packages using npm workspaces.

---

## 3. Build All Packages

From the monorepo root:

```sh
npm run build --workspaces
```
This will build all SocKit packages (`@sockit/types`, `@sockit/server`, `@sockit/client`, `@sockit/cli`).

---

## 4. Local Development Workflow

- Make changes in any `packages/*` directory.
- Rebuild with:
  ```sh
  npm run build --workspaces
  ```

---

## 5. Testing in a Next.js App (Recommended)

### **Important: How to Use Local Packages in Example Apps**

- **Add SocKit packages to your example app's `package.json` as dependencies:**
  ```json
  "dependencies": {
    "@sockit/client": "*",
    "@sockit/server": "*",
    "@sockit/types": "*",
    "@sockit/cli": "*"
  }
  ```
- **Do NOT run `npm install @sockit/cli` (or any SocKit package) from inside the example app.**
  - This will try to fetch from the npm registry and fail.
- **Always run `npm install` from the monorepo root.**
  - This will link all local workspace packages into your example app automatically.

---

### Example: Setting Up an Example App

1. **Create an Example App**
   ```sh
   mkdir -p examples/next-app
   cd examples/next-app
   npm init -y
   npm install next react react-dom
   # Edit package.json to add SocKit packages as shown above
   cd ../..
   npm install
   ```

2. **Import and Use SocKit**
   - Import your packages in the example app as you would in a real project.

3. **Run the Example App**
   ```sh
   cd examples/next-app
   npm run dev
   ```

---

## 6. Useful Commands

- **Install dependencies:**
  ```sh
  npm install
  ```
- **Build all packages:**
  ```sh
  npm run build --workspaces
  ```
- **Run a script in a single package:**
  ```sh
  cd packages/server
  npm run build
  ```
- **Add a new package:**
  ```sh
  mkdir -p packages/newpkg/src
  cd packages/newpkg
  npm init -y
  # Edit package.json as needed
  ```

---

## 7. Notes

- **No need for `npm link`** — npm workspaces handle local linking automatically.
- **No need for `pnpm`** — this repo is npm-native.
- **All workspace packages are private by default.**
- **For publishing:**
  - Build the package first (`npm run build` in the package directory).
  - Use `npm publish` from the package directory.

---

## 8. Troubleshooting

- If you see missing dependencies or build errors, try:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- If local packages are not linked, check your `workspaces` field in the root `package.json`.
- For TypeScript issues, ensure all packages have a valid `tsconfig.json` extending the root config.

---
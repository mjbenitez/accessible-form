# Accessible Form (Lit + Vite + Vitest + axe-core)

This project is a simple, accessible web form built using [Lit](https://lit.dev), designed to demonstrate best practices in accessibility and testing using [Vitest](https://vitest.dev) and [axe-core](https://github.com/dequelabs/axe-core).

## ✨ Features

- Built with **Lit** web components.
- Uses **Vite** for fast development and bundling.
- **Accessibility** audited using `axe-core`.
- **Unit and accessibility tests** powered by `Vitest` and `jsdom`.

---

## 📦 Project Structure

```
├── src/
|   └── components
│       └── accessible-form.ts        # Lit web component
|   └── test
│       └── accessible-form.test.ts   # Accessibility test using axe-core
├── vitest.config.ts              # Vitest setup with jsdom
├── index.html                    # Demo entry point
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Then open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Run Tests


```bash
npm run test
```

This includes:

- Axe-core accessibility audits

---

## 🛠 Notes

- Accessibility is checked using `axe-core` in combination with Lit’s Shadow DOM rendering.

---

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  esbuild: {
    target: 'es2022' // Asegura que ESBuild soporte la sintaxis
  }
}); 
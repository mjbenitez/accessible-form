import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['../src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,

      "jsx-a11y/alt-text": "error", // <img>, <area>, <input type="image"> should have alt
      "jsx-a11y/anchor-is-valid": "error", // <a> should have valid href 
      "jsx-a11y/click-events-have-key-events": "warn", // if there is onClick, there should also be onKeyDown/Up/Press
      "jsx-a11y/no-static-element-interactions": "warn", // avoid onClick on non-interactive elements without keyboard operation
      "jsx-a11y/aria-role": "error", // validate correct values in `role`
      "jsx-a11y/aria-props": "error", // validate correct values in ARIA properties
      "jsx-a11y/aria-unsupported-elements": "error", // ensure ARIA roles are not used on unsupported elements
      "jsx-a11y/heading-has-content": "error", // <h1> to <h6> should have content
      "jsx-a11y/label-has-for": "error", // <label> should have a 'for' attribute
      "jsx-a11y/label-has-associated-control": "error", // <label> should be associated with a control
      "jsx-a11y/no-autofocus": "warn", // avoid autofocus on elements
      "jsx-a11y/no-distracting-elements": "warn", // avoid elements that can distract users (e.g., <marquee>, <blink>)
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "warn", // prevent non-interactive elements from having interactive roles
      "jsx-a11y/no-noninteractive-element-to-interactive-handler": "warn", // prevent non-interactive elements from having interactive event handlers
      "jsx-a11y/no-noninteractive-tabindex": "warn", // prevent tabindex on non-interactive elements
      "jsx-a11y/role-has-required-aria-props": "error", // ensure roles have required ARIA properties
      "jsx-a11y/role-supports-aria-props": "error", // ensure roles support ARIA properties
      "jsx-a11y/anchor-has-content": "error", // <a> should have content
      "jsx-a11y/interactive-supports-focus": "warn", // ensure interactive elements can receive focus
      "jsx-a11y/no-noninteractive-element-interactions": "warn", // evitar eventos en elementos que no deben ser interactivos
    },
  },
];

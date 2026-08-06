# Calc7

A simple calculator web application built with React, TypeScript, and Vite.

## Features
- Input a mathematical expression (e.g., `2+3*4`).
- Client‑side validation to ensure only allowed characters are used.
- Safe evaluation of the expression using a strict Function constructor.
- Responsive UI with CSS Modules.
- Unit and integration tests with Jest and React Testing Library.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open your browser at `http://localhost:5173` (or the URL shown in the console) to use the calculator.

## Running Tests

```bash
npm test
```

The test suite includes component tests for the `Calculator` component, covering rendering, successful evaluation, and error handling.

## Project Structure

- `src/`
  - `components/Calculator.tsx` – Main calculator component.
  - `components/Calculator.module.css` – Scoped styling for the component.
  - `components/Calculator.test.tsx` – Tests for the component.
  - `App.tsx` – Application entry point that renders the `Calculator`.
  - `main.tsx` – React bootstrap.
- `.conventions/` – Coding conventions for TypeScript, React, etc.

## Contributing

Please follow the conventions defined in the `.conventions/` directory when adding new code or tests.

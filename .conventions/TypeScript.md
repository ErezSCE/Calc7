# TypeScript Conventions

## General
- Use `strict` mode (`"strict": true` in `tsconfig.json`).
- Prefer `const` over `let` unless reassignment is required.
- Use explicit return types for exported functions.
- Prefer `interface` for object shapes that are used in multiple places.

## Naming
- Files: `PascalCase` for components (`MyComponent.tsx`), `camelCase` for utility modules.
- Types/Interfaces: `PascalCase` (`User`, `CalculatorProps`).
- Variables/Functions: `camelCase`.

## React
- Functional components with `React.FC` when props are defined.
- Use hooks (`useState`, `useEffect`) with proper typing.
- Props interfaces should be defined and exported.

## Formatting
- Use 2‑space indentation.
- End statements with semicolons.
- Prefer single quotes for strings.

## Linting
- Follow the ESLint rules defined in the project (if any).
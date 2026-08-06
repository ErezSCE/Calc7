# React Conventions

## Component Naming
- Files: `PascalCase` with `.tsx` extension (e.g., `MyComponent.tsx`).
- Component names: `PascalCase`.

## Props
- Define a `Props` interface and export it if reused.
- Use `React.FC<Props>` when props are present.

## State & Hooks
- Use `useState` with explicit type when the initial value is `null` or `undefined`.
- Group related state together if possible.

## Styling
- Prefer CSS Modules (`Component.module.css`). Import as `styles`.
- Class names follow `camelCase`.

## Testing
- Use Jest with React Testing Library.
- Tests reside alongside component files with `.test.tsx` suffix.
- Prefer `data-testid` attributes for stable selectors.

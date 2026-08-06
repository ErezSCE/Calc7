/**
 * Validation utility for calculator expressions.
 * Returns an error message string if validation fails, otherwise null.
 */
export const validateExpression = (expr: string): string | null => {
  // Trim whitespace for validation checks.
  const trimmed = expr.trim();

  // 1. Allowed characters: digits, operators, parentheses, decimal point, whitespace.
  const allowedPattern = /^[0-9+\-*/().\s]+$/;
  if (!allowedPattern.test(trimmed)) {
    return 'Expression contains invalid characters.';
  }

  // 2. Balanced parentheses check.
  let balance = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
      if (balance < 0) {
        return 'Parentheses are not balanced.';
      }
    }
  }
  if (balance !== 0) {
    return 'Parentheses are not balanced.';
  }

  // No validation errors.
  return null;
};

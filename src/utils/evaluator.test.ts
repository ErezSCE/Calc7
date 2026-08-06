// src/utils/evaluator.test.ts
import { evaluateExpression } from './evaluator';
import { parseExpression } from './parser';

describe('evaluateExpression', () => {
  it('evaluates simple addition', () => {
    expect(evaluateExpression('1+2')).toBe(3);
  });

  it('respects operator precedence', () => {
    expect(evaluateExpression('2+3*4')).toBe(14);
    expect(evaluateExpression('2*3+4')).toBe(10);
  });

  it('handles parentheses', () => {
    expect(evaluateExpression('(2+3)*4')).toBe(20);
    expect(evaluateExpression('2*(3+4)')).toBe(14);
  });

  it('handles negative numbers and decimals', () => {
    expect(evaluateExpression('-5+2')).toBe(-3);
    expect(evaluateExpression('0.5*4')).toBe(2);
    expect(evaluateExpression('3.5-1.2')).toBeCloseTo(2.3);
  });

  it('throws error on division by zero', () => {
    expect(() => evaluateExpression('10/0')).toThrow('Division by zero');
  });

  it('throws SyntaxError on invalid expression', () => {
    expect(() => evaluateExpression('2++2')).toThrow(SyntaxError);
  });
});

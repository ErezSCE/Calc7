// src/utils/parser.test.ts
import { parseExpression, ASTNode, NumberNode, BinaryNode } from './parser';

describe('parseExpression', () => {
  it('parses a single number', () => {
    const ast = parseExpression('42');
    expect(ast).toEqual({ type: 'Number', value: 42 });
  });

  it('parses a negative number', () => {
    const ast = parseExpression('-7');
    expect(ast).toEqual({ type: 'Number', value: -7 });
  });

  it('parses a decimal number', () => {
    const ast = parseExpression('3.14');
    expect(ast).toEqual({ type: 'Number', value: 3.14 });
  });

  it('parses addition with correct AST structure', () => {
    const ast = parseExpression('1+2');
    const expected: BinaryNode = {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'Number', value: 1 },
      right: { type: 'Number', value: 2 },
    };
    expect(ast).toEqual(expected);
  });

  it('respects operator precedence (addition vs multiplication)', () => {
    const ast = parseExpression('2+3*4');
    // Expected: 2 + (3 * 4)
    const expected: BinaryNode = {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'Number', value: 2 },
      right: {
        type: 'BinaryExpression',
        operator: '*',
        left: { type: 'Number', value: 3 },
        right: { type: 'Number', value: 4 },
      },
    };
    expect(ast).toEqual(expected);
  });

  it('parses parentheses altering precedence', () => {
    const ast = parseExpression('(2+3)*4');
    // Expected: (2 + 3) * 4
    const expected: BinaryNode = {
      type: 'BinaryExpression',
      operator: '*',
      left: {
        type: 'BinaryExpression',
        operator: '+',
        left: { type: 'Number', value: 2 },
        right: { type: 'Number', value: 3 },
      },
      right: { type: 'Number', value: 4 },
    };
    expect(ast).toEqual(expected);
  });

  it('parses nested parentheses', () => {
    const ast = parseExpression('((1+2)*3)-4');
    // Expected: ((1+2)*3) - 4
    const expected: BinaryNode = {
      type: 'BinaryExpression',
      operator: '-',
      left: {
        type: 'BinaryExpression',
        operator: '*',
        left: {
          type: 'BinaryExpression',
          operator: '+',
          left: { type: 'Number', value: 1 },
          right: { type: 'Number', value: 2 },
        },
        right: { type: 'Number', value: 3 },
      },
      right: { type: 'Number', value: 4 },
    };
    expect(ast).toEqual(expected);
  });

  it('throws SyntaxError on invalid token sequence', () => {
    expect(() => parseExpression('2++2')).toThrow(SyntaxError);
  });

  it('throws SyntaxError on unmatched parenthesis', () => {
    expect(() => parseExpression('(1+2')).toThrow(SyntaxError);
  });
});

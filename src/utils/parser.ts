// src/utils/parser.ts
// Recursive descent parser for arithmetic expressions.
// Supports +, -, *, /, parentheses, decimals, and leading negative numbers.

export type ASTNode = NumberNode | BinaryNode;

export interface NumberNode {
  type: 'Number';
  value: number;
}

export interface BinaryNode {
  type: 'BinaryExpression';
  operator: '+' | '-' | '*' | '/';
  left: ASTNode;
  right: ASTNode;
}

/**
 * Parses a validated arithmetic expression string into an AST.
 * Throws SyntaxError if the expression cannot be parsed.
 */
export function parseExpression(input: string): ASTNode {
  const parser = new Parser(input);
  const ast = parser.parseExpression();
  if (!parser.isAtEnd()) {
    throw new SyntaxError('Unexpected characters at end of expression');
  }
  return ast;
}

class Parser {
  private readonly text: string;
  private pos: number = 0;

  constructor(text: string) {
    this.text = text.replace(/\s+/g, ''); // remove whitespace
  }

  // Entry point
  public parseExpression(): ASTNode {
    return this.parseAdditive();
  }

  // Helper to check end of input
  public isAtEnd(): boolean {
    return this.pos >= this.text.length;
  }

  // ---------- Grammar ----------
  // Additive -> Multiplicative (('+'|'-') Multiplicative)*
  private parseAdditive(): ASTNode {
    let node = this.parseMultiplicative();
    while (this.match('+') || this.match('-')) {
      const operator = this.previous() as '+' | '-';
      const right = this.parseMultiplicative();
      node = { type: 'BinaryExpression', operator, left: node, right };
    }
    return node;
  }

  // Multiplicative -> Primary (('*'|'/') Primary)*
  private parseMultiplicative(): ASTNode {
    let node = this.parsePrimary();
    while (this.match('*') || this.match('/')) {
      const operator = this.previous() as '*' | '/';
      const right = this.parsePrimary();
      node = { type: 'BinaryExpression', operator, left: node, right };
    }
    return node;
  }

  // Primary -> Number | '(' Additive ')'
  private parsePrimary(): ASTNode {
    if (this.match('(')) {
      const expr = this.parseAdditive();
      if (!this.match(')')) {
        throw new SyntaxError('Unmatched parenthesis');
      }
      return expr;
    }
    return this.parseNumber();
  }

  // Number -> (optional '-') digits ('.' digits)?
  private parseNumber(): NumberNode {
    const start = this.pos;
    // optional leading minus for negative numbers
    if (this.peek() === '-') {
      this.advance();
    }
    let hasDigits = false;
    while (this.isDigit(this.peek())) {
      hasDigits = true;
      this.advance();
    }
    if (this.peek() === '.') {
      this.advance(); // consume '.'
      while (this.isDigit(this.peek())) {
        hasDigits = true;
        this.advance();
      }
    }
    if (!hasDigits) {
      throw new SyntaxError('Invalid number at position ' + start);
    }
    const numberStr = this.text.slice(start, this.pos);
    const value = Number(numberStr);
    if (Number.isNaN(value)) {
      throw new SyntaxError('Invalid numeric value: ' + numberStr);
    }
    return { type: 'Number', value };
  }

  // ---------- Lexer helpers ----------
  private match(expected: string): boolean {
    if (this.peek() === expected) {
      this.advance();
      return true;
    }
    return false;
  }

  private previous(): string {
    return this.text[this.pos - 1];
  }

  private peek(): string {
    return this.text[this.pos] ?? '';
  }

  private advance(): void {
    this.pos++;
  }

  private isDigit(ch: string): boolean {
    return ch >= '0' && ch <= '9';
  }
}

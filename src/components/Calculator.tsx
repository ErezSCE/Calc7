import React, { useState } from 'react';
import styles from './Calculator.module.css';

/**
 * Calculator component
 * Allows user to input a mathematical expression, validates it, evaluates it,
 * and displays the result or an error message.
 */
const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    // Reset previous output on change
    setResult(null);
    setError(null);
  };

  const evaluateExpression = (expr: string): number => {
    // Simple safe evaluation using Function constructor.
    // This is limited to arithmetic operators and parentheses.
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; return (${expr});`);
    // The Function will throw if syntax is invalid.
    return fn();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic validation: allow digits, operators, parentheses, decimal point, whitespace.
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
      }
      const evalResult = evaluateExpression(expression);
      setResult(String(evalResult));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Evaluation error';
      setError(message);
    }
  };

  return (
    <div className={styles.calculator} data-testid="calculator">
      <h2 className={styles.title}>Calculator</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={expression}
          onChange={handleChange}
          placeholder="Enter expression"
          className={styles.input}
          data-testid="expression-input"
        />
        <button type="submit" className={styles.button} data-testid="evaluate-button">
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className={styles.result} data-testid="result">
          Result: {result}
        </div>
      )}
      {error && (
        <div className={styles.error} data-testid="error">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default Calculator;

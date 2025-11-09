// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Exponentiate })).toBe(
      36,
    );
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: 6, b: 2, action: 'some invalid action' }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: '6', b: true, action: Action.Add })).toBe(
      null,
    );
  });
});

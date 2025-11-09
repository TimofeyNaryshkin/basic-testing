// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    expect.assertions(1)
    const result = await resolveValue(4)
    expect(result).toBe(4)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const errMsg = 'some msg'
    expect(() => throwError(errMsg)).toThrow(errMsg)
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrow('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    expect.assertions(1)
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError)
  });
});

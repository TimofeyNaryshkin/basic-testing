// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const balance = 1000;
  const BIGMONEY = 1001;
  let account: BankAccount;
  let anotherAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(balance);
    anotherAccount = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    // Write your test here
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => account.withdraw(BIGMONEY)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() => account.transfer(BIGMONEY, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    expect(account.deposit(1000).getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(account.withdraw(500).getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    // Write your test here
    const transferAmount = 100;
    const originalBalance = account.getBalance();
    account.transfer(transferAmount, anotherAccount);
    const diff = originalBalance - account.getBalance();
    expect(diff).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);

    await expect(account.fetchBalance()).resolves.toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
    expect(account.fetchBalance).toHaveBeenCalledTimes(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

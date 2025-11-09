// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'node:fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;
  let setTimeoutSpy: jest.SpyInstance;
  const delay = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    doStuffByTimeout(callback, delay);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    doStuffByTimeout(callback, delay);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: jest.Mock;
  let setIntervalSpy: jest.SpyInstance;
  const delay = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
    setIntervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    doStuffByInterval(callback, delay);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    doStuffByInterval(callback, delay);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'some/path';
  const fullPath = '/absolute/some/path';
  const fileContent = 'some content';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    // Write your test here
    (path.join as jest.Mock).mockReturnValue(fullPath);
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (path.join as jest.Mock).mockReturnValue(fullPath);
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(fs.existsSync).toHaveBeenCalledWith(fullPath);
    expect(readFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    (path.join as jest.Mock).mockReturnValue(fullPath);
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(fs.existsSync).toHaveBeenCalledWith(fullPath);
    expect(readFile).toHaveBeenCalledWith(fullPath);
    expect(result).toBe(fileContent);
  });
});

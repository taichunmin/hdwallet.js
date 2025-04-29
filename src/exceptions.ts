interface OptionsInterface {
  expected?: any; got?: any; detail?: string;
}

export class CustomError extends Error {

  constructor(
    message: string, options?: OptionsInterface
  ) {
    if (options?.expected && options?.got && options?.detail) {
      super(`${message}, (expected: ${options?.expected} | got: ${options?.got}) ${options?.detail}`);
    } else if (options?.expected && options?.got) {
      super(`${message}, (expected: ${options?.expected} | got: ${options?.got})`);
    } else if (options?.detail) {
      super(`${message} ${options?.detail}`);
    } else {
      super(`${message}`)
    }
  }
}

export class EntropyError extends CustomError { }

export class MnemonicError extends CustomError { }

export class ChecksumError extends CustomError { }

export class NetworkError extends CustomError { }

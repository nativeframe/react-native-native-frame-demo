export interface ReactNativeLogger {
  log(m?: unknown, ...optionalParams: unknown[]): void;
  error(m?: unknown, ...optionalParams: unknown[]): void;
  warn(m?: unknown, ...optionalParams: unknown[]): void;
}

export class ReactNativeConsoleLogger implements ReactNativeLogger {
  log(m?: unknown, ...optionalParams: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(m, ...optionalParams);
  }

  error(m?: unknown, ...optionalParams: unknown[]): void {
    // eslint-disable-next-line no-console
    console.error(m, ...optionalParams);
  }

  warn(m?: unknown, ...optionalParams: unknown[]): void {
    // eslint-disable-next-line no-console
    console.warn(m, ...optionalParams);
  }
}

export const rnLogger = new ReactNativeConsoleLogger();

export interface ILogger {
  log(message: string): void;
  error(message: string, error?: any): void;
  warn(message: string): void;
  info(message: string): void;
}
export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export interface DatabaseConfig {
  host: string;
  user: string;
  pass: string;
}

export interface IAppConfig {
  getEmailConfig(): EmailConfig;
  getDatabaseConfig(): DatabaseConfig;
  getLogFilePath(): string;
  getUserDataPath(): string;
  getMaxLoginAttempts(): number;
  getSessionDurationHours(): number;
}
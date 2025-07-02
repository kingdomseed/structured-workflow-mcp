import { IAppConfig, EmailConfig, DatabaseConfig } from './IAppConfig';

export class AppConfig implements IAppConfig {
  getEmailConfig(): EmailConfig {
    return {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      user: process.env.EMAIL_USER || 'myapp@gmail.com',
      pass: process.env.EMAIL_PASS || 'change-me-in-production'
    };
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      pass: process.env.DB_PASS || 'change-me-in-production'
    };
  }

  getLogFilePath(): string {
    return process.env.LOG_FILE_PATH || './app.log';
  }

  getUserDataPath(): string {
    return process.env.USER_DATA_PATH || './users.json';
  }

  getMaxLoginAttempts(): number {
    return parseInt(process.env.MAX_LOGIN_ATTEMPTS || '3');
  }

  getSessionDurationHours(): number {
    return parseInt(process.env.SESSION_DURATION_HOURS || '24');
  }
}
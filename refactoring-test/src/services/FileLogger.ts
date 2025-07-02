import * as fs from 'fs';
import { ILogger } from './ILogger';
import { IAppConfig } from '../config/IAppConfig';

export class FileLogger implements ILogger {
  private logFile: string;

  constructor(private config: IAppConfig) {
    this.logFile = config.getLogFilePath();
  }

  log(message: string): void {
    this.writeLog('LOG', message);
  }

  error(message: string, error?: any): void {
    const errorDetail = error ? `: ${error.message || error}` : '';
    this.writeLog('ERROR', message + errorDetail);
  }

  warn(message: string): void {
    this.writeLog('WARN', message);
  }

  info(message: string): void {
    this.writeLog('INFO', message);
  }

  private writeLog(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    try {
      fs.appendFileSync(this.logFile, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }
}
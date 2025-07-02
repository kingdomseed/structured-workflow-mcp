import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { ILogger } from './ILogger';

export interface ExportData {
  users: User[];
  exportDate: Date;
  version: string;
}

export class DataImportExportService {
  private readonly CURRENT_VERSION = '1.0';

  constructor(
    private userRepository: IUserRepository,
    private logger: ILogger
  ) {}

  async exportAllData(): Promise<ExportData> {
    const users = await this.userRepository.findAll();
    
    return {
      users,
      exportDate: new Date(),
      version: this.CURRENT_VERSION
    };
  }

  async importData(data: any): Promise<boolean> {
    try {
      if (data.version !== this.CURRENT_VERSION) {
        throw new Error('Incompatible version');
      }
      
      // Clear existing users and import new ones
      const existingUsers = await this.userRepository.findAll();
      for (const user of existingUsers) {
        await this.userRepository.delete(user.id);
      }
      
      // Import new users
      for (const user of data.users) {
        await this.userRepository.save(user);
      }
      
      this.logger.info('Data imported successfully');
      return true;
    } catch (error) {
      this.logger.error('Import failed', error);
      return false;
    }
  }
}
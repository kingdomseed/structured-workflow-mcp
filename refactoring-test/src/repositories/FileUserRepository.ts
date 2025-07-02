import * as fs from 'fs';
import { User } from '../entities/User';
import { IUserRepository } from './IUserRepository';
import { IAppConfig } from '../config/IAppConfig';
import { ILogger } from '../services/ILogger';

export class FileUserRepository implements IUserRepository {
  private users: User[] = [];
  private dataPath: string;

  constructor(
    private config: IAppConfig,
    private logger: ILogger
  ) {
    this.dataPath = config.getUserDataPath();
    this.loadUsersFromFile();
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
    await this.saveUsersToFile();
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) {
      throw new Error(`User with id ${user.id} not found`);
    }
    this.users[index] = user;
    await this.saveUsersToFile();
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
    await this.saveUsersToFile();
  }

  private loadUsersFromFile(): void {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = fs.readFileSync(this.dataPath, 'utf8');
        this.users = JSON.parse(data);
        this.logger.info('Users loaded from file');
      }
    } catch (error) {
      this.logger.error('Failed to load users from file', error);
      this.users = [];
    }
  }

  private async saveUsersToFile(): Promise<void> {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.users, null, 2));
      this.logger.info('Users saved to file');
    } catch (error) {
      this.logger.error('Failed to save users to file', error);
      throw error;
    }
  }
}
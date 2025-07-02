import { User } from './entities/User';
import { IUserRepository } from './repositories/IUserRepository';
import { IAuthenticationService } from './services/IAuthenticationService';
import { IPasswordHasher } from './services/IPasswordHasher';
import { ILogger } from './services/ILogger';
import { IEmailService } from './services/IEmailService';
import { INotificationService } from './services/INotificationService';
import { AccountPreferencesFactory } from './factories/AccountPreferencesFactory';
import { ReportGenerator } from './services/ReportGenerator';
import { DataImportExportService } from './services/DataImportExportService';

// Refactored UserService following SOLID principles
export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthenticationService,
    private passwordHasher: IPasswordHasher,
    private logger: ILogger,
    private emailService: IEmailService,
    private notificationService: INotificationService,
    private preferencesFactory: AccountPreferencesFactory,
    private reportGenerator: ReportGenerator,
    private dataImportExportService: DataImportExportService
  ) {}

  // User Management
  public async createUser(userData: any): Promise<User> {
    const accountType = userData.accountType || 'basic';
    const preferences = this.preferencesFactory.createPreferences(accountType);
    
    const user: User = {
      id: this.generateUserId(),
      email: userData.email,
      password: this.passwordHasher.hash(userData.password),
      name: userData.name,
      age: userData.age,
      accountType: accountType as 'basic' | 'premium' | 'enterprise',
      createdAt: new Date(),
      lastLogin: null,
      loginAttempts: 0,
      isLocked: false,
      preferences,
      notifications: []
    };

    await this.userRepository.save(user);
    this.logger.info(`User created: ${user.email}`);
    
    // Send welcome email
    await this.sendWelcomeEmail(user);
    
    return user;
  }

  // Authentication
  public async authenticateUser(email: string, password: string): Promise<any> {
    try {
      const result = await this.authService.authenticate(email, password);
      if (result) {
        return result;
      }
      return null;
    } catch (error: any) {
      if (error.message === 'Account is locked') {
        await this.sendAccountLockedEmail(email);
        return { error: 'Account is locked' };
      }
      throw error;
    }
  }

  // Email helpers
  private async sendWelcomeEmail(user: User): Promise<void> {
    try {
      await this.emailService.sendEmail({
        to: user.email,
        subject: 'Welcome to Our App!',
        html: `
          <h1>Welcome ${user.name}!</h1>
          <p>Your account type is: ${user.accountType}</p>
          <p>You have ${user.preferences.maxStorage} of storage.</p>
        `
      });
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${user.email}`, error);
    }
  }

  private async sendAccountLockedEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return;
    
    try {
      await this.emailService.sendEmail({
        to: user.email,
        subject: 'Account Locked',
        text: 'Your account has been locked due to multiple failed login attempts.'
      });
    } catch (error) {
      this.logger.error(`Failed to send account locked email to ${email}`, error);
    }
  }

  // Utility methods remain in UserService as they're still needed

  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Report Generation
  public async generateUserReport(format: string): Promise<string | any> {
    return await this.reportGenerator.generateReport(format);
  }

  // User Search
  public async searchUsers(criteria: any): Promise<User[]> {
    const allUsers = await this.userRepository.findAll();
    let results = [...allUsers];
    
    if (criteria.email) {
      results = results.filter(u => u.email.includes(criteria.email));
    }
    
    if (criteria.name) {
      results = results.filter(u => u.name.toLowerCase().includes(criteria.name.toLowerCase()));
    }
    
    if (criteria.accountType) {
      results = results.filter(u => u.accountType === criteria.accountType);
    }
    
    if (criteria.isLocked !== undefined) {
      results = results.filter(u => u.isLocked === criteria.isLocked);
    }
    
    return results;
  }

  // Notification System
  public async sendNotification(userId: string, message: string, type: string): Promise<void> {
    await this.notificationService.sendNotification(userId, message, type);
  }

  // Data Export/Import
  public async exportAllData(): Promise<any> {
    return await this.dataImportExportService.exportAllData();
  }

  public async importData(data: any): Promise<boolean> {
    return await this.dataImportExportService.importData(data);
  }
}

// Example usage showing SOLID principles in action:
export async function demonstrateSOLID() {
  // Dependencies are injected, not created within the class
  const config = new (await import('./config/AppConfig')).AppConfig();
  const logger = new (await import('./services/FileLogger')).FileLogger(config);
  const passwordHasher = new (await import('./services/CryptoPasswordHasher')).CryptoPasswordHasher();
  const emailService = new (await import('./services/NodemailerEmailService')).NodemailerEmailService(config, logger);
  const userRepository = new (await import('./repositories/FileUserRepository')).FileUserRepository(config, logger);
  const authService = new (await import('./services/AuthenticationService')).AuthenticationService(
    userRepository,
    passwordHasher,
    logger,
    config
  );
  const notificationService = new (await import('./services/NotificationService')).NotificationService(
    userRepository,
    emailService
  );
  const preferencesFactory = new (await import('./factories/AccountPreferencesFactory')).AccountPreferencesFactory();
  const reportGenerator = new (await import('./services/ReportGenerator')).ReportGenerator(userRepository);
  const dataImportExportService = new (await import('./services/DataImportExportService')).DataImportExportService(
    userRepository,
    logger
  );
  
  // UserService now has a single responsibility: coordinating user operations
  const userService = new UserService(
    userRepository,
    authService,
    passwordHasher,
    logger,
    emailService,
    notificationService,
    preferencesFactory,
    reportGenerator,
    dataImportExportService
  );
  
  // Usage remains the same from the outside
  const user = await userService.createUser({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    age: 25,
    accountType: 'premium'
  });

  await userService.authenticateUser('test@example.com', 'password123');
  await userService.generateUserReport('json');
  await userService.searchUsers({ accountType: 'premium' });
  await userService.sendNotification(user.id, 'Welcome!', 'important');
}
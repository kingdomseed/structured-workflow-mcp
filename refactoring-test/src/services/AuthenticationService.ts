import * as crypto from 'crypto';
import { IAuthenticationService, AuthenticationResult } from './IAuthenticationService';
import { IUserRepository } from '../repositories/IUserRepository';
import { IPasswordHasher } from './IPasswordHasher';
import { ILogger } from './ILogger';
import { IAppConfig } from '../config/IAppConfig';
import { Session } from '../entities/User';

export class AuthenticationService implements IAuthenticationService {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private logger: ILogger,
    private config: IAppConfig
  ) {}

  async authenticate(email: string, password: string): Promise<AuthenticationResult | null> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      this.logger.warn(`Failed login attempt for unknown user: ${email}`);
      return null;
    }

    if (user.isLocked) {
      this.logger.warn(`Login attempt for locked user: ${email}`);
      throw new Error('Account is locked');
    }

    const isValidPassword = this.passwordHasher.verify(password, user.password);
    
    if (!isValidPassword) {
      user.loginAttempts++;
      
      const maxAttempts = this.config.getMaxLoginAttempts();
      if (user.loginAttempts >= maxAttempts) {
        user.isLocked = true;
        this.logger.warn(`User locked due to failed attempts: ${email}`);
      }
      
      await this.userRepository.update(user);
      return null;
    }

    // Reset on successful login
    user.loginAttempts = 0;
    user.lastLogin = new Date();
    await this.userRepository.update(user);
    
    this.logger.info(`Successful login: ${email}`);
    
    const session = this.createSession(user.id);
    
    return { user, session };
  }

  async lockAccount(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    
    user.isLocked = true;
    await this.userRepository.update(user);
    this.logger.info(`Account locked: ${user.email}`);
  }

  async unlockAccount(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    
    user.isLocked = false;
    user.loginAttempts = 0;
    await this.userRepository.update(user);
    this.logger.info(`Account unlocked: ${user.email}`);
  }

  createSession(userId: string): Session {
    const sessionDurationHours = this.config.getSessionDurationHours();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + sessionDurationHours);
    
    return {
      userId,
      token: crypto.randomBytes(32).toString('hex'),
      expiresAt
    };
  }
}
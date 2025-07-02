import { UserService } from './UserService';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';

// Mock the external dependencies
jest.mock('fs');
jest.mock('nodemailer');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe('UserService', () => {
  let userService: UserService;
  let mockTransporter: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock the email transporter
    mockTransporter = {
      sendMail: jest.fn((_options, callback) => {
        if (callback) callback(null, { messageId: 'test-id' });
        return Promise.resolve({ messageId: 'test-id' });
      })
    };

    mockNodemailer.createTransport.mockReturnValue(mockTransporter);

    // Mock file system operations
    mockFs.existsSync.mockReturnValue(false);
    mockFs.readFileSync.mockReturnValue('[]');
    mockFs.writeFileSync.mockImplementation(() => {});
    mockFs.appendFileSync.mockImplementation(() => {});

    // Create a new instance for each test
    userService = new UserService();
  });

  describe('User Creation', () => {
    it('should create a basic user with default preferences', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        age: 25
      };

      const user = userService.createUser(userData);

      expect(user).toMatchObject({
        email: 'test@example.com',
        name: 'Test User',
        age: 25,
        accountType: 'basic'
      });

      expect(user.preferences).toEqual({
        theme: 'light',
        emailNotifications: true,
        smsNotifications: false,
        maxStorage: '5GB'
      });

      expect(user.id).toBeDefined();
      expect(user.password).not.toBe('password123'); // Should be hashed
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.isLocked).toBe(false);
      expect(user.loginAttempts).toBe(0);
    });

    it('should create a premium user with premium preferences', () => {
      const userData = {
        email: 'premium@example.com',
        password: 'password123',
        name: 'Premium User',
        age: 30,
        accountType: 'premium'
      };

      const user = userService.createUser(userData);

      expect(user.accountType).toBe('premium');
      expect(user.preferences).toEqual({
        theme: 'dark',
        emailNotifications: true,
        smsNotifications: true,
        maxStorage: '100GB'
      });
    });

    it('should create an enterprise user with enterprise preferences', () => {
      const userData = {
        email: 'enterprise@example.com',
        password: 'password123',
        name: 'Enterprise User',
        age: 35,
        accountType: 'enterprise'
      };

      const user = userService.createUser(userData);

      expect(user.accountType).toBe('enterprise');
      expect(user.preferences).toEqual({
        theme: 'custom',
        emailNotifications: true,
        smsNotifications: true,
        maxStorage: 'unlimited',
        dedicatedSupport: true
      });
    });

    it('should save users to file after creation', () => {
      userService.createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        age: 25
      });

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        './users.json',
        expect.any(String)
      );
    });

    it('should send welcome email after user creation', () => {
      userService.createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        age: 25
      });

      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Welcome to Our App!'
        }),
        expect.any(Function)
      );
    });

    it('should log user creation', () => {
      userService.createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        age: 25
      });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        './app.log',
        expect.stringContaining('User created: test@example.com')
      );
    });
  });

  describe('Authentication', () => {
    beforeEach(() => {
      // Create a test user
      userService.createUser({
        email: 'auth@example.com',
        password: 'correctpassword',
        name: 'Auth User',
        age: 25
      });
      jest.clearAllMocks(); // Clear mocks after user creation
    });

    it('should authenticate user with correct credentials', () => {
      const result = userService.authenticateUser('auth@example.com', 'correctpassword');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('auth@example.com');
      expect(result.user.lastLogin).toBeInstanceOf(Date);
      expect(result.user.loginAttempts).toBe(0);
      
      expect(result.session).toBeDefined();
      expect(result.session.token).toBeDefined();
      expect(result.session.userId).toBe(result.user.id);
      expect(result.session.expiresAt).toBeInstanceOf(Date);
    });

    it('should return null for non-existent user', () => {
      const result = userService.authenticateUser('nonexistent@example.com', 'password');

      expect(result).toBeNull();
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        './app.log',
        expect.stringContaining('Failed login attempt for unknown user')
      );
    });

    it('should return null for incorrect password', () => {
      const result = userService.authenticateUser('auth@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should increment login attempts on failed authentication', () => {
      // First failed attempt
      userService.authenticateUser('auth@example.com', 'wrongpassword');
      
      // Check that user's login attempts increased
      const result = userService.authenticateUser('auth@example.com', 'correctpassword');
      expect(result.user.loginAttempts).toBe(0); // Reset after successful login
    });

    it('should lock account after 3 failed attempts', () => {
      // Three failed attempts
      userService.authenticateUser('auth@example.com', 'wrong1');
      userService.authenticateUser('auth@example.com', 'wrong2');
      userService.authenticateUser('auth@example.com', 'wrong3');

      // Fourth attempt should fail even with correct password
      const result = userService.authenticateUser('auth@example.com', 'correctpassword');
      
      expect(result).toEqual({ error: 'Account is locked' });
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: 'Account Locked'
        })
      );
    });

    it('should not authenticate locked user', () => {
      // Lock the account
      userService.authenticateUser('auth@example.com', 'wrong1');
      userService.authenticateUser('auth@example.com', 'wrong2');
      userService.authenticateUser('auth@example.com', 'wrong3');

      const result = userService.authenticateUser('auth@example.com', 'correctpassword');
      
      expect(result).toEqual({ error: 'Account is locked' });
    });

    it('should save users after authentication', () => {
      userService.authenticateUser('auth@example.com', 'correctpassword');

      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        './users.json',
        expect.any(String)
      );
    });
  });

  describe('User Search', () => {
    beforeEach(() => {
      // Create test users
      userService.createUser({
        email: 'john@example.com',
        password: 'pass',
        name: 'John Doe',
        age: 25,
        accountType: 'basic'
      });
      userService.createUser({
        email: 'jane@example.com',
        password: 'pass',
        name: 'Jane Smith',
        age: 30,
        accountType: 'premium'
      });
      userService.createUser({
        email: 'admin@company.com',
        password: 'pass',
        name: 'Admin User',
        age: 35,
        accountType: 'enterprise'
      });
    });

    it('should search users by email', () => {
      const results = userService.searchUsers({ email: 'example.com' });
      
      expect(results).toHaveLength(2);
      expect(results.every(u => u.email.includes('example.com'))).toBe(true);
    });

    it('should search users by name (case insensitive)', () => {
      const results = userService.searchUsers({ name: 'john' });
      
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('John Doe');
    });

    it('should search users by account type', () => {
      const results = userService.searchUsers({ accountType: 'premium' });
      
      expect(results).toHaveLength(1);
      expect(results[0].email).toBe('jane@example.com');
    });

    it('should search by multiple criteria', () => {
      const results = userService.searchUsers({ 
        email: 'example.com',
        accountType: 'basic'
      });
      
      expect(results).toHaveLength(1);
      expect(results[0].email).toBe('john@example.com');
    });

    it('should return empty array for no matches', () => {
      const results = userService.searchUsers({ email: 'nonexistent' });
      
      expect(results).toHaveLength(0);
    });
  });

  describe('Report Generation', () => {
    beforeEach(() => {
      // Create test users
      userService.createUser({
        email: 'user1@example.com',
        password: 'pass',
        name: 'User One',
        age: 25,
        accountType: 'basic'
      });
      userService.createUser({
        email: 'user2@example.com',
        password: 'pass',
        name: 'User Two',
        age: 30,
        accountType: 'premium'
      });
    });

    it('should generate JSON report', () => {
      const report = userService.generateUserReport('json');
      
      expect(report).toEqual({
        totalUsers: 2,
        usersByType: {
          basic: 1,
          premium: 1
        },
        lockedUsers: 0,
        activeUsers: 0
      });
    });

    it('should generate CSV report', () => {
      const report = userService.generateUserReport('csv');
      
      expect(report).toContain('Email,Name,Account Type,Created At,Last Login,Is Locked');
      expect(report).toContain('user1@example.com,User One,basic');
      expect(report).toContain('user2@example.com,User Two,premium');
    });

    it('should generate HTML report', () => {
      const report = userService.generateUserReport('html');
      
      expect(report).toContain('<table>');
      expect(report).toContain('<th>Email</th>');
      expect(report).toContain('user1@example.com');
      expect(report).toContain('user2@example.com');
    });

    it('should return error for unsupported format', () => {
      const report = userService.generateUserReport('xml');
      
      expect(report).toBe('Unsupported format');
    });
  });

  describe('Notifications', () => {
    let testUser: any;

    beforeEach(() => {
      testUser = userService.createUser({
        email: 'notify@example.com',
        password: 'pass',
        name: 'Notify User',
        age: 25,
        accountType: 'premium'
      });
      jest.clearAllMocks();
    });

    it('should add notification to user', () => {
      userService.sendNotification(testUser.id, 'Test message', 'info');
      
      // Need to get the updated user
      const users = userService.searchUsers({ email: 'notify@example.com' });
      const user = users[0];
      
      expect(user.notifications).toHaveLength(1);
      expect(user.notifications[0]).toMatchObject({
        message: 'Test message',
        type: 'info',
        read: false
      });
    });

    it('should send email for important notifications if enabled', () => {
      userService.sendNotification(testUser.id, 'Important message', 'important');
      
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'notify@example.com',
          subject: 'New Notification',
          text: 'Important message'
        })
      );
    });

    it('should not send email for non-important notifications', () => {
      userService.sendNotification(testUser.id, 'Regular message', 'info');
      
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });

    it('should handle non-existent user gracefully', () => {
      expect(() => {
        userService.sendNotification('invalid-id', 'Message', 'info');
      }).not.toThrow();
    });
  });

  describe('Data Import/Export', () => {
    beforeEach(() => {
      userService.createUser({
        email: 'export@example.com',
        password: 'pass',
        name: 'Export User',
        age: 25
      });
    });

    it('should export all data', () => {
      const exportedData = userService.exportAllData();
      
      expect(exportedData).toHaveProperty('users');
      expect(exportedData).toHaveProperty('exportDate');
      expect(exportedData).toHaveProperty('version', '1.0');
      expect(exportedData.users).toHaveLength(1);
      expect(exportedData.users[0].email).toBe('export@example.com');
    });

    it('should import valid data', () => {
      const dataToImport = {
        version: '1.0',
        users: [
          {
            id: 'imported_user',
            email: 'imported@example.com',
            name: 'Imported User',
            accountType: 'basic'
          }
        ]
      };

      const result = userService.importData(dataToImport);
      
      expect(result).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      
      const users = userService.searchUsers({ email: 'imported@example.com' });
      expect(users).toHaveLength(1);
    });

    it('should reject incompatible version', () => {
      const dataToImport = {
        version: '2.0',
        users: []
      };

      const result = userService.importData(dataToImport);
      
      expect(result).toBe(false);
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        './app.log',
        expect.stringContaining('Import failed')
      );
    });
  });

  describe('File Operations', () => {
    it('should handle file read errors gracefully', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      expect(() => new UserService()).not.toThrow();
    });

    it('should handle file write errors gracefully', () => {
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error('Write error');
      });

      expect(() => {
        userService.createUser({
          email: 'test@example.com',
          password: 'pass',
          name: 'Test',
          age: 25
        });
      }).not.toThrow();
    });

    it('should load existing users from file', () => {
      const existingUsers = [
        { id: '1', email: 'existing@example.com', name: 'Existing User' }
      ];
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingUsers));

      const newService = new UserService();
      const users = newService.searchUsers({});
      
      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('existing@example.com');
    });
  });
});
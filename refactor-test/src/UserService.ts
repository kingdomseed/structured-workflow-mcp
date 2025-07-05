import * as fs from 'fs';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  lastLogin: Date | null;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
  stats: {
    loginCount: number;
    lastActivity: Date | null;
  };
}

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

export class UserService {
  private users: Map<string, User> = new Map();
  private logFile: string = './app.log';
  private emailTransporter: nodemailer.Transporter;
  private notificationQueue: Notification[] = [];
  private reportTemplates: Map<string, string> = new Map();
  
  constructor() {
    // Email transporter setup
    // In tests, override to dummy transporter to prevent real SMTP connections
    if (process.env.NODE_ENV === 'test') {
      this.emailTransporter = {
        sendMail: async (_opts: any) => ({ messageId: 'test' })
      } as unknown as nodemailer.Transporter;
    } else {
      this.emailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'hardcoded@email.com',
          pass: 'hardcodedPassword123'
        }
      });
    }
    
    // Initialize report templates
    this.reportTemplates.set('user', '<h1>User Report</h1>');
    this.reportTemplates.set('admin', '<h1>Admin Report</h1>');
  }
  
  // User Management - Should be separate responsibility
  createUser(email: string, password: string, role: string) {
    this.log('info', `Creating user: ${email}`);
    
    // Validation mixed with business logic
    if (!email.includes('@')) {
      this.log('error', 'Invalid email format');
      throw new Error('Invalid email');
    }
    
    if (password.length < 6) {
      this.log('error', 'Password too short');
      throw new Error('Password must be at least 6 characters');
    }
    
    // Password hashing - should be separate service
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      lastLogin: null,
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      stats: {
        loginCount: 0,
        lastActivity: null
      }
    };
    
    this.users.set(user.id, user);
    
    // Send welcome email - mixed responsibility
    this.sendEmail(email, 'Welcome!', 'Thanks for joining!');
    
    // Add notification - another mixed responsibility
    this.addNotification(user.id, 'Account created', 'success');
    
    return user;
  }
  
  // Authentication - Should be separate service
  login(email: string, password: string) {
    this.log('info', `Login attempt for: ${email}`);
    
    const user = Array.from(this.users.values()).find(u => u.email === email);
    
    if (!user) {
      this.log('error', `User not found: ${email}`);
      throw new Error('Invalid credentials');
    }
    
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    if (user.password !== hashedPassword) {
      this.log('error', 'Invalid password');
      throw new Error('Invalid credentials');
    }
    
    // Update user stats
    user.lastLogin = new Date();
    user.stats.loginCount++;
    user.stats.lastActivity = new Date();
    
    // Generate session token - should be separate
    const token = crypto.randomBytes(32).toString('hex');
    
    // Send login notification
    this.sendEmail(email, 'Login Alert', `You logged in at ${new Date()}`);
    
    return { user, token };
  }
  
  // Logging - Should be separate service
  private log(level: string, message: string) {
    const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
    
    // Write to file - hardcoded implementation
    fs.appendFileSync(this.logFile, logEntry);
    
    // Also console log
    console.log(logEntry.trim());
  }
  
  // Email Service - Should be separate
  private sendEmail(to: string, subject: string, body: string) {
    // Hardcoded email logic
    try {
      this.emailTransporter.sendMail({
        from: 'noreply@app.com',
        to,
        subject,
        html: body
      });
      this.log('info', `Email sent to ${to}`);
    } catch (error) {
      this.log('error', `Failed to send email: ${error}`);
    }
  }
  
  // Notification System - Should be separate
  addNotification(userId: string, message: string, type: string) {
    const notification = {
      id: Date.now().toString(),
      userId,
      message,
      type,
      read: false,
      createdAt: new Date()
    };
    
    this.notificationQueue.push(notification);
    
    // Auto-cleanup old notifications - hardcoded logic
    if (this.notificationQueue.length > 100) {
      this.notificationQueue = this.notificationQueue.slice(-50);
    }
  }
  
  // Data Export - Should be separate service
  exportUserData(userId: string, format: string) {
    const user = this.users.get(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Hardcoded format handling
    switch (format) {
      case 'json':
        return JSON.stringify(user, null, 2);
      case 'csv':
        // Simplified CSV - doesn't handle nested objects properly
        return `id,email,role,createdAt\n${user.id},${user.email},${user.role},${user.createdAt}`;
      case 'xml':
        // Hardcoded XML generation
        return `<user><id>${user.id}</id><email>${user.email}</email></user>`;
      default:
        throw new Error('Unsupported format');
    }
  }
  
  // Report Generation - Should be separate
  generateReport(type: string) {
    const template = this.reportTemplates.get(type);
    
    if (!template) {
      throw new Error('Unknown report type');
    }
    
    // Hardcoded report logic
    if (type === 'user') {
      const userCount = this.users.size;
      const activeUsers = Array.from(this.users.values()).filter(u => 
        u.stats.lastActivity && (Date.now() - u.stats.lastActivity.getTime()) < 86400000
      ).length;
      
      return template.replace('</h1>', `</h1><p>Total Users: ${userCount}</p><p>Active Users: ${activeUsers}</p>`);
    }
    
    return template;
  }
  
  // Admin functions mixed with user functions - violates Interface Segregation
  deleteAllUsers() {
    this.log('warn', 'Deleting all users');
    this.users.clear();
    this.notificationQueue = [];
  }
  
  // Utility functions that don't belong here
  validateCreditCard(number: string): boolean {
    // Simplified validation - not actually Luhn algorithm
    return number.length === 16 && /^\d+$/.test(number);
  }
  
  calculateUserAge(birthDate: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
  
  // Database operations hardcoded - violates Dependency Inversion
  saveToDatabase() {
    const data = {
      users: Array.from(this.users.entries()),
      notifications: this.notificationQueue
    };
    
    fs.writeFileSync('./database.json', JSON.stringify(data));
  }
  
  loadFromDatabase() {
    try {
      const data = JSON.parse(fs.readFileSync('./database.json', 'utf8'));
      this.users = new Map(data.users);
      this.notificationQueue = data.notifications;
    } catch (error) {
      this.log('error', 'Failed to load database');
    }
  }
  
  // Method that violates Liskov Substitution - doesn't work as expected
  getUserById(id: string) {
    // Sometimes returns user, sometimes returns null, sometimes throws
    if (!id) {
      throw new Error('ID required');
    }
    
    if (id === 'admin') {
      // Special hardcoded behavior for admin
      return { id: 'admin', email: 'admin@app.com', role: 'admin' };
    }
    
    return this.users.get(id);
  }
  
  // More mixed responsibilities
  cleanupOldData() {
    // Delete old logs
    if (fs.existsSync(this.logFile)) {
      const stats = fs.statSync(this.logFile);
      if (stats.size > 1000000) { // 1MB
        fs.writeFileSync(this.logFile, '');
      }
    }
    
    // Remove inactive users
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    Array.from(this.users.entries()).forEach(([id, user]) => {
      if (!user.lastLogin || user.lastLogin.getTime() < thirtyDaysAgo) {
        this.users.delete(id);
      }
    });
    
    // Clear old notifications
    this.notificationQueue = this.notificationQueue.filter(n => 
      (Date.now() - n.createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000
    );
  }
}

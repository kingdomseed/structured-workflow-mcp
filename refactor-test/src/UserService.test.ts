import { UserService } from './UserService';

// Mock nodemailer createTransport for tests
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test' })
  })
}));

// Mock fs to prevent actual file operations
jest.mock('fs', () => ({
  appendFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(false),
  statSync: jest.fn()
}));

describe('UserService', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService();
  });
  
  describe('createUser', () => {
    it('should create a user with valid data', () => {
      const user = userService.createUser('test@example.com', 'password123', 'user');
      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe('user');
      expect(user.id).toBeDefined();
    });
    
    it('should throw error for invalid email', () => {
      expect(() => {
        userService.createUser('invalid-email', 'password123', 'user');
      }).toThrow('Invalid email');
    });
    
    it('should throw error for short password', () => {
      expect(() => {
        userService.createUser('test@example.com', '12345', 'user');
      }).toThrow('Password must be at least 6 characters');
    });
  });
  
  describe('login', () => {
    beforeEach(() => {
      userService.createUser('test@example.com', 'password123', 'user');
    });
    
    it('should login with correct credentials', () => {
      const result = userService.login('test@example.com', 'password123');
      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBeDefined();
    });
    
    it('should throw error for wrong password', () => {
      expect(() => {
        userService.login('test@example.com', 'wrongpassword');
      }).toThrow('Invalid credentials');
    });
  });
});

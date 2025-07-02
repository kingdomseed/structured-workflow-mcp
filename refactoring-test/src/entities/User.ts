export interface UserPreferences {
  theme: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maxStorage: string;
  dedicatedSupport?: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  createdAt: Date;
  read: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  age: number;
  accountType: 'basic' | 'premium' | 'enterprise';
  createdAt: Date;
  lastLogin: Date | null;
  loginAttempts: number;
  isLocked: boolean;
  preferences: UserPreferences;
  notifications: Notification[];
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
}
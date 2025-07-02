import { UserPreferences } from '../entities/User';

export class AccountPreferencesFactory {
  private readonly preferencesMap: Record<string, UserPreferences> = {
    basic: {
      theme: 'light',
      emailNotifications: true,
      smsNotifications: false,
      maxStorage: '5GB'
    },
    premium: {
      theme: 'dark',
      emailNotifications: true,
      smsNotifications: true,
      maxStorage: '100GB'
    },
    enterprise: {
      theme: 'custom',
      emailNotifications: true,
      smsNotifications: true,
      maxStorage: 'unlimited',
      dedicatedSupport: true
    }
  };

  createPreferences(accountType: string): UserPreferences {
    const preferences = this.preferencesMap[accountType];
    if (!preferences) {
      throw new Error(`Unknown account type: ${accountType}`);
    }
    return { ...preferences };
  }

  getSupportedAccountTypes(): string[] {
    return Object.keys(this.preferencesMap);
  }
}
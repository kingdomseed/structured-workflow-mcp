import * as crypto from 'crypto';
import { INotificationService } from './INotificationService';
import { IUserRepository } from '../repositories/IUserRepository';
import { IEmailService } from './IEmailService';
import { Notification } from '../entities/User';

export class NotificationService implements INotificationService {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async sendNotification(userId: string, message: string, type: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return;
    }

    const notification: Notification = {
      id: crypto.randomBytes(16).toString('hex'),
      message,
      type,
      createdAt: new Date(),
      read: false
    };

    user.notifications.push(notification);
    await this.userRepository.update(user);

    // Send email if enabled and important
    if (user.preferences.emailNotifications && type === 'important') {
      await this.emailService.sendEmail({
        to: user.email,
        subject: 'New Notification',
        text: message
      });
    }
  }
}
export interface INotificationService {
  sendNotification(userId: string, message: string, type: string): Promise<void>;
}
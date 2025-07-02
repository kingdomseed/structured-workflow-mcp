import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class ReportGenerator {
  constructor(private userRepository: IUserRepository) {}

  async generateReport(format: string): Promise<string | any> {
    const users = await this.userRepository.findAll();
    
    switch (format) {
      case 'json':
        return this.generateJsonReport(users);
      case 'csv':
        return this.generateCsvReport(users);
      case 'html':
        return this.generateHtmlReport(users);
      default:
        return 'Unsupported format';
    }
  }

  private generateJsonReport(users: User[]): any {
    const usersByType: Record<string, number> = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    users.forEach(user => {
      usersByType[user.accountType] = (usersByType[user.accountType] || 0) + 1;
    });

    const activeUsers = users.filter(user => 
      user.lastLogin && new Date(user.lastLogin) > thirtyDaysAgo
    );

    return {
      totalUsers: users.length,
      usersByType,
      lockedUsers: users.filter(u => u.isLocked).length,
      activeUsers: activeUsers.length
    };
  }

  private generateCsvReport(users: User[]): string {
    let csv = 'Email,Name,Account Type,Created At,Last Login,Is Locked\n';
    users.forEach(user => {
      csv += `${user.email},${user.name},${user.accountType},${user.createdAt},${user.lastLogin || 'Never'},${user.isLocked}\n`;
    });
    return csv;
  }

  private generateHtmlReport(users: User[]): string {
    let html = '<table><tr><th>Email</th><th>Name</th><th>Type</th></tr>';
    users.forEach(user => {
      html += `<tr><td>${user.email}</td><td>${user.name}</td><td>${user.accountType}</td></tr>`;
    });
    html += '</table>';
    return html;
  }
}
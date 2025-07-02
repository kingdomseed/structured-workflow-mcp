import * as nodemailer from 'nodemailer';
import { IEmailService, EmailOptions } from './IEmailService';
import { IAppConfig } from '../config/IAppConfig';
import { ILogger } from './ILogger';

export class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;

  constructor(
    private config: IAppConfig,
    private logger: ILogger
  ) {
    const emailConfig = config.getEmailConfig();
    this.fromEmail = emailConfig.user;
    
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: this.fromEmail,
        ...options
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.info(`Email sent to ${options.to}: ${options.subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      throw error;
    }
  }
}
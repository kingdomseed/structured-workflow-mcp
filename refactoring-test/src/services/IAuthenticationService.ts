import { User, Session } from '../entities/User';

export interface AuthenticationResult {
  user: User;
  session: Session;
}

export interface IAuthenticationService {
  authenticate(email: string, password: string): Promise<AuthenticationResult | null>;
  lockAccount(userId: string): Promise<void>;
  unlockAccount(userId: string): Promise<void>;
  createSession(userId: string): Session;
}
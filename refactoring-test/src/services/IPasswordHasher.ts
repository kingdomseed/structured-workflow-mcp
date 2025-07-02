export interface IPasswordHasher {
  hash(password: string): string;
  verify(password: string, hashedPassword: string): boolean;
}
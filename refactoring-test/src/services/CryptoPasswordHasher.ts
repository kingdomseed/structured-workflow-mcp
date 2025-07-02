import * as crypto from 'crypto';
import { IPasswordHasher } from './IPasswordHasher';

export class CryptoPasswordHasher implements IPasswordHasher {
  private readonly saltLength = 16;
  private readonly iterations = 100000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';

  hash(password: string): string {
    const salt = crypto.randomBytes(this.saltLength);
    const hash = crypto.pbkdf2Sync(
      password, 
      salt, 
      this.iterations, 
      this.keyLength, 
      this.digest
    );
    
    // Return salt and hash combined, encoded as hex
    return salt.toString('hex') + ':' + hash.toString('hex');
  }

  verify(password: string, hashedPassword: string): boolean {
    // For backward compatibility with old SHA256 hashes
    if (!hashedPassword.includes(':')) {
      // Old format - compare directly with SHA256
      const legacyHash = crypto.createHash('sha256').update(password).digest('hex');
      return hashedPassword === legacyHash;
    }

    // New format with salt
    const [saltHex, hashHex] = hashedPassword.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const hash = Buffer.from(hashHex, 'hex');
    
    const verifyHash = crypto.pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest
    );
    
    return crypto.timingSafeEqual(hash, verifyHash);
  }
}
import * as Speakeasy from 'speakeasy';

export class SecurityToken {

  static generateSecret(): string {
    return Speakeasy.generateSecretASCII();
  }

  static generateToken(secret: string): string {
    return Speakeasy.totp({ secret });
  }

  static validateToken(token: string, secret: string): boolean {
    return Speakeasy.totp.verify({ token, secret, window: 2 });
  }

}
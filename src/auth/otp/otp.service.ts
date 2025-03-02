import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import { users } from '../../database/schemas/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OtpService {
  constructor(@Inject('DB_CONNECTION') private db: any) {}

  // Generate a random 6-digit OTP
  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Save the OTP to the database
  async saveOtp(email: string, otp: string) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
    await this.db.update(users)
      .set({ otp, otpExpiresAt: expiresAt })
      .where(eq(users.email, email));
  }

  // Validate the OTP
  async validateOtp(email: string, otp: string): Promise<boolean> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));

    if (!user || !user.otp || !user.otpExpiresAt) {
      return false; // No OTP found
    }

    const now = new Date();
    if (now > user.otpExpiresAt) {
      return false; // OTP has expired
    }

    if (user.otp !== otp) {
      return false; // Invalid OTP
    }

    // Mark the user as verified
    await this.db.update(users)
      .set({ isVerified: true, otp: null, otpExpiresAt: null })
      .where(eq(users.email, email));

    return true;
  }
}
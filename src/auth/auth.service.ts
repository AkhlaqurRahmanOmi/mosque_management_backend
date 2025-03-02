import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from './otp/otp.service';
import { users } from '../database/schemas/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DB_CONNECTION') private db: any,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  // User Registration (Sign-Up)
  async signUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with isVerified set to false
    await this.db.insert(users).values({
      email,
      password: hashedPassword,
      role: 'user',
      isVerified: false,
    });

    // Generate and save OTP
    const otp = this.otpService.generateOtp();
    await this.otpService.saveOtp(email, otp);

    // TODO: Send the OTP to the user's email (use a mail service like Nodemailer)

    return { message: 'User registered successfully. Please verify your email.' };
  }

  // OTP Verification
  async verifyOtp(email: string, otp: string) {
    const isValid = await this.otpService.validateOtp(email, otp);
    if (!isValid) {
      throw new Error('Invalid or expired OTP');
    }
    return { message: 'Email verified successfully' };
  }

  // User Login (Sign-In)
  async signIn(email: string, password: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    if (!user.isVerified) {
      throw new Error('Please verify your email before logging in');
    }
    const token = this.jwtService.sign({ userId: user.id, role: user.role });
    return { token };
  }
}
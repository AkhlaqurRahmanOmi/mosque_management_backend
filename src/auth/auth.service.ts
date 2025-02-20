import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { users } from '../database/schemas/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DB_CONNECTION') private db: any,
    private jwtService: JwtService,
  ) {}

  // User Registration (Sign-Up)
  async signUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.db
      .insert(users)
      .values({ email, password: hashedPassword, role: 'user' });
    return { message: 'User registered successfully' };
  }

  // User Login (Sign-In)
  async signIn(email: string, password: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({ userId: user.id, role: user.role });
    return { token };
  }
}

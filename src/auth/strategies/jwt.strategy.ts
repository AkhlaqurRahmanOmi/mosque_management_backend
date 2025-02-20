import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract the JWT from the Authorization header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret key to validate the token's signature
      secretOrKey: process.env.JWT_SECRET,
      // Optional: Pass the raw token to the validate method
      passReqToCallback: true,
    });
  }

  // Validate the decoded payload of the JWT
  async validate(req: Request, payload: any) {
    // Attach the user ID and role to the request object
    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}

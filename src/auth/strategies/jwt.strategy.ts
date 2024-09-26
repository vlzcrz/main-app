import { PassportStrategy } from '@nestjs/passport';
import { Passport } from 'passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Passport) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { email: payload.email, rol: payload.rol };
  }
}

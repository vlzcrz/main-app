import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginUsuarioDto: LoginUserDto) {
    const { email, password } = loginUsuarioDto;
    const isUser = (user) => {
      return user.nombre === password && user.email === email;
    };

    try {
      const response = await axios.get(
        `${process.env.USER_SERVICE_HOST}/Usuarios`,
      );

      const user = response.data.find(isUser);
      if (!user)
        throw new UnauthorizedException(
          'El correo o la contraseña no son validos, ingrese nuevamente',
        );

      const payload: JwtPayload = {
        email: user.email,
        rol: user.tipo,
      };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user,
      };
    } catch (error) {
      return error.response;
    }
  }
}

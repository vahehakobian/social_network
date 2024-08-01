import { Injectable } from '@nestjs/common';

import { UtilsProvider } from '../../providers';
import { JwtService } from '../../shared/services/jwt.service';
import { UserService } from '../user/user.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UserRegisterDto } from './dto/user-register.dto';
import { InvalidPasswordException, UserNotFoundException } from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(userRegisterDto: UserRegisterDto): Promise<LoginPayloadDto> {
    const userEntity = await this.userService.createUser(userRegisterDto);

    const accessToken = this.jwtService.createAccessToken(userEntity);

    return new LoginPayloadDto({ accessToken, user: userEntity.toDto() });
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
    const userEntity = await this.userService.findByEmail(userLoginDto.email);

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await UtilsProvider.validateHash(
      userLoginDto.password,
      userEntity.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    const accessToken = this.jwtService.createAccessToken(userEntity);

    return new LoginPayloadDto({ accessToken, user: userEntity.toDto() });
  }
}

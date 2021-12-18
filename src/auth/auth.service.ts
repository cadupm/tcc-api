import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user: User;
    try {
      [user] = await this.usersService.findAll({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = password === user.password
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: any) {
    const payload = { user, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
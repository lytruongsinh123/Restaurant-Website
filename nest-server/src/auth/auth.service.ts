import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/utils/PasswordHelper';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;
    return user;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
  async handleRegister(createAuthDto: CreateAuthDto) {
    return await this.usersService.handleRegister(createAuthDto);
  }
  async checkCode(data: CodeAuthDto) {
    return await this.usersService.handleActive(data);
  }
  async retryActive(data: string) {
    return await this.usersService.retryActive(data);
  }
  async retryPassword(data: string) {
    return await this.usersService.retryPassword(data);
    }
    
    async changePassword(data: ChangePasswordAuthDto) {
    return await this.usersService.changePassword(data);
  }
  async getProfile(user: any) {
    return this.usersService.findById(user._id);
  }
}

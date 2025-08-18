import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header Authorization
      ignoreExpiration: false, // Không bỏ qua thời gian hết hạn
      secretOrKey: configService.get<string>('JWT_SECRET'), // Khóa bí mật để xác thực JWT
    });
  }
  // payload chính là dữ liệu bạn truyền vào khi sign token

  async validate(payload: any) {
    // Hàm này trả về gì thì sẽ gắn vào request.user
    return { _id: payload.sub, username: payload.username };
  }
}

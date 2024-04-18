import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../../user/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  token(user: User) {
    return {
      accessToken: this.jwtService.sign(
        { ...user },
        {
          expiresIn: this.configService.get("jwt_access_token_expires_time"),
        },
      ),
      refreshToken: this.jwtService.sign(
        { user_id: user.user_id },
        {
          expiresIn: this.configService.get("jwt_refresh_token_expres_time"),
        },
      ),
    };
  }
}

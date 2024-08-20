import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthUserDto } from "@/dtos/auth-user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(authUserDto: AuthUserDto) {
    const user = await this.usersService.findOne(authUserDto.email);

    if (user === null) {
      throw new NotFoundException();
    }

    const matches = await bcrypt.compare(authUserDto.password, user.password);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      token_type: "Bearer",
      expires_in: (
        this.configService.getOrThrow<number>("JWT_TOKEN_EXPIRES_IN") *
        24 *
        3600
      ).toString(),
    };
  }
}

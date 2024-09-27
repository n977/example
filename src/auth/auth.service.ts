import { ForbiddenException, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "@/dtos/login-user.dto";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginUserDto.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }

    const matches = await compare(loginUserDto.password, user.password);
    if (!matches) {
      throw new ForbiddenException();
    }

    const payload = {
      sub: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: "RS256",
    });

    return {
      accessToken,
      tokenType: "Bearer",
    };
  }
}

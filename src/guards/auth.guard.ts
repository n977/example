import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();

    const jwt = this.extractToken(req);
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(jwt);
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      req["user"] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(req: Request): string | null {
    const { headers } = req;
    const [type, jwt] = headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? jwt : null;
  }
}

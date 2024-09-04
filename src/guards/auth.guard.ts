import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const tok = this.extractToken(req);

    if (!tok) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(tok);
      req["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(req: Request): string | null {
    const { headers } = req;
    const [type, token] = headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : null;
  }
}

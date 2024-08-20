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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      req["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(req: Request): string | undefined {
    const { headers } = req;
    const [type, token] = headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}

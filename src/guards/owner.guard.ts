import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const { user, params } = req;
    return user.id === parseInt(params.userId);
  }
}

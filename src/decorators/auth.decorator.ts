import { applyDecorators, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@/guards/auth.guard";
import { OwnerGuard } from "@/guards/owner.guard";

export const Auth = (props?: { owned: boolean }) => {
  const optional = [];
  if (props?.owned) optional.push(UseGuards(OwnerGuard));

  return applyDecorators(
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse(),
    ApiBearerAuth(),
    ...optional,
  );
};

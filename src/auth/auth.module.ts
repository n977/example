import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

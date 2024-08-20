import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUserDto } from "@/dtos/auth-user.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiTags("auth")
  @ApiOperation({ summary: "Authenticate a user" })
  async auth(@Body() body: AuthUserDto) {
    return this.authService.auth(body);
  }
}

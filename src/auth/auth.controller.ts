import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { ApiForbiddenResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "@/dtos/login-user.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags("auth")
  @ApiOperation({ summary: "Authenticate a user" })
  @ApiForbiddenResponse()
  @Post("login")
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

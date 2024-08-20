import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import { AuthGuard } from "@/guards/auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "@/dtos/create-user.dto";
import { UpdateUserDto } from "@/dtos/update-user.dto";
import { AuthenticatedRequest } from "@/lib/auth";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags("users")
  @ApiOperation({ summary: "Create a new user" })
  async create(@Body(new ValidationPipe()) body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Get()
  @ApiTags("users")
  @ApiOperation({ summary: "Return all users" })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Return a user" })
  async findOne(
    @Param("id", new ValidationPipe({ transform: true })) id: number,
  ): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Update a user" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param("id", new ValidationPipe({ transform: true })) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    body: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new UnauthorizedException();
    }

    return this.usersService.update(id, body);
  }

  @Delete(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Delete a user" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("id") id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new UnauthorizedException();
    }

    return this.usersService.remove(id);
  }
}

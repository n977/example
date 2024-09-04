import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import { AuthGuard } from "@/guards/auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
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
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 409 })
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User | null> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiTags("users")
  @ApiOperation({ summary: "Return all users" })
  @ApiResponse({ status: 200 })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Return a user" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  async findOne(
    @Param("id", new ValidationPipe({ transform: true })) id: number,
  ): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 401 })
  @ApiResponse({ status: 403 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param("id", new ValidationPipe({ transform: true })) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new ForbiddenException();
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiTags("users")
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 401 })
  @ApiResponse({ status: 403 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("id", new ValidationPipe({ transform: true })) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new ForbiddenException();
    }

    return this.usersService.remove(id);
  }
}

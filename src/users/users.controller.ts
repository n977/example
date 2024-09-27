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
import { OwnerGuard } from "@/guards/owner.guard";
import { Auth } from "@/decorators/auth.decorator";
import { ApiDelete } from "@/decorators/delete.decorator";
import { ApiUpdate } from "@/decorators/update.decorator";
import { ApiCreate } from "@/decorators/create.decorator";
import { ApiRead } from "@/decorators/read.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags("users")
  @ApiCreate({ summary: "Create a new user" })
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags("users")
  @ApiRead({ summary: "Return all users" })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiTags("users")
  @ApiRead({ summary: "Return a user" })
  @Get(":userId")
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
  ) {
    return this.usersService.findOne(userId);
  }

  @ApiUpdate({ summary: "Update a user" })
  @ApiTags("users")
  @Auth({ owned: true })
  @Patch(":userId")
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @ApiDelete({ summary: "Delete a user" })
  @ApiTags("users")
  @Auth({ owned: true })
  @Delete(":userId")
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
  ) {
    return this.usersService.remove(userId);
  }
}

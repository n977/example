import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { hash } from "bcrypt";
import { CreateUserDto } from "@/dtos/create-user.dto";
import { UpdateUserDto } from "@/dtos/update-user.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const rounds = this.configService.get("consts.BCRYPT_ROUNDS");

    const password = await hash(createUserDto.password, rounds);

    let user = null;
    try {
      user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        // The user already exists.
        if (e.code === "P2002") {
          throw new ConflictException();
        }
      }
    }

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(key: number | string) {
    let user = null;
    if (typeof key === "number") {
      user = await this.prismaService.user.findUnique({
        where: {
          id: key,
        },
      });
    } else {
      user = await this.prismaService.user.findUnique({
        where: {
          email: key,
        },
      });
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const rounds = this.configService.get("consts.BCRYPT_ROUNDS");

    let password = updateUserDto.password;
    if (password) {
      password = await hash(password, rounds);
    }

    return this.prismaService.user.update({
      data: {
        ...updateUserDto,
        password,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { CreateUserDto } from "@/dtos/create-user.dto";
import { UpdateUserDto } from "@/dtos/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(key: number | string): Promise<User | null> {
    let user;

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const hash =
      updateUserDto.password && (await bcrypt.hash(updateUserDto.password, 10));

    return this.prismaService.user.update({
      data: {
        ...updateUserDto,
        password: hash,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}

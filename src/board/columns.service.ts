import { CreateColumnDto } from "@/dtos/create-column.dto";
import { UpdateColumnDto } from "@/dtos/update-column.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class ColumnsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createColumnDto: CreateColumnDto) {
    return this.prismaService.column.create({
      data: {
        ...createColumnDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.column.findMany({
      where: {
        userId,
      },
      include: {
        cards: {
          include: {
            comments: true,
          },
        },
      },
    });
  }

  async findOne(userId: number, columnId: number) {
    return this.prismaService.column.findUnique({
      where: {
        id: columnId,
        userId,
      },
      include: {
        cards: {
          include: {
            comments: true,
          },
        },
      },
    });
  }

  async update(
    userId: number,
    columnId: number,
    updateColumnDto: UpdateColumnDto,
  ) {
    const column = await this.findOne(userId, columnId);

    if (!column) throw new NotFoundException();

    return this.prismaService.column.update({
      where: {
        id: column.id,
      },
      data: updateColumnDto,
    });
  }

  async remove(userId: number, columnId: number) {
    const column = await this.findOne(userId, columnId);

    if (!column) throw new NotFoundException();

    return this.prismaService.column.delete({
      where: {
        id: column.id,
      },
    });
  }
}

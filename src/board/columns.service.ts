import { Injectable } from "@nestjs/common";
import { Column } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class ColumnsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number): Promise<Column> {
    return this.prismaService.column.create({
      data: {
        userId,
      },
    });
  }

  async findAll(userId: number): Promise<Column[]> {
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

  async findOne(userId: number, columnId: number): Promise<Column | null> {
    const columns = await this.findAll(userId);

    return columns[columnId - 1];
  }

  async remove(userId: number, columnId: number): Promise<Column> {
    const column = await this.findOne(userId, columnId);

    return this.prismaService.column.delete({
      where: {
        id: column?.id,
      },
    });
  }
}

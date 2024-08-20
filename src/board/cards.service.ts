import { Injectable } from "@nestjs/common";
import { Card, Column } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findParent(userId: number, columnId: number): Promise<Column> {
    const columns = await this.prismaService.column.findMany({
      where: {
        userId,
      },
    });

    return columns[columnId - 1];
  }

  async create(userId: number, columnId: number): Promise<Card> {
    const parent = await this.findParent(userId, columnId);

    return this.prismaService.card.create({
      data: {
        userId,
        columnId: parent.id,
      },
    });
  }

  async findAll(userId: number, columnId: number): Promise<Card[]> {
    const parent = await this.findParent(userId, columnId);

    return this.prismaService.card.findMany({
      where: {
        userId,
        columnId: parent.id,
      },
      include: {
        comments: true,
      },
    });
  }

  async findOne(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<Card | null> {
    const cards = await this.findAll(userId, columnId);

    return cards[cardId - 1];
  }

  async remove(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<Card> {
    const card = await this.findOne(userId, columnId, cardId);

    return this.prismaService.card.delete({
      where: {
        id: card?.id,
      },
    });
  }
}

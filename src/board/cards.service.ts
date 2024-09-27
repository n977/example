import { CreateCardDto } from "@/dtos/create-card.dto";
import { UpdateCardDto } from "@/dtos/update-card.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Card, Column } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";
import { ColumnsService } from "./columns.service";

@Injectable()
export class CardsService {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(userId: number, columnId: number, createCardDto: CreateCardDto) {
    const column = await this.columnsService.findOne(userId, columnId);

    if (!column) throw new NotFoundException();

    return this.prismaService.card.create({
      data: {
        ...createCardDto,
        userId,
        columnId,
      },
    });
  }

  async findAll(userId: number, columnId: number) {
    return this.prismaService.card.findMany({
      where: {
        userId,
        columnId,
      },
      include: {
        comments: true,
      },
    });
  }

  async findOne(userId: number, columnId: number, cardId: number) {
    return this.prismaService.card.findUnique({
      where: {
        id: cardId,
        userId,
        columnId,
      },
    });
  }

  async update(
    userId: number,
    columnId: number,
    cardId: number,
    updateCardDto: UpdateCardDto,
  ) {
    const card = await this.findOne(userId, columnId, cardId);

    if (!card) {
      throw new NotFoundException();
    }

    return this.prismaService.card.update({
      where: {
        id: card.id,
      },
      data: updateCardDto,
    });
  }

  async remove(userId: number, columnId: number, cardId: number) {
    const card = await this.findOne(userId, columnId, cardId);

    if (!card) throw new NotFoundException();

    return this.prismaService.card.delete({
      where: {
        id: card.id,
      },
    });
  }
}

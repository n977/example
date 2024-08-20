import { Injectable } from "@nestjs/common";
import { Card, Comment } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findParent(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<Card> {
    const columns = await this.prismaService.column.findMany({
      where: {
        userId,
      },
    });
    const cards = await this.prismaService.card.findMany({
      where: {
        columnId: columns[columnId - 1].id,
      },
    });

    return cards[cardId - 1];
  }

  async create(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<Comment> {
    const parent = await this.findParent(userId, columnId, cardId);

    return this.prismaService.comment.create({
      data: {
        userId,
        cardId: parent.id,
      },
    });
  }

  async findAll(
    userId: number,
    columnId: number,
    cardId: number,
  ): Promise<Comment[]> {
    const parent = await this.findParent(userId, columnId, cardId);

    return this.prismaService.comment.findMany({
      where: {
        userId,
        cardId: parent.id,
      },
    });
  }

  async findOne(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
  ): Promise<Comment | null> {
    const comments = await this.findAll(userId, columnId, cardId);

    return comments[commentId - 1];
  }

  async remove(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
  ): Promise<Comment> {
    const comment = await this.findOne(userId, columnId, cardId, commentId);

    return this.prismaService.comment.delete({
      where: {
        id: comment?.id,
      },
    });
  }
}

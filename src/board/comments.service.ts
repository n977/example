import { CreateColumnDto } from "@/dtos/create-column.dto";
import { CreateCommentDto } from "@/dtos/create-comment.dto";
import { UpdateCommentDto } from "@/dtos/update-comment.dto";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Card, Comment } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";
import { CardsService } from "./cards.service";

@Injectable()
export class CommentsService {
  constructor(
    private readonly cardsService: CardsService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    userId: number,
    columnId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const card = await this.cardsService.findOne(userId, columnId, cardId);

    if (!card) throw new NotFoundException();

    return this.prismaService.comment.create({
      data: {
        ...createCommentDto,
        userId,
        columnId,
        cardId,
      },
    });
  }

  async findAll(userId: number, columnId: number, cardId: number) {
    return this.prismaService.comment.findMany({
      where: {
        userId,
        columnId,
        cardId,
      },
    });
  }

  async findOne(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
  ) {
    return this.prismaService.comment.findUnique({
      where: {
        id: commentId,
        userId,
        columnId,
        cardId,
      },
    });
  }

  async update(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.findOne(userId, columnId, cardId, commentId);

    if (!comment) throw new NotFoundException();

    return this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      data: updateCommentDto,
    });
  }

  async remove(
    userId: number,
    columnId: number,
    cardId: number,
    commentId: number,
  ) {
    const comment = await this.findOne(userId, columnId, cardId, commentId);

    if (!comment) throw new NotFoundException();

    return this.prismaService.comment.delete({
      where: {
        id: comment.id,
      },
    });
  }
}

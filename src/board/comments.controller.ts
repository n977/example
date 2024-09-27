import { AuthGuard } from "@/guards/auth.guard";
import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  Req,
  ForbiddenException,
  UseGuards,
  ValidationPipe,
  Body,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Comment } from "@prisma/client";

import { CommentsService } from "src/board/comments.service";
import { ApiCreate } from "@/decorators/create.decorator";
import { CreateCommentDto } from "@/dtos/create-comment.dto";
import { ApiRead } from "@/decorators/read.decorator";
import { Auth } from "@/decorators/auth.decorator";
import { ApiDelete } from "@/decorators/delete.decorator";
import { UpdateCommentDto } from "@/dtos/update-comment.dto";
import { ApiUpdate } from "@/decorators/update.decorator";

@Controller("users/:userId/columns/:columnId/cards/:cardId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiTags("board")
  @ApiCreate({ summary: "Create a new comment" })
  @Auth({ owned: true })
  @Post()
  async createComment(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      userId,
      columnId,
      cardId,
      createCommentDto,
    );
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return all comments" })
  @Auth({ owned: true })
  @Get()
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId") cardId: number,
  ) {
    return this.commentsService.findAll(userId, columnId, cardId);
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return a comment" })
  @Auth({ owned: true })
  @Get(":commentId")
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    commentId: number,
  ) {
    return this.commentsService.findOne(userId, columnId, cardId, commentId);
  }

  @ApiTags("board")
  @ApiUpdate({ summary: "Update a comment" })
  @Auth({ owned: true })
  @Patch(":commentId")
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      userId,
      columnId,
      cardId,
      commentId,
      updateCommentDto,
    );
  }

  @ApiTags("board")
  @ApiDelete({ summary: "Delete a comment" })
  @Auth({ owned: true })
  @Delete(":commentId")
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    commentId: number,
  ) {
    return this.commentsService.remove(userId, columnId, cardId, commentId);
  }
}

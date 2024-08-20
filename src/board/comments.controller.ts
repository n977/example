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
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Comment } from "@prisma/client";
import { AuthenticatedRequest } from "@/lib/auth";
import { CommentsService } from "src/board/comments.service";

@Controller("users/:userId/columns/:columnId/cards/:cardId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiTags("board")
  @ApiOperation({ summary: "Create a new comment" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createComment(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Comment> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    return this.commentsService.create(userId, columnId, cardId);
  }

  @Get()
  @ApiTags("board")
  @ApiOperation({ summary: "Return all comments" })
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId") cardId: number,
  ): Promise<Comment[]> {
    return this.commentsService.findAll(userId, columnId, cardId);
  }

  @Get(":commentId")
  @ApiTags("board")
  @ApiOperation({ summary: "Return a comment" })
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    commentId: number,
  ): Promise<Comment | null> {
    return this.commentsService.findOne(userId, columnId, cardId, commentId);
  }

  @Patch(":commentId")
  @ApiTags("board")
  @ApiOperation({ summary: "Update a comment" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    _columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) _cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    _commentId: number,

    @Req() req: AuthenticatedRequest,
  ): Promise<Comment> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    throw new NotImplementedException();
  }

  @Delete(":commentId")
  @ApiTags("board")
  @ApiOperation({ summary: "Delete a comment" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Param("commentId", new ValidationPipe({ transform: true }))
    commentId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Comment> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    return this.commentsService.remove(userId, columnId, cardId, commentId);
  }
}

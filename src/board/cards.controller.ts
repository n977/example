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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Card } from "@prisma/client";
import { AuthenticatedRequest } from "@/lib/auth";
import { CardsService } from "src/board/cards.service";

@Controller("users/:userId/columns/:columnId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiTags("board")
  @ApiOperation({ summary: "Create a new card" })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 401 })
  @ApiResponse({ status: 403 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createCard(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Card> {
    if (req.user.sub !== userId) {
      throw new ForbiddenException();
    }

    return this.cardsService.create(userId, columnId);
  }

  @Get()
  @ApiTags("board")
  @ApiOperation({ summary: "Return all cards" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
  ): Promise<Card[]> {
    return this.cardsService.findAll(userId, columnId);
  }

  @Get(":cardId")
  @ApiTags("board")
  @ApiOperation({ summary: "Return a card" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
  ): Promise<Card | null> {
    return this.cardsService.findOne(userId, columnId, cardId);
  }

  @Patch(":cardId")
  @ApiTags("board")
  @ApiOperation({ summary: "Update a card" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 401 })
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 501 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    _columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) _cardId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Card> {
    if (req.user.sub !== userId) {
      throw new ForbiddenException();
    }

    throw new NotImplementedException();
  }

  @Delete(":cardId")
  @ApiTags("board")
  @ApiOperation({ summary: "Delete a card" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 401 })
  @ApiResponse({ status: 403 })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Card> {
    if (req.user.sub !== userId) {
      throw new ForbiddenException();
    }

    return this.cardsService.remove(userId, columnId, cardId);
  }
}

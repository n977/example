import { AuthGuard } from "@/guards/auth.guard";
import {
  Controller,
  Delete,
  Get,
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
import { User } from "@prisma/client";
import { CardsService } from "src/board/cards.service";
import { CreateCardDto } from "@/dtos/create-card.dto";
import { UpdateCardDto } from "@/dtos/update-card.dto";
import { ApiCreate } from "@/decorators/create.decorator";
import { Auth } from "@/decorators/auth.decorator";
import { ApiRead } from "@/decorators/read.decorator";
import { ApiDelete } from "@/decorators/delete.decorator";
import { ApiUpdate } from "@/decorators/update.decorator";

@Controller("users/:userId/columns/:columnId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiTags("board")
  @ApiCreate({ summary: "Create a new card" })
  @Auth({ owned: true })
  @Post()
  async createCard(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Body(new ValidationPipe({ transform: true })) createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(userId, columnId, createCardDto);
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return all cards" })
  @Auth({ owned: true })
  @Get()
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
  ) {
    return this.cardsService.findAll(userId, columnId);
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return a card" })
  @Auth({ owned: true })
  @Get(":cardId")
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
  ) {
    return this.cardsService.findOne(userId, columnId, cardId);
  }

  @ApiTags("board")
  @ApiUpdate({ summary: "Update a card" })
  @Auth({ owned: true })
  @Patch(":cardId")
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(userId, columnId, cardId, updateCardDto);
  }

  @ApiTags("board")
  @ApiDelete({ summary: "Delete a card" })
  @Auth({ owned: true })
  @Delete(":cardId")
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Param("cardId", new ValidationPipe({ transform: true })) cardId: number,
  ) {
    return this.cardsService.remove(userId, columnId, cardId);
  }
}

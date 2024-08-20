import { Module } from "@nestjs/common";
import { ColumnsService } from "src/board/columns.service";
import { CardsService } from "src/board/cards.service";
import { CommentsService } from "src/board/comments.service";
import { ColumnsController } from "src/board/columns.controller";
import { CardsController } from "src/board/cards.controller";
import { CommentsController } from "src/board/comments.controller";

@Module({
  providers: [ColumnsService, CardsService, CommentsService],
  controllers: [ColumnsController, CardsController, CommentsController],
})
export class BoardModule {}

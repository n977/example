import { Auth } from "@/decorators/auth.decorator";
import { ApiCreate } from "@/decorators/create.decorator";
import { ApiDelete } from "@/decorators/delete.decorator";
import { ApiRead } from "@/decorators/read.decorator";
import { ApiUpdate } from "@/decorators/update.decorator";
import { CreateColumnDto } from "@/dtos/create-column.dto";
import { UpdateColumnDto } from "@/dtos/update-column.dto";
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
import { ColumnsService } from "src/board/columns.service";

@Controller("users/:userId/columns")
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiTags("board")
  @ApiCreate({ summary: "Create a new column" })
  @Auth({ owned: true })
  @Post()
  async create(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Body(new ValidationPipe()) createColumnDto: CreateColumnDto,
  ) {
    return this.columnsService.create(userId, createColumnDto);
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return all columns" })
  @Auth({ owned: true })
  @Get()
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
  ) {
    return this.columnsService.findAll(userId);
  }

  @ApiTags("board")
  @ApiRead({ summary: "Return a column" })
  @Auth({ owned: true })
  @Get(":columnId")
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
  ) {
    return this.columnsService.findOne(userId, columnId);
  }

  @ApiTags("board")
  @ApiUpdate({ summary: "Update a column" })
  @Auth({ owned: true })
  @Patch(":columnId")
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(userId, columnId, updateColumnDto);
  }

  @ApiTags("board")
  @ApiDelete({ summary: "Delete a column" })
  @Auth({ owned: true })
  @Delete(":columnId")
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
  ) {
    return this.columnsService.remove(userId, columnId);
  }
}

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
import { Column } from "@prisma/client";
import { AuthenticatedRequest } from "@/lib/auth";
import { ColumnsService } from "src/board/columns.service";

@Controller("users/:userId/columns")
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiTags("board")
  @ApiOperation({ summary: "Create a new column" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Column> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    return this.columnsService.create(userId);
  }

  @Get()
  @ApiTags("board")
  @ApiOperation({ summary: "Return all columns" })
  async findAll(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
  ): Promise<Column[]> {
    return this.columnsService.findAll(userId);
  }
  @Get(":columnId")
  @ApiTags("board")
  @ApiOperation({ summary: "Return a column" })
  async findOne(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
  ): Promise<Column | null> {
    return this.columnsService.findOne(userId, columnId);
  }

  @Patch(":columnId")
  @ApiTags("board")
  @ApiOperation({ summary: "Update a column" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    _columnId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Column> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    throw new NotImplementedException();
  }

  @Delete(":columnId")
  @ApiTags("board")
  @ApiOperation({ summary: "Delete a column" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param("userId", new ValidationPipe({ transform: true })) userId: number,
    @Param("columnId", new ValidationPipe({ transform: true }))
    columnId: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<Column> {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException();
    }

    return this.columnsService.remove(userId, columnId);
  }
}

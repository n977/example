import { PartialType } from "@nestjs/swagger";
import { CreateColumnDto } from "@/dtos/create-column.dto";

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}

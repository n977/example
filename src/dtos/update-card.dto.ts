import { PartialType } from "@nestjs/swagger";
import { CreateCardDto } from "@/dtos/create-card.dto";

export class UpdateCardDto extends PartialType(CreateCardDto) {}

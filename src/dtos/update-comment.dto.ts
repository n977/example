import { PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "@/dtos/create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

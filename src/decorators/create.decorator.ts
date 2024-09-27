import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";

export const ApiCreate = (props: { summary: string }) => {
  return applyDecorators(
    ApiCreatedResponse(),
    ApiBadRequestResponse(),
    ApiOperation({ summary: props.summary }),
  );
};

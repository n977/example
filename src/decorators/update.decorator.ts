import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export const ApiUpdate = (props: { summary: string }) => {
  return applyDecorators(
    ApiOkResponse(),
    ApiBadRequestResponse(),
    ApiNotFoundResponse(),
    ApiOperation({ summary: props.summary }),
  );
};

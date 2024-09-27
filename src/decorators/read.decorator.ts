import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

export const ApiRead = (props: { summary: string }) => {
  return applyDecorators(
    ApiOkResponse(),
    ApiBadRequestResponse(),
    ApiOperation({ summary: props.summary }),
  );
};

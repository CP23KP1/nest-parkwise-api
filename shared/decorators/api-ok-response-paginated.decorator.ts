import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsePageMeta } from 'shared/types/page-meta.type';

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  options: ApiResponseOptions,
) =>
  applyDecorators(
    ApiExtraModels(ResponsePageMeta, dataDto),
    ApiOkResponse({
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePageMeta) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );

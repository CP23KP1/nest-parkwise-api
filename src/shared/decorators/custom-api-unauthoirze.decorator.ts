import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { kApiUnauthorizedResponseSchema } from '../constants';

export const CustomApiUnauthorize = () =>
  applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized (JWT token is missing or invalid)',
      schema: {
        ...kApiUnauthorizedResponseSchema,
      },
    }),
  );

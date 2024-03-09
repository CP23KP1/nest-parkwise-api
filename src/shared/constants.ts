export const kApiUnauthorizedResponseSchema = {
  properties: {
    statusCode: {
      type: 'number',
      example: 401,
    },
    message: {
      type: 'string',
      example: 'Unauthorized',
    },
  },
};

export const APP_NAME = 'Parkwise Management';

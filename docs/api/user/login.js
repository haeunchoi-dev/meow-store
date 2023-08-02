export default {
  '/api/user/login': {
    post: {
      tags: ['User'],
      summary: '로그인',
      description: '로그인',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'email',
                  example: 'test@test.com',
                },
                password: {
                  type: 'string',
                  description: 'password',
                  example: '###',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Product updated.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: 'token',
                  },
                  isAdmin: {
                    type: 'boolean',
                    description: 'admin 유무',
                    example: 'true',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

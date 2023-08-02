export default {
  '/api/categorys': {
    get: {
      tags: ['Categorys'],
      summary: 'Category 최상위 list 조회',
      description: 'Category 첫번째(대표) list 조회',
      responses: {
        200: {
          description: 'Category list',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '카테고리 id',
                      example: '카테고리 id(sdfsdf)',
                    },
                    category: {
                      type: 'string',
                      description: '카테고리 명',
                      example: '사료',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/categorys/{id}': {
    get: {
      tags: ['Categorys'],
      summary: 'Category 하위 list 조회',
      description: 'Category 하위 list 조회',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '카테고리 ID',
          schema: {
            type: 'string',
          },
          example: '카테고리 id(sfsdfsdf)',
        },
      ],
      responses: {
        200: {
          description: 'Category list',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '카테고리 id',
                      example: '카테고리 id(sdfsdf)',
                    },
                    category: {
                      type: 'string',
                      description: '카테고리 명',
                      example: '사료',
                    },
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

export default {
  '/api/admin/product': {
    post: {
      tags: ['Admin Product'],

      summary: 'Admin 상품 생성',
      description: 'Admin 상품 생성',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: '상품명',
                  example: '[사료]로얄캐닌 10kg',
                },
                price: {
                  type: 'int',
                  description: '판매가',
                  example: 100000,
                },
                summary: {
                  type: 'string',
                  description: '요약설명',
                  example: '어린 고양이를 위한 사료 10kg',
                },
                description: {
                  type: 'string',
                  description: '상세설명',
                  example: '어린 고양이에 너무 좋다고 하더라...',
                },
                repImgUrl: {
                  type: 'string',
                  description: '대표 이미지 url',
                  example: 'http:image/1/',
                },
                stock: {
                  type: 'Number',
                  description: '재고',
                  example: 10,
                },
                category: {
                  type: 'string',
                  description: '카테고리 id',
                  example: '카테고리 id(sdfsdf)',
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
            'application/json': {},
          },
        },
      },
    },
  },
  '/api/admin/product/{id}': {
    post: {
      tags: ['Admin Product'],

      summary: 'Admin 상품 상세 수정',
      description: 'Admin 상품 상세 수정',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '업데이트할 상품 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: '상품명',
                  example: '[사료]로얄캐닌 10kg',
                },
                price: {
                  type: 'int',
                  description: '판매가',
                  example: 100000,
                },
                summary: {
                  type: 'string',
                  description: '요약설명',
                  example: '어린 고양이를 위한 사료 10kg',
                },
                description: {
                  type: 'string',
                  description: '상세설명',
                  example: '어린 고양이에 너무 좋다고 하더라...',
                },
                repImgUrl: {
                  type: 'string',
                  description: '대표 이미지 url',
                  example: 'http:image/1/',
                },
                category: {
                  type: 'string',
                  description: '카테고리 id',
                  example: '카테고리 id(sdfsdf)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Admin 상품 updated.',
          content: {
            'application/json': {},
          },
        },
      },
    },
    delete: {
      tags: ['Admin Product'],

      summary: 'Admin 상품 삭제',
      description: 'Admin 상품 삭제',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '삭제할 상품 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Admin 상품 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};

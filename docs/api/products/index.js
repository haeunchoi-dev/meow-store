export default {
  '/api/products': {
    get: {
      tags: ['Products'],
      summary: '상품 list 조회',
      description: '상품 list 조회',
      parameters: [
        {
          name: 'category',
          in: 'query',
          description: 'category 필터 조건 / category id를 넘겨야함',
          schema: {
            type: 'string',
          },
          example: 'category id(sfsdfsdf)',
        },
      ],
      responses: {
        200: {
          description: '상품 list',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '상품 id',
                      example: '상품 id(sfsdf)',
                    },
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
                    createDate: {
                      type: 'Timestamp',
                      description: '생성일',
                      example: '2023-07-05',
                    },
                    createUser: {
                      type: 'String',
                      description: '생성자',
                      example: '최하은',
                    },
                    deleteYn: {
                      type: 'String',
                      description: '삭제 flag',
                      example: 'N',
                    },
                    category: {
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
      },
    },
  },
};

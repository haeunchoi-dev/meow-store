export default {
  '/api/admin/orders': {
    get: {
      tags: ['Admin Order'],
      summary: 'Admin 주문 조회',
      description: 'Admin 주문 조회',

      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '주문 ID',
          schema: {
            type: 'string',
          },
          example: '주문 id(sfsdfsdf)',
        },
      ],
      responses: {
        200: {
          description: 'Admin 주문 list',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '주문 id',
                      example: '주문 id(sfsdf)',
                    },
                    number: {
                      type: 'string',
                      description: '주문 번호',
                      example: '230706ssfesfes',
                    },
                    receiver: {
                      type: 'string',
                      description: '수령인',
                      example: '최하은',
                    },
                    contack: {
                      type: 'string',
                      description: '연락처',
                      example: '010-1234-5678',
                    },
                    zipCode: {
                      type: 'string',
                      description: '우편번호',
                      example: '010-010',
                    },
                    address: {
                      type: 'string',
                      description: '배송주소',
                      example: '서울특별시 무슨구 무슨도로...',
                    },
                    detailAddress: {
                      type: 'string',
                      description: '배송상세주소',
                      example: '무슨아파트 몇동 몇호',
                    },
                    shippingMessage: {
                      type: 'string',
                      description: '배송메시지',
                      example: '문앞에 두세영',
                    },
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            description: '상품 id',
                            example: '상품 id(sdfsdf)',
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
                          repImgUrl: {
                            type: 'string',
                            description: '대표 이미지 url',
                            example: 'http:image/1/',
                          },
                          deleteYn: {
                            type: 'String',
                            description: '삭제 flag',
                            example: 'N',
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
  '/api/admin/order/{id}': {
    post: {
      tags: ['Admin Order'],
      summary: 'Admin 주문 상태 수정',
      description: 'Admin 주문 상태 수정',

      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '상태 업데이트할 주문 id',
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
                status: {
                  type: 'string',
                  description: '주문상태',
                  example: 'SHIPPING',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '주문 updated.',
          content: {
            'application/json': {},
          },
        },
      },
    },
    delete: {
      tags: ['Admin Order'],
      summary: 'Admin 주문 삭제',
      description: 'Admin 주문 삭제',

      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '삭제할 주문 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: '주문 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};

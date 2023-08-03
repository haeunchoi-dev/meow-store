export default {
  '/api/member/order': {
    post: {
      tags: ['Member Order'],

      summary: '주문 진행',
      description: '주문 진행',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                receiver: {
                  type: 'string',
                  description: '수령인',
                  example: '최하은',
                },
                receiverContact: {
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
                totalPrice: {
                  type: 'Number',
                  description: 'total 가격',
                  example: 100000,
                },
                orderItemList: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      productId: {
                        type: 'string',
                        description: '상품 id',
                        example: '64a80c24e44baefcf37f9fe6',
                      },
                      quantity: {
                        type: 'Number',
                        description: '수량',
                        example: 1,
                      },
                      totalPrice: {
                        type: 'Number',
                        description: '수량',
                        example: 10000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '주문 진행 완료.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    description: '주문 id',
                    example: '주문 id(sfsdf)',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/member/order/{id}': {
    get: {
      tags: ['Member Order'],

      summary: '사용자별 구매 내역 상세 조회',
      description: '사용자별 구매 내역 상세 조회',
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
          description: '상품 상세',
          content: {
            'application/json': {
              schema: {
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
    post: {
      tags: ['Member Order'],

      summary: '사용자별 주문 전체취소',
      description: '사용자별 주문 전체취소',
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
          description: '주문 취소 완료.',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
  '/api/member/order/{id}/info': {
    post: {
      tags: ['Member Order'],

      summary: '사용자별 주문 상세 (사용자 정보) 수정',
      description: '사용자별 주문 상세 (사용자 정보) 수정',
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
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '주문 상세 (사용자 정보) 수정 완료.',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
  '/api/member/order/{id}/products': {
    delete: {
      tags: ['Member Order'],

      summary: '사용자별 주문 상세 (상품) 삭제',
      description: '사용자별 주문 상세 (상품) 삭제',
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
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                orderItemIds: {
                  type: 'array',
                  items: {
                    type: 'string',
                    description: 'OrderItem id',
                    example: 'OrderItem id',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '주문 상세 (상품) 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};

export default {
  '/api/member/orders': {
    get: {
      tags: ['Member Order'],

      summary: '사용자별 구매 내역 조회',
      description: '사용자별 구매 내역 조회',
      responses: {
        200: {
          description: '사용자별 구매 list',
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
                      example: '2023070601(날짜와 시간 외 조합)',
                    },
                    title: {
                      type: 'string',
                      description: '주문 제목',
                      example: '[사료]로얄캐닌 10kg 외 25건',
                    },
                    price: {
                      type: 'int',
                      description: '최종 주문가',
                      example: 200000,
                    },
                    repImgUrl: {
                      type: 'string',
                      description: '대표 이미지 url',
                      example: 'http:image/1/',
                    },
                    createDate: {
                      type: 'Timestamp',
                      description: '주문일',
                      example: '2023-07-05',
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

export default {
  '/api/user/register': {
    post: {
      tags: ['User'],
      summary: '회원가입',
      description: '회원가입',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: '이름',
                  example: '최하은',
                },
                contact: {
                  type: 'string',
                  description: '연락처',
                  example: '010-1234-5678',
                },
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
                address: {
                  type: 'object',
                  properties: {
                    zipCode: {
                      type: 'string',
                      description: '우편번호',
                      example: '41564',
                    },
                    address: {
                      type: 'string',
                      description: '주소',
                      example: '서울시 무슨구...',
                    },
                    detailAddress: {
                      type: 'string',
                      description: '상세 주소',
                      example: '상세 주소...',
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
          description: 'Product updated.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: '이름',
                    example: '최하은',
                  },
                  contact: {
                    type: 'string',
                    description: '연락처',
                    example: '010-1234-5678',
                  },
                  password: {
                    type: 'string',
                    description: 'password',
                    example: '###',
                  },
                  address: {
                    type: 'object',
                    properties: {
                      zipCode: {
                        type: 'string',
                        description: '우편번호',
                        example: '41564',
                      },
                      address: {
                        type: 'string',
                        description: '주소',
                        example: '서울시 무슨구...',
                      },
                      detailAddress: {
                        type: 'string',
                        description: '상세 주소',
                        example: '상세 주소...',
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

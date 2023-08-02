export default {
  '/api/user/mypage': {
    get: {
      tags: ['User'],
      summary: '사용자 정보 조회',
      description: '사용자 정보 조회',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: '사용자 정보 수정 완료.',
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
                  role: {
                    type: 'string',
                    description: 'role',
                    example: 'user',
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
    post: {
      tags: ['User'],
      summary: '사용자 정보 수정',
      description: '사용자 정보 수정',
      security: [
        {
          bearerAuth: [],
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
                  description: '이름',
                  example: '최하은',
                },
                contact: {
                  type: 'string',
                  description: '연락처',
                  example: '010-1234-5678',
                },
                currentPassword: {
                  type: 'string',
                  description: '현재 password',
                  example: '###',
                },
                password: {
                  type: 'string',
                  description: '바꿀 password',
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
          description: '사용자 정보 수정 완료.',
          content: {
            'application/json': {},
          },
        },
      },
    },
    delete: {
      tags: ['User'],
      summary: '회원탈퇴',
      description: '회원탈퇴',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: '회원탈퇴 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
  '/api/user/mypage/{userId}': {
    get: {
      tags: ['User'],
      summary: 'Admin 사용자 정보 조회',
      description: 'Admin 사용자 정보 조회',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'user ID',
          schema: {
            type: 'string',
          },
          example: 'user id(sfsdfsdf)',
        },
      ],
      responses: {
        200: {
          description: '사용자 정보 수정 완료.',
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
                  role: {
                    type: 'string',
                    description: 'role',
                    example: 'user',
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
    post: {
      tags: ['User'],
      summary: 'Admin 사용자 정보 수정',
      description: 'Admin 사용자 정보 수정',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'user ID',
          schema: {
            type: 'string',
          },
          example: 'user id(sfsdfsdf)',
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
                  description: '이름',
                  example: '최하은',
                },
                contact: {
                  type: 'string',
                  description: '연락처',
                  example: '010-1234-5678',
                },
                currentPassword: {
                  type: 'string',
                  description: '현재 password',
                  example: '###',
                },
                password: {
                  type: 'string',
                  description: '바꿀 password',
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
          description: '사용자 정보 수정 완료.',
          content: {
            'application/json': {},
          },
        },
      },
    },
    delete: {
      tags: ['User'],
      summary: 'Admin 회원탈퇴',
      description: 'Admin 회원탈퇴',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          description: 'user ID',
          schema: {
            type: 'string',
          },
          example: 'user id(sfsdfsdf)',
        },
      ],
      responses: {
        200: {
          description: '회원탈퇴 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};

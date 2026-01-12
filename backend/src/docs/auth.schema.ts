const authDocsSchema = {
  ApiMeta: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success' },
    },
  },
  ApiErrorResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        oneOf: [
          { type: 'array', items: { type: 'string' } },
          { type: 'null' },
        ],
        example: null,
      },
    },
  },
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a2' },
      fullName: { type: 'string', example: 'John Doe' },
      username: { type: 'string', example: 'johndoe123' },
      email: { type: 'string', example: 'john.doe@gmail.com' },
      role: { type: 'string', example: 'member' },
      profilePicture: { type: 'string', example: 'user.jpg' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
      updatedAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
    },
  },
  CreateUserInput: {
    type: 'object',
    required: ['fullName', 'username', 'email', 'password', 'confirmPassword'],
    properties: {
      fullName: { type: 'string', example: 'John Doe' },
      username: { type: 'string', example: 'johndoe123' },
      email: { type: 'string', example: 'john.doe@gmail.com' },
      password: { type: 'string', example: 'John12345' },
      confirmPassword: { type: 'string', example: 'John12345' },
    },
  },
  AuthRegisterResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/User' },
    },
  },
  LoginRequest: {
    type: 'object',
    required: ['identifier', 'password'],
    properties: {
      identifier: { type: 'string', example: 'john.doe@gmail.com' },
      password: { type: 'string', example: 'John12345' },
    },
  },
  AuthLoginResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },
  AuthMeResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/User' },
    },
  },
  ActivationRequest: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'string',
        example:
          '324bb6cd3db4b4eaee501ec6914d85e53026511f3acf9628892d0b215e364ac66433b8cab4a1300b4572ed3f5f9ae912ec7cef5b1cd303edf85fd6e296a46f01',
      },
    },
  },
  AuthActivationResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/User' },
    },
  },
};

export default authDocsSchema;

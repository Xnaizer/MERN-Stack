const mediaDocsSchema = {
  CloudinaryResource: {
    type: 'object',
    properties: {
      public_id: { type: 'string', example: 'uploads/sample-file' },
      resource_type: { type: 'string', example: 'image' },
      format: { type: 'string', example: 'jpg' },
      bytes: { type: 'number', example: 123456 },
      width: { type: 'number', example: 1200 },
      height: { type: 'number', example: 800 },
      url: { type: 'string', example: 'http://res.cloudinary.com/demo/image/upload/sample.jpg' },
      secure_url: {
        type: 'string',
        example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      },
      created_at: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
    },
  },
  MediaUploadSingleResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/CloudinaryResource' },
    },
  },
  MediaUploadMultipleResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/CloudinaryResource' },
      },
    },
  },
  MediaRemoveRequest: {
    type: 'object',
    required: ['fileUrl'],
    properties: {
      fileUrl: {
        type: 'string',
        example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      },
    },
  },
  MediaRemoveResult: {
    type: 'object',
    properties: {
      result: { type: 'string', example: 'ok' },
    },
  },
  MediaRemoveResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/MediaRemoveResult' },
    },
  },
};

export default mediaDocsSchema;

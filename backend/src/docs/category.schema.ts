const categoryDocsSchema = {
  CategoryInput: {
    type: 'object',
    required: ['name', 'description', 'icon'],
    properties: {
      name: { type: 'string', example: 'Technology' },
      description: { type: 'string', example: 'Posts about technology and gadgets' },
      icon: { type: 'string', example: 'icon-tech' },
    },
  },
  Category: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a2' },
      name: { type: 'string', example: 'Technology' },
      description: { type: 'string', example: 'Posts about technology and gadgets' },
      icon: { type: 'string', example: 'icon-tech' },
      createdAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
      updatedAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
    },
  },
  Pagination: {
    type: 'object',
    properties: {
      totalData: { type: 'number', example: 10 },
      totalPages: { type: 'number', example: 1 },
      current: { type: 'number', example: 1 },
    },
  },
  CategoryResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/Category' },
    },
  },
  CategoryListResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Category' },
      },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  },
};

export default categoryDocsSchema;

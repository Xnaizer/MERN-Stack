const eventDocsSchema = {
  EventLocation: {
    type: 'object',
    properties: {
      region: { type: 'number', example: 32 },
      coordinates: {
        type: 'array',
        items: { type: 'number' },
        example: [106.816666, -6.2],
      },
    },
  },
  EventInput: {
    type: 'object',
    required: [
      'name',
      'startDate',
      'endDate',
      'description',
      'banner',
      'isFeatured',
      'isOnline',
      'category',
      'location',
    ],
    properties: {
      name: { type: 'string', example: 'Tech Conference 2024' },
      startDate: { type: 'string', example: '2024-11-01T09:00:00.000Z' },
      endDate: { type: 'string', example: '2024-11-02T17:00:00.000Z' },
      description: { type: 'string', example: 'Annual technology conference.' },
      banner: { type: 'string', example: 'https://cdn.example.com/banner.jpg' },
      isFeatured: { type: 'boolean', example: true },
      isOnline: { type: 'boolean', example: false },
      isPublish: { type: 'boolean', example: true },
      category: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a2' },
      slug: { type: 'string', example: 'tech-conference-2024' },
      location: { $ref: '#/components/schemas/EventLocation' },
    },
  },
  Event: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a2' },
      name: { type: 'string', example: 'Tech Conference 2024' },
      startDate: { type: 'string', example: '2024-11-01T09:00:00.000Z' },
      endDate: { type: 'string', example: '2024-11-02T17:00:00.000Z' },
      description: { type: 'string', example: 'Annual technology conference.' },
      banner: { type: 'string', example: 'https://cdn.example.com/banner.jpg' },
      isFeatured: { type: 'boolean', example: true },
      isOnline: { type: 'boolean', example: false },
      isPublish: { type: 'boolean', example: true },
      category: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a2' },
      slug: { type: 'string', example: 'tech-conference-2024' },
      createdBy: { type: 'string', example: '6719d2b3a0b5f4a1ef43b8a3' },
      createdAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
      updatedAt: { type: 'string', example: '2024-10-24T07:45:00.000Z' },
      location: { $ref: '#/components/schemas/EventLocation' },
    },
  },
  EventResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: { $ref: '#/components/schemas/Event' },
    },
  },
  EventListResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Event' },
      },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  },
};

export default eventDocsSchema;

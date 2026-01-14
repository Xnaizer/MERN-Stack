const regionDocsSchema = {
  RegionProvince: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 31 },
      name: { type: 'string', example: 'DKI Jakarta' },
    },
  },
  RegionRegency: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 3171 },
      name: { type: 'string', example: 'Kota Jakarta Selatan' },
    },
  },
  RegionDistrict: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 317101 },
      name: { type: 'string', example: 'Kebayoran Baru' },
    },
  },
  RegionVillage: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 3171011001 },
      name: { type: 'string', example: 'Gandaria Utara' },
    },
  },
  ProvinceDetail: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 31 },
      name: { type: 'string', example: 'DKI Jakarta' },
      regencies: {
        type: 'array',
        items: { $ref: '#/components/schemas/RegionRegency' },
      },
    },
  },
  RegencyDetail: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 3171 },
      name: { type: 'string', example: 'Kota Jakarta Selatan' },
      province: { $ref: '#/components/schemas/RegionProvince' },
      districts: {
        type: 'array',
        items: { $ref: '#/components/schemas/RegionDistrict' },
      },
    },
  },
  DistrictDetail: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 317101 },
      name: { type: 'string', example: 'Kebayoran Baru' },
      province: { $ref: '#/components/schemas/RegionProvince' },
      regency: { $ref: '#/components/schemas/RegionRegency' },
      villages: {
        type: 'array',
        items: { $ref: '#/components/schemas/RegionVillage' },
      },
    },
  },
  VillageDetail: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 3171011001 },
      name: { type: 'string', example: 'Gandaria Utara' },
      province: { $ref: '#/components/schemas/RegionProvince' },
      regency: { $ref: '#/components/schemas/RegionRegency' },
      district: { $ref: '#/components/schemas/RegionDistrict' },
    },
  },
  CitySearchResult: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 3273 },
      name: { type: 'string', example: 'Kota Bandung' },
      province: { $ref: '#/components/schemas/RegionProvince' },
    },
  },
  RegionProvincesResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/RegionProvince' },
      },
    },
  },
  RegionProvinceResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/ProvinceDetail' },
      },
    },
  },
  RegionRegencyResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/RegencyDetail' },
      },
    },
  },
  RegionDistrictResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/DistrictDetail' },
      },
    },
  },
  RegionVillageResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/VillageDetail' },
      },
    },
  },
  RegionCitySearchResponse: {
    type: 'object',
    properties: {
      meta: { $ref: '#/components/schemas/ApiMeta' },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/CitySearchResult' },
      },
    },
  },
};

export default regionDocsSchema;

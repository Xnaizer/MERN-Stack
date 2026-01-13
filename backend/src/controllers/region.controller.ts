import { type Response, type Request } from 'express';
import response from '../utils/response';
import RegionModel from '../models/region.model';

export default {
  async findByCity(res: Response, req: Request) {
    try {
        const { name } = req.query;
        const result = await RegionModel.findByCity(`${name}`);

        if(!result) {
            return response.notFound(res, 'City not found!');
        }

        response.success(res, result, 'Success find a city')

    } catch (error) {
        response.error(res, error, "Failed finding a city" )
    }
  },

  async getAllProvinces(res: Response, req: Request) {
    try {
        const result = await RegionModel.getAllProvinces();

        if(!result) {
            return response.notFound(res,'Failed get all provinces')
        }

        response.success(res, result, 'Success to get all provinces')

    } catch (error) {
        response.error(res, error, 'Failed get all provinces')
    }
  },

  async getProvince(res: Response, req: Request) {
    try {
        const { id } = req.params;

        const result = await RegionModel.getProvince(Number(id));

        if(!result) {
            return response.notFound(res, 'Province not found');
        }

        response.success(res, result, 'Success get a province');

    } catch (error) {
        response.error(res, error, 'Failed get a province');
    }
  },

  async getRegency(res: Response, req: Request) {
    try {
        const { id } = req.params;

        const result = await RegionModel.getRegency(Number(id));

        if(result) {
            return response.notFound(res, 'Regency not found');
        }
    } catch (error) {
        response.error(res, error, 'Failed get a regency');
    }
  },

  async getDistrict(res: Response, req: Request) {
    try {
        const { id } = req.params;
        
        const result = await RegionModel.getDistrict(Number(id));

        if(!result)  {
            return response.notFound(res, 'District not found');
        }

        response.success(res, result, 'Success get a district');

    } catch (error) {
        response.error(res, error, 'Failed get a district');
    }
  },

  async getVillage(res: Response, req: Request) {
    try {
        const { id } = req.params;

        const result = await RegionModel.getVillage(Number(id));

        if(!result) {
            return response.notFound(res, 'Village not found')
        }

        response.success(res, result, 'Success get a village');
    } catch (error) {
        response.error(res, error, 'Failed get a village');
    }
  },
};

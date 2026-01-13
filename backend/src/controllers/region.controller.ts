import { type Response, type Request } from 'express';
import response from '../utils/response';
import RegionModel from '../models/region.model';

export default {
  async findByCity(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const result = await RegionModel.findByCity(`${name}`);

      if (!result || result.length === 0) {
        return response.notFound(res, 'City not found!');
      }

      return response.success(res, result, 'Success find a city');
    } catch (error) {
      return response.error(res, error, 'Failed finding a city');
    }
  },

  async getAllProvinces(req: Request, res: Response) {
    try {
      const result = await RegionModel.getAllProvinces();

      if (!result || result.length === 0) {
        return response.notFound(res, 'Failed get all provinces');
      }

      return response.success(res, result, 'Success to get all provinces');
    } catch (error) {
      return response.error(res, error, 'Failed get all provinces');
    }
  },

  async getProvince(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await RegionModel.getProvince(Number(id));

      if (!result || result.length === 0) {
        return response.notFound(res, 'Province not found');
      }

      return response.success(res, result, 'Success get a province');
    } catch (error) {
      return response.error(res, error, 'Failed get a province');
    }
  },

  async getRegency(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await RegionModel.getRegency(Number(id));

      if (!result || result.length === 0) {
        return response.notFound(res, 'Regency not found');
      }

      return response.success(res, result, 'Success get a regency');
    } catch (error) {
      return response.error(res, error, 'Failed get a regency');
    }
  },

  async getDistrict(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await RegionModel.getDistrict(Number(id));

      if (!result || result.length === 0) {
        return response.notFound(res, 'District not found');
      }

      return response.success(res, result, 'Success get a district');
    } catch (error) {
      return response.error(res, error, 'Failed get a district');
    }
  },

  async getVillage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await RegionModel.getVillage(Number(id));

      if (!result || result.length === 0) {
        return response.notFound(res, 'Village not found');
      }

      return response.success(res, result, 'Success get a village');
    } catch (error) {
      return response.error(res, error, 'Failed get a village');
    }
  },
};
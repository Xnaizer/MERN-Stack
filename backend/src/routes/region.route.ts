import express from 'express';
import regionController from '../controllers/region.controller';

const regionRouter = express.Router();

regionRouter.get('/regions', regionController.getAllProvinces);
regionRouter.get('/regions/:id/province', regionController.getProvince);
regionRouter.get('/regions/:id/regency', regionController.getRegency);
regionRouter.get('/regions/:id/district', regionController.getDistrict);
regionRouter.get('/regions/:id/village', regionController.getVillage);
regionRouter.get('/regions-search', regionController.findByCity);

export default regionRouter;
import express from 'express';
import regionController from '../controllers/region.controller';

const regionRoute = express.Router();

regionRoute.get('/regions', regionController.getAllProvinces);
regionRoute.get('/regions/:id/province', regionController.getProvince);
regionRoute.get('/regions/:id/regency', regionController.getRegency);
regionRoute.get('/regions/:id/district', regionController.getDistrict);
regionRoute.get('/regions/:id/village', regionController.getVillage);
regionRoute.get('/regions-search', regionController.findByCity);

export default regionRoute;
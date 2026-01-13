import express from 'express';

const regionRoute = express.Router();

regionRoute.get('/regions');
regionRoute.get('/regions/:id/province');
regionRoute.get('/regions/:id/regency');
regionRoute.get('/regions/:id/district');
regionRoute.get('/regions/:id/village');
regionRoute.get('/regions-search');

export default regionRoute;
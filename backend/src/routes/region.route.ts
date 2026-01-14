import express from 'express';
import regionController from '../controllers/region.controller';

const regionRouter = express.Router();

regionRouter.get('/regions', regionController.getAllProvinces);
/**
 * @openapi
 * /regions:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get all provinces
 *     security: []
 *     responses:
 *       200:
 *         description: Provinces retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionProvincesResponse'
 *       404:
 *         description: Provinces not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
regionRouter.get('/regions/:id/province', regionController.getProvince);
/**
 * @openapi
 * /regions/{id}/province:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get province by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Province retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionProvinceResponse'
 *       404:
 *         description: Province not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
regionRouter.get('/regions/:id/regency', regionController.getRegency);
/**
 * @openapi
 * /regions/{id}/regency:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get regency by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Regency retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionRegencyResponse'
 *       404:
 *         description: Regency not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
regionRouter.get('/regions/:id/district', regionController.getDistrict);
/**
 * @openapi
 * /regions/{id}/district:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get district by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: District retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionDistrictResponse'
 *       404:
 *         description: District not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
regionRouter.get('/regions/:id/village', regionController.getVillage);
/**
 * @openapi
 * /regions/{id}/village:
 *   get:
 *     tags:
 *       - Region
 *     summary: Get village by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Village retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionVillageResponse'
 *       404:
 *         description: Village not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
regionRouter.get('/regions-search', regionController.findByCity);
/**
 * @openapi
 * /regions-search:
 *   get:
 *     tags:
 *       - Region
 *     summary: Search regencies by name
 *     security: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Regency name keyword
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegionCitySearchResponse'
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */

export default regionRouter;

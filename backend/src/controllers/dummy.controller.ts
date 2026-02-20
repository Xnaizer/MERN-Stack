import type { Request, Response } from 'express';
import response from '../utils/response';
import ImageModel from '../models/image.model';

export default {
  dummy(req: Request, res: Response) {
    response.success(res, 'OK!', 'Success hit dummy API!');
  },
  async getImages(req: Request, res: Response){
    const thirtyMinutesAgo = new Date(Date.now() - 30 *  60 * 1000);

    try {
      const data = await ImageModel.find({ status : "temporary", createdAt: {
        $lt: thirtyMinutesAgo
      }});

      return res.status(200).json({
        status: 'Success get data',
        count: data.length,
        data: data
      });
    } catch (error) {
      return res.status(500).json({
        message: `terjadi error ${error}`,
        data: null
      });
    }
  }
};

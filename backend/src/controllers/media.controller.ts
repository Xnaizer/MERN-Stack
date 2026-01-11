import { Response } from 'express';
import { IReqUser } from '../utils/interfaces';
import uploader from '../utils/uploader';

export default {
  async single(req: IReqUser, res: Response) {
    if (!req.file) {
      return res.status(400).json({
        status: 'failed',
        message: 'File is not exist',
        data: null,
      });
    }

    try {
      const result = await uploader.uploadSingle(req.file as Express.Multer.File);

      res.status(200).json({
        status: 'success',
        message: 'success upload a file',
        data: result,
      });
    } catch {
      res.status(500).json({
        status: 'failed',
        message: 'failed upload a file',
        data: null,
      });
    }
  },

  async multiple(req: IReqUser, res: Response) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'failed',
        message: 'files are not exist',
        data: null,
      });
    }

    try {
      const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);

      res.status(200).json({
        status: 'success',
        message: 'success upload files',
        data: result,
      });
    } catch {
      res.status(500).json({
        status: 'failed',
        message: 'failed upload files',
        data: null,
      });
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { fileUrl } = req.body as { fileUrl: string };

      const result = await uploader.removeMedia(fileUrl);

      res.status(200).json({
        status: 'success',
        message: 'success remove file',
        data: result,
      });
    } catch {
      res.status(500).json({
        status: 'failed',
        message: 'failed remove file',
        data: null,
      });
    }
  },
};

import { Response } from 'express';
import { IReqUser } from '../utils/interfaces';
import uploader from '../utils/uploader';
import response from '../utils/response';
import ImageModel from '../models/image.model';

export default {
  async single(req: IReqUser, res: Response) {
    if (!req.file) {
      return response.error(res, null, 'File is not exist');
    }

    let uploaded;

    try {
      uploaded = await uploader.uploadSingleImage(req.file as Express.Multer.File);

      const image = await ImageModel.create({
        url: uploaded.secure_url,
        publicImgId: uploaded.public_id,
        createdBy: req.user?.id
      });

      return response.success(res, image, 'Success upload a file');
    } catch (error) {
      if(uploaded?.secure_url) {
        await uploader.removeMedia(uploaded.secure_url)
      }

      return response.error(res, error, 'Failed upload a file');
    }
  },

  async multiple(req: IReqUser, res: Response) {
    if (!req.files || req.files.length === 0) {
      return response.error(res, null, 'Files are not exist');
    }

    try {
      const result = await uploader.uploadMultipleImage(req.files as Express.Multer.File[]);

      response.success(res, result, 'Success upload files');
    } catch {
      response.error(res, null, 'Failed upload file');
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { fileUrl, iconId } = req.body as { fileUrl: string, iconId: string };

      if (!fileUrl || !iconId) {
        return response.error(res, null, 'File URL is required');
      }

      const result = await uploader.removeMedia(fileUrl);
      const deleteResult = await ImageModel.findByIdAndDelete(iconId);

      if (result?.result === 'not found') {
        return response.notFound(res, 'File not found');
      }

      const data = [result, deleteResult];

      response.success(res, data, 'Success remove file');
    } catch {
      response.error(res, null, 'Failed remove file');
    }
  },
};

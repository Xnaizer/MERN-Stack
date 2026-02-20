import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from './env';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const toDataURL = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURL = `data:${file.mimetype};base64,${b64}`;
  return dataURL;
};

const getPublicIdFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubstring = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
  const publicId = fileNameUsingSubstring.substring(0, fileNameUsingSubstring.lastIndexOf('.'));

  return publicId;
};

export default {
  async uploadSingleImage(file: Express.Multer.File) {
    const fileDataURL = toDataURL(file);

    return await cloudinary.uploader.upload(fileDataURL, {
      resource_type: 'image',
      folder: "mern_app_images",
      allowed_formats: ["jpg", "jpeg", "png", "webp"]
    });
  },

  async uploadMultipleImage(files: Express.Multer.File[]) {
    return await Promise.all(files.map(f => this.uploadSingleImage(f)))
  },

  async removeMedia(fileUrl: string) {
    const publicId = getPublicIdFromFileUrl(fileUrl);
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  },
};

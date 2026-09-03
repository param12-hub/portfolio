import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import { APIError } from '../middlewares/errorHandler';

export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new APIError('No file provided', 400);
    }

    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio_cms',
        transformation: [{ quality: 'auto', fetch_format: 'webp' }],
      });
      return res.json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
        },
      });
    }

    // Mock fallback URL if Cloudinary is not configured
    const mockUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80`;
    res.json({
      success: true,
      data: {
        url: mockUrl,
        publicId: 'mock_upload_id',
        format: 'webp',
        bytes: req.file.size,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { publicId } = req.body;
    if (publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    next(error);
  }
};

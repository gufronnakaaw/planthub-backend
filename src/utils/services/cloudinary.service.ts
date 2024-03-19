import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  async upload_stream({
    folder,
    buffer,
  }: {
    folder: string;
    buffer: Buffer;
  }): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
  }

  delete_resource(public_id: string) {
    return cloudinary.uploader.destroy(public_id);
  }
}

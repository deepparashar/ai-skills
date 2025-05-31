import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes', // Cloudinary folder name
    resource_type: 'raw', // because PDFs are not images
    format: async (req, file) => 'pdf',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const resumeUpload = multer({ storage });

export default resumeUpload;

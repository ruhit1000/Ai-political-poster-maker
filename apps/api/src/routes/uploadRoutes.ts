import express from 'express';
import { upload } from '../config/cloudinary';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  
  res.status(200).json({
    url: req.file.path,
    message: 'Image uploaded successfully'
  });
});

export default router;

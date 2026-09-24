import express from 'express';
import Template from '../models/Template';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const templates = await Template.find({ isActive: true });
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }
    res.json(template);
  } catch (error) {
    next(error);
  }
});

export default router;

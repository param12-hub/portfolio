import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { Experience } from '../models/Experience';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Service } from '../models/Service';
import { Blog } from '../models/Blog';
import { Gallery } from '../models/Gallery';
import { Certificate } from '../models/Certificate';
import { Testimonial } from '../models/Testimonial';
import { Hero } from '../models/Hero';
import { About } from '../models/About';
import { Setting } from '../models/Setting';
import { APIError } from '../middlewares/errorHandler';

const getModel = (type: string): any => {
  switch (type.toLowerCase()) {
    case 'projects': return Project;
    case 'experiences': return Experience;
    case 'skills': return Skill;
    case 'education': return Education;
    case 'services': return Service;
    case 'blogs': return Blog;
    case 'gallery': return Gallery;
    case 'certificates': return Certificate;
    case 'testimonials': return Testimonial;
    case 'hero': return Hero;
    case 'about': return About;
    case 'settings': return Setting;
    default: return null;
  }
};

export const getAllContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    const Model = getModel(type);
    if (!Model) throw new APIError(`Invalid content type: ${type}`, 400);

    const items = await Model.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const getContentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, id } = req.params;
    const Model = getModel(type);
    if (!Model) throw new APIError(`Invalid content type: ${type}`, 400);

    const item = await Model.findById(id);
    if (!item) throw new APIError('Resource not found', 404);

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    const Model = getModel(type);
    if (!Model) throw new APIError(`Invalid content type: ${type}`, 400);

    const newItem = await Model.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, id } = req.params;
    const Model = getModel(type);
    if (!Model) throw new APIError(`Invalid content type: ${type}`, 400);

    const updatedItem = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedItem) throw new APIError('Resource not found', 404);

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, id } = req.params;
    const Model = getModel(type);
    if (!Model) throw new APIError(`Invalid content type: ${type}`, 400);

    const deletedItem = await Model.findByIdAndDelete(id);
    if (!deletedItem) throw new APIError('Resource not found', 404);

    res.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    next(error);
  }
};

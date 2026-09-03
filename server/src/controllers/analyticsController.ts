import { Request, Response, NextFunction } from 'express';
import { Analytics } from '../models/Analytics';
import { Project } from '../models/Project';
import { Blog } from '../models/Blog';
import { Message } from '../models/Message';

export const trackPageView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ success: false, message: 'Path required' });

    const today = new Date().toISOString().split('T')[0];
    await Analytics.findOneAndUpdate(
      { path, date: today },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'View tracked' });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ read: false });

    // Aggregate pageviews over the last 30 days
    const pageviews = await Analytics.aggregate([
      {
        $group: {
          _id: '$date',
          totalViews: { $sum: '$views' },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    const topPages = await Analytics.aggregate([
      {
        $group: {
          _id: '$path',
          totalViews: { $sum: '$views' },
        },
      },
      { $sort: { totalViews: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        totalBlogs,
        totalMessages,
        unreadMessages,
        pageviewsChart: pageviews.map(p => ({ date: p._id, views: p.totalViews })),
        topPages: topPages.map(p => ({ path: p._id, views: p.totalViews })),
      },
    });
  } catch (error) {
    next(error);
  }
};

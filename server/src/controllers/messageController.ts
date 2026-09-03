import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message';
import { sendContactEmail } from '../services/mailService';
import { APIError } from '../middlewares/errorHandler';

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      throw new APIError('Name, email, and message are required', 400);
    }

    const ip = req.ip || req.socket.remoteAddress || '';
    const newMessage = await Message.create({ name, email, subject, message, ip });

    // Send email notification in background
    sendContactEmail({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { read, replied } = req.body;
    const updated = await Message.findByIdAndUpdate(id, { read, replied }, { new: true });
    if (!updated) throw new APIError('Message not found', 404);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

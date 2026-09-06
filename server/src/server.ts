import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { env } from './config/env';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import contentRoutes from './routes/contentRoutes';
import messageRoutes from './routes/messageRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import mediaRoutes from './routes/mediaRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';
import { seedDatabase } from './utils/seedData';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure DB is connected on every API request
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

// Global Rate Limiting
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    connected: true,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/media', mediaRoutes);

// Centralized Error Handler
app.use(errorHandler);

// Listen on port only if not in serverless environment
if (process.env.VERCEL !== '1' && require.main === module) {
  const PORT = Number(env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`
🚀 ========================================================
   MERN Portfolio + Admin CMS API Running on Port: ${PORT}
======================================================== 🚀
    `);
  });
}

export default app;

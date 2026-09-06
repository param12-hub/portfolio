import dotenv from 'dotenv';
import path from 'path';

// Load .env explicitly from server root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const ATLAS_URI = 'mongodb+srv://paramesh_admin:MUiErUeXFQQjBAvQ@portfolio.glod0vz.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio';

export const env = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || ATLAS_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'ParameshRajuri_SuperSecret_JWT_Key_998877665544332211',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'ParameshRajuri_RefreshSecret_TokenKey_112233445566778899',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'parameshrajuri@gmail.com',
};

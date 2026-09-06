import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore
}

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const mongoUri = env.MONGO_URI || process.env.MONGO_URI || '';
    if (!mongoUri) {
      console.warn('[MongoDB Warning]: MONGO_URI is missing');
      return;
    }
    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: ${error instanceof Error ? error.message : error}.`);
  }
};

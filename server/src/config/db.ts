import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

// Set public DNS servers for Windows SRV lookup resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore if custom DNS fails
}

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning]: ${error instanceof Error ? error.message : error}. Running with memory fallback or offline mode.`);
  }
};

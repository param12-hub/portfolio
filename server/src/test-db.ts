import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'dns';

// Set Node.js DNS servers to Google / Cloudflare public DNS to resolve SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  console.log('[DNS]: Using Google / Cloudflare public DNS resolution...');
} catch (e) {
  // Ignore if custom DNS setting fails
}

const mongoUri = process.env.MONGO_URI || '';

if (!mongoUri) {
  console.error('\n❌ ERROR: MONGO_URI is missing in process.env or .env file!');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('\n🔄 Attempting to connect to MongoDB Atlas...');
    console.log(`URI: ${mongoUri.replace(/:([^@]+)@/, ':****@')}`);

    const start = Date.now();
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    const latency = Date.now() - start;

    console.log(`\n✅ SUCCESS! Connected to MongoDB Atlas in ${latency}ms`);
    console.log(`Database Name: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Ready State: ${mongoose.connection.readyState} (Connected)\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ MongoDB Connection Failed:');
    console.error(error.message);
    console.log('\n💡 Troubleshooting Steps:');
    console.log(' 1. Go to MongoDB Atlas (https://cloud.mongodb.com) -> Network Access.');
    console.log(' 2. Click "Add IP Address" and choose "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0).');
    console.log(' 3. Confirm your Cluster URL: portfolio.glod0vz.mongodb.net\n');
    process.exit(1);
  }
}

testConnection();

import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore
}

const mongoUri = process.env.MONGO_URI || '';

async function testConnection() {
  try {
    console.log('\n🔄 Testing MongoDB Atlas connection & User Collection...');
    console.log(`URI: ${mongoUri.replace(/:([^@]+)@/, ':****@')}`);

    const start = Date.now();
    await mongoose.connect(mongoUri);
    const latency = Date.now() - start;

    console.log(`\n✅ SUCCESS! Connected to MongoDB Atlas in ${latency}ms`);
    console.log(`Database Name: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database instance is undefined');
    }

    const collections = await db.listCollections().toArray();
    console.log('\n📁 Existing Collections in Atlas:');
    collections.forEach(c => console.log(`  - ${c.name}`));

    const usersCount = await db.collection('users').countDocuments();
    const projectsCount = await db.collection('projects').countDocuments();
    console.log(`\n📊 Document Counts:`);
    console.log(`  - Users: ${usersCount}`);
    console.log(`  - Projects: ${projectsCount}`);

    const adminUser = await db.collection('users').findOne({ email: 'admin@portfolio.dev' });
    if (adminUser) {
      console.log(`\n✅ Admin User Found: admin@portfolio.dev (Role: ${adminUser.role})`);
    } else {
      console.log(`\n⚠️ WARNING: Admin user admin@portfolio.dev NOT found in Atlas! Need to run seed script.`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ MongoDB Connection Failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();

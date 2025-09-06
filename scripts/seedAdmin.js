import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../src/config/db.js';
import User from '../src/models/User.js';

dotenv.config();

await connectDB();
const email = process.env.SEED_ADMIN_EMAIL || 'admin@alfarabi.local';
const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
const name = process.env.SEED_ADMIN_NAME || 'Super Admin';

try {
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
  } else {
    await User.create({ name, email, password, role: 'admin', status: 'active' });
    console.log('Admin created:', email, 'password:', password);
  }
} catch (e) {
  console.error(e);
} finally {
  mongoose.connection.close();
}

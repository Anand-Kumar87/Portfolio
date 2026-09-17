import mongoose from 'mongoose';
import dns from 'dns';

// Fix querySrv ECONNREFUSED issue on Windows with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const DEFAULT_MONGODB_URI = 'mongodb+srv://portfolio-app:Portfolio0001@cluster0.zojne2e.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { 
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

import mongoose from 'mongoose';
import dns from 'node:dns';

// Vercel Serverless DNS error (querySrv ENOTFOUND) দূর করার জন্য IPv4 ফার্স্ট সেটআপ
if (typeof window === 'undefined') {
  dns.setDefaultResultOrder('ipv4first');
}

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

export const dbConnect = async () => {
  try {
    // যদি অলরেডি কানেক্টেড থাকে
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // এটি টাইম-আউট এরর কমাতে সাহায্য করবে
      dbName: 'Madsaha-Database',
      family: 4, // IPv4 Force করবে যাতে ENOTFOUND error না আসে
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌", error);
    // এরর আসলে প্রসেস থামিয়ে দাও যেন বুঝা যায় কী সমস্যা
    throw error; 
  }
};
// kdjksllfffffffffffffffffffff
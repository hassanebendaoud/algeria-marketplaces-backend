import { connect } from 'mongoose';

import { mongoConfig } from '@config/index';

const connectDB = async () => {
  try {
    const connectionString = mongoConfig.uri;
    console.log(`Connection String: ${connectionString}`);

    if (!connectionString) {
      throw new Error("MongoDB connection string is required");
    }

    await connect(connectionString, {});

    console.log(`Connected to MongoDB: ${connectionString}`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

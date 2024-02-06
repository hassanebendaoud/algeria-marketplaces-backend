import { connect } from 'mongoose';

import { mongoConfig } from '@config/index';

const connectDB = async () => {
    try {
        const connectionString = mongoConfig.uri;
        console.log(`Connection String: ${connectionString}`);

        if (!connectionString) {
            throw new Error('MongoDB connection string is required');
        }

        await connect(connectionString, {});

        console.log(`Connected to MongoDB: ${connectionString}`);
    } catch (err: unknown) {
        if (typeof err === 'string') {
            console.error(err);
            process.exit(1);
        } else if (err instanceof Error) {
            console.error(err.message);
            process.exit(1);
        } else {
            console.error('An error occurred');
            process.exit(1);
        }
    }
};

export default connectDB;

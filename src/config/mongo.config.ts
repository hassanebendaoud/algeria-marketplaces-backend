import dotenv from 'dotenv';

dotenv.config({ path: 'env/db.env' });

const mongoConfig = {
    uri: process.env.MONGODB_URI,
};

export default mongoConfig;

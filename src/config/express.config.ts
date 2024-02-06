import dotenv from 'dotenv';

dotenv.config({ path: 'env/express.env' });

const expressConfig = {
    port: process.env.EXPRESS_PORT,
};

export default expressConfig;

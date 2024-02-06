import dotenv from 'dotenv';

dotenv.config({ path: 'env/jwt.env' });

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};

export default jwtConfig;
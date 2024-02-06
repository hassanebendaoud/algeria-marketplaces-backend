import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import passport from 'passport';

import { expressConfig } from '@config/index';
import conn from '@db/mongo/conn';
import Passport from '@db/passport';
import authRouter from '@routes/auth/index';
import marketplacesRouter from '@routes/marketplaces';
import productsRouter from '@routes/products';
import usersRouter from '@routes/users';
import utils from '@utils/index';

const app = express();
const storage = multer.memoryStorage(); // multer memory storage
const upload = multer({
    storage,
});

conn();
utils.generateKeyPair();
utils.checkKeyPairExist();

const port = expressConfig.port;
if (!port) {
    throw new Error('Express Port is required');
}

console.log(`Express Port: ${port}`);

Passport(passport);
app.use(passport.initialize());

app.use(helmet()); // helmet middleware

app.use(compression()); // compression middleware

app.use(morgan('dev')); // morgan middleware

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Allows our Angular application to make HTTP requests to Express application
app.use(cors()); // cors middleware

// Allows our Express application to parse the incoming requests with JSON payloads
app.use(upload.any()); // multer middleware

app.get('/', (req: Request, res: Response) => {
    res.send('Hellow People!');
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/marketplaces', marketplacesRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

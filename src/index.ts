import cors from 'cors';
import express, { Request, Response } from 'express';
import multer from 'multer';
import passport from 'passport';

import { expressConfig } from './config/express.config';
import conn from './db/mongo/conn';
import Passport from './db/passport';
import authRouter from './routes/auth';
import marketplacesRouter from './routes/marketplaces';
import utils from './utils';

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
  throw new Error("Express Port is required");
}

console.log(`Express Port: ${port}`);

Passport(passport);
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Allows our Angular application to make HTTP requests to Express application
app.use(cors()); // cors middleware

// Allows our Express application to parse the incoming requests with JSON payloads
app.use(upload.any()); // multer middleware

app.get("/", (req: Request, res: Response) => {
  res.send("Hellow People!");
});

app.use("/auth", authRouter);
app.use("/marketplaces", marketplacesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

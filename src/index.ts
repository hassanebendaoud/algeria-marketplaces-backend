import express, { Request, Response } from "express";
import cors from "cors";
import conn from "./db/mongo/conn";
import { expressConfig } from "./config/express.config";

import marketplacesRouter from "./routes/marketplaces";

const app = express();

conn();

const port = expressConfig.port;
if (!port) {
  throw new Error("Express Port is required");
}

console.log(`Express Port: ${port}`);

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hellow People!");
});

app.use("/marketplaces", marketplacesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

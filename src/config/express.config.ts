import dotenv from "dotenv";

dotenv.config({ path: "express.env" });

export const expressConfig = {
  port: process.env.EXPRESS_PORT,
};

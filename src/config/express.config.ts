import dotenv from "dotenv";

dotenv.config({ path: "env/express.env" });

export const expressConfig = {
  port: process.env.EXPRESS_PORT,
};

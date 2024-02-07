import dotenv from "dotenv";

dotenv.config({ path: "env/db.env" });

export const mongoConfig = {
  uri: process.env.MONGODB_URI,
};

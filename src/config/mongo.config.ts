import dotenv from "dotenv";

dotenv.config({ path: "db.env" });

export const mongoConfig = {
  uri: process.env.MONGODB_URI,
};

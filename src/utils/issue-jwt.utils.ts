import jwt from "jsonwebtoken";
import fs from "fs";
import mongoose from "mongoose";
import { keysConfig } from "../config/keys.config";

const issueJWT = (user: { _id: mongoose.Types.ObjectId }) => {
  const pathToPrivateKey = keysConfig.privateKeyPath;
  const PRIV_KEY = fs.readFileSync(pathToPrivateKey, "utf-8");

  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

export default issueJWT;

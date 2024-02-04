import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = typeof req.headers.jwt === "string" ? req.headers.jwt : undefined;

    if (!jwtConfig.secret) {
      throw new Error("JWT secret is not defined");
    }

    if (token && token != undefined) {
      try {
        const decoded = jwt.verify(token, jwtConfig.secret);
      } catch (error) {}
    }
  }
);

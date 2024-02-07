import { NextFunction, Request, Response } from "express";
import passport from "passport";

const protectMiddleware = passport.authenticate("jwt", { session: false });

export default protectMiddleware;

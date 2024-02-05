import { NextFunction, Request, Response } from "express";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: `You accessed the protect route!`,
  });
};

export default protect;

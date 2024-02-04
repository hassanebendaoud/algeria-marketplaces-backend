import { Request, Response } from "express";

export const userLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
};

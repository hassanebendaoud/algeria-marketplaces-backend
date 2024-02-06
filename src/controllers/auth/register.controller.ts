import { NextFunction, Request, Response } from 'express';

import { UserModel } from '@/models';
import utils from '@/utils';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, username, email, password } = req.body;

  console.log(req.body);

  const saltHash = utils.generatePassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new UserModel({
    ...req.body,
    hash,
    salt,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    res.json({ success: false, message: error.message });
  }
};

export default register;

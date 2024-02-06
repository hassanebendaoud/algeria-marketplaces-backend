import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/auth/User.interface';

export interface FileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;

  User: UserInterface | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

import { Schema } from 'mongoose';

import { UserInterface } from './User.interface';

export interface FileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;

  User: UserInterface | Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

import { Schema } from 'mongoose';

import { UserInterface } from './User.interface';

export interface ReviewInterface {
  id: string;

  start: number;
  content: string;

  User: UserInterface | Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

import { Schema } from 'mongoose';

import { UserInterface } from './User.interface';

export interface CommentInterface {
  id: string;

  title: string;
  content: string;

  User: UserInterface | Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

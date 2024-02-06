import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/auth/User.interface';

export interface CommentInterface {
  id: string;

  title: string;
  content: string;

  User: UserInterface | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

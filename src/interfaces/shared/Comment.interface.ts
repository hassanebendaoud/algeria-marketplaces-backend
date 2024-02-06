import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/users/User.interface';

export interface CommentInterface {
  id: string;

  title: string;
  content: string;

  User: UserInterface | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

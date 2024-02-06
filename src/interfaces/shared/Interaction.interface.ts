import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/auth/User.interface';

export interface InteractionInterface {
  User: UserInterface | ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

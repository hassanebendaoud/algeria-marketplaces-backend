import { Schema } from 'mongoose';

import { UserInterface } from './User.interface';

export interface InteractionInterface {
  User: UserInterface | Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

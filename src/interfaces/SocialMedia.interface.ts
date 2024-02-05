import { Schema } from 'mongoose';

import { UserInterface } from './User.interface';

export interface URLSocialMediaInterface {
  id: string;
  name: string;
  website: string;
  username: string;
}

export interface SocialMediaInterface {
  name: string;
  URLs: URLSocialMediaInterface[];

  User: UserInterface | Schema.Types.ObjectId | string;

  createdAt: Date;
  updatedAt: Date;
}

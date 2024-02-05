export interface UserInterface {
  _id: string;

  username: string;
  email: string;
  password: string;

  hash: string;
  salt: string;

  createdAt: Date;
  updatedAt: Date;
}

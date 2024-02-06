import { ObjectId } from 'bson';

import { UserModel } from '@/models';

const findByIdQuery = async ({
  _id,
  populate = [],
  salt = [],
}: {
  _id: ObjectId;
  populate?: any[];
  salt?: string[];
}) => {
  const data = await UserModel.findById(_id).select(salt).populate(populate);
  return data;
};

export default findByIdQuery;

import { ObjectId } from 'bson';

import { UserModel } from '@/models';

const findByIdAndUpdateQuery = async ({
  _id,
  data,
  options,
}: {
  _id: ObjectId;
  data: any;
  options?: any;
}) => {
  const recordUpdated = await UserModel.findByIdAndUpdate(_id, data, options);
  return recordUpdated;
};

export default findByIdAndUpdateQuery;

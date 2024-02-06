import { UserModel } from '@/models';

const findOneAndUpdateQuery = async ({
  filter,
  data,
  options,
}: {
  filter: any;
  data: any;
  options?: any;
}) => {
  const recordUpdated = await UserModel.findOneAndUpdate(filter, data, options);
  return recordUpdated;
};

export default findOneAndUpdateQuery;

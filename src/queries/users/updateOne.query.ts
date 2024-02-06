import { UserModel } from '@/models';

const updateOneQuery = async ({
  filter,
  data,
  options,
}: {
  filter: any;
  data: any;
  options?: any;
}) => {
  const recordUpdated = await UserModel.updateOne(filter, data, options);
  return recordUpdated;
};

export default updateOneQuery;

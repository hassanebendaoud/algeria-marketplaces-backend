import { UserModel } from '@/models';

const deleteOneQuery = async ({
  filter,
  options,
}: {
  filter: any;
  options?: any;
}) => {
  const recordDeleted = await UserModel.deleteOne(filter, options);
  return recordDeleted;
};

export default deleteOneQuery;

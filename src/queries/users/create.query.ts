import { UserModel } from '@/models';

const createQuery = async ({ data }: { data: any }) => {
  const recordCreated = await UserModel.create(data);
  return recordCreated;
};

export default createQuery;

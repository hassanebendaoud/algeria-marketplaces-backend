import { UserModel } from '@/models';

const findOneQuery = async ({
  filter,
  populate = [],
  salt = [],
}: {
  filter: any;
  populate?: any[];
  salt?: string[];
}) => {
  const data = await UserModel.findOne(filter).select(salt).populate(populate);
  return data;
};

export default findOneQuery;

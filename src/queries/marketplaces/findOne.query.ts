import { MarketplaceModel } from '@/models';

const findOneQuery = async ({
  filter,
  populate = [],
  salt = [],
}: {
  filter: any;
  populate?: any[];
  salt?: string[];
}) => {
  const data = await MarketplaceModel.findOne(filter)
    .select(salt)
    .populate(populate);
  return data;
};

export default findOneQuery;

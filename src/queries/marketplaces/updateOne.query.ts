import { MarketplaceModel } from '@/models';

const updateOneQuery = async ({
  filter,
  data,
  options,
}: {
  filter: any;
  data: any;
  options?: any;
}) => {
  const recordUpdated = await MarketplaceModel.updateOne(filter, data, options);
  return recordUpdated;
};

export default updateOneQuery;

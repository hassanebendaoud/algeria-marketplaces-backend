import { MarketplaceModel } from '@/models';

const findOneAndUpdateQuery = async ({
  filter,
  data,
}: {
  filter: any;
  data: any;
}) => {
  const recordUpdated = await MarketplaceModel.findOneAndUpdate(filter, data);
  return recordUpdated;
};

export default findOneAndUpdateQuery;

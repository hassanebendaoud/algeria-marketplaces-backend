import { MarketplaceModel } from '@/models';

const deleteOneQuery = async ({
  filter,
  options,
}: {
  filter: any;
  options?: any;
}) => {
  const recordDeleted = await MarketplaceModel.deleteOne(filter, options);
  return recordDeleted;
};

export default deleteOneQuery;

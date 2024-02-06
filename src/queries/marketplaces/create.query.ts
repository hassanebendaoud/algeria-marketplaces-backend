import { MarketplaceModel } from '@/models';

const createQuery = async ({ data }: { data: any }) => {
  const recordCreated = await MarketplaceModel.create(data);
  return recordCreated;
};

export default createQuery;

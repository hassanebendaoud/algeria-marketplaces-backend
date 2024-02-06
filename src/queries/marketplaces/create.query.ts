import { MarketplaceModel } from '@/models';
import { createMarketplacesQueryType } from '@/types/marketplaces';

const createQuery = async ({ data }: createMarketplacesQueryType) => {
    const recordCreated = await MarketplaceModel.create(data);
    return recordCreated;
};

export default createQuery;

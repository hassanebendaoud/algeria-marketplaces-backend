import { MarketplaceModel } from '@/models';
import { deleteOneMarketplacesQueryType } from '@/types/marketplaces';

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesQueryType) => {
    const recordDeleted = await MarketplaceModel.deleteOne(filter, options);
    return recordDeleted;
};

export default deleteOneQuery;

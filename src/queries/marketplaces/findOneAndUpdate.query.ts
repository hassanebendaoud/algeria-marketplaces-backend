import { MarketplaceModel } from '@/models';
import { findOneAndUpdateMarketplacesQueryType } from '@/types/marketplaces';

const findOneAndUpdateQuery = async ({
    filter,
    update,
    options,
}: findOneAndUpdateMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.findOneAndUpdate(
        filter,
        update,
        options
    );
    return recordUpdated;
};

export default findOneAndUpdateQuery;

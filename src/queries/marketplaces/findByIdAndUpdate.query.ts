import { MarketplaceModel } from '@/models';
import { findByIdAndUpdateMarketplacesQueryType } from '@/types/marketplaces';

const findByIdAndUpdateQuery = async ({
    _id,
    update,
    options,
}: findByIdAndUpdateMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.findByIdAndUpdate(
        _id,
        update,
        options
    );
    return recordUpdated;
};

export default findByIdAndUpdateQuery;

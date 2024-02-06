import { MarketplaceModel } from '@/models';
import { updateOneMarketplacesQueryType } from '@/types/marketplaces';

const updateOneQuery = async ({
    filter,
    update,
    options,
}: updateOneMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

export default updateOneQuery;

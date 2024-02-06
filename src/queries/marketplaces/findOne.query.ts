import { MarketplaceModel } from '@/models';
import { findOneMarketplacesQueryType } from '@/types/marketplaces';

const findOneQuery = async ({
    filter,
    populate = {
        path: '',
    },
    select,
}: findOneMarketplacesQueryType) => {
    const data = await MarketplaceModel.findOne(filter)
        .select(select)
        .populate(
            populate.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

export default findOneQuery;

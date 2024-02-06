import { MarketplaceModel } from '@/models';
import { findByIdMarketplacesQueryType } from '@/types/marketplaces';

const findByIdQuery = async ({
    filter: { _id },
    populate = {
        path: '',
    },
    select,
}: findByIdMarketplacesQueryType) => {
    const data = await MarketplaceModel.findById(_id)
        .select(select)
        .populate(
            populate?.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

export default findByIdQuery;

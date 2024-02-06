import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type findOneAndUpdateQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface> | null;
};

export default findOneAndUpdateQueryType;

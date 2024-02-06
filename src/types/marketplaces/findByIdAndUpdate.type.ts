import { QueryOptions, UpdateQuery } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type findByIdAndUpdateQueryType = {
    _id: string;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface>;
};

export default findByIdAndUpdateQueryType;

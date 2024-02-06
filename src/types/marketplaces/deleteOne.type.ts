import { FilterQuery, MongooseQueryOptions } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type deleteOneQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    options?: Omit<
        MongooseQueryOptions<MarketplaceInterface>,
        'lean' | 'timestamps'
    > | null;
};

export default deleteOneQueryType;

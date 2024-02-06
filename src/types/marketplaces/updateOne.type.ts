import {
    FilterQuery, MongooseQueryOptions, UpdateQuery, UpdateWithAggregationPipeline
} from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type updateOneQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<MarketplaceInterface>, 'lean'> | null;
};

export default updateOneQueryType;

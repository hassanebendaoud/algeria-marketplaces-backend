import {
    FilterQuery, MongooseQueryOptions, UpdateQuery, UpdateWithAggregationPipeline
} from 'mongoose';

import { ProductInterface } from '@/interfaces';

type updateOneQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<ProductInterface>, 'lean'> | null;
};

export default updateOneQueryType;

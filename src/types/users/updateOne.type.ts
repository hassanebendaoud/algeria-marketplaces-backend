import {
    FilterQuery, MongooseQueryOptions, UpdateQuery, UpdateWithAggregationPipeline
} from 'mongoose';

import { UserInterface } from '@/interfaces';

type updateOneQueryType = {
    filter: FilterQuery<UserInterface>;
    update: UpdateQuery<UserInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<UserInterface>, 'lean'> | null;
};

export default updateOneQueryType;

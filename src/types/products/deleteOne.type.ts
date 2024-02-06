import { FilterQuery, MongooseQueryOptions } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type deleteOneQueryType = {
    filter: FilterQuery<ProductInterface>;
    options?: Omit<
        MongooseQueryOptions<ProductInterface>,
        'lean' | 'timestamps'
    > | null;
};

export default deleteOneQueryType;

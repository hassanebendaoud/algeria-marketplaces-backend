import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type findOneAndUpdateQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;
};

export default findOneAndUpdateQueryType;

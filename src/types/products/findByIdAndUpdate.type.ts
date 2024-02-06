import { QueryOptions, UpdateQuery } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type findByIdAndUpdateQueryType = {
    _id: string;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface>;
};

export default findByIdAndUpdateQueryType;

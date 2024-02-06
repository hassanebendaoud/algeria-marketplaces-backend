import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type findOneQueryType = {
    filter: FilterQuery<ProductInterface>;
    projection?: ProjectionType<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;

    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
        match?: unknown;
    };
    select: string;
};

export default findOneQueryType;

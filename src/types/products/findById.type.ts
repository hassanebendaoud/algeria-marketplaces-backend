import { Model, ProjectionType, QueryOptions } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type findByIdQueryType = {
    filter: {
        _id: string;
        projection?: ProjectionType<ProductInterface> | null;
        options?: QueryOptions<ProductInterface> | null;
    };
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
        match?: unknown;
    };
    select: string;
};

export default findByIdQueryType;

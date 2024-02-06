import { FilterQuery, Model, SortOrder } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type findAllQueryType = {
    filter: FilterQuery<ProductInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
        match?: unknown;
    };
    select: string;
    paginationOptions: {
        page: number;
        size: number;
    };
    sort: {
        [key: string]: SortOrder;
    };
};

export default findAllQueryType;

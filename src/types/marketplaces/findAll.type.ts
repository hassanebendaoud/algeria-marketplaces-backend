import { FilterQuery, Model, SortOrder } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type findAllQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<MarketplaceInterface>;
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

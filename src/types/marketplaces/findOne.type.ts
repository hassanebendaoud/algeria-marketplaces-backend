import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type findOneQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    projection?: ProjectionType<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface> | null;

    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<MarketplaceInterface>;
        match?: unknown;
    };
    select: string;
};

export default findOneQueryType;

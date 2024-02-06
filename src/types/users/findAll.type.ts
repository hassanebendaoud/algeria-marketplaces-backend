import { FilterQuery, Model, SortOrder } from 'mongoose';

import { UserInterface } from '@/interfaces';

type findAllQueryType = {
    filter: FilterQuery<UserInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<UserInterface>;
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

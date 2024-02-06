import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

import { UserInterface } from '@/interfaces';

type findOneQueryType = {
    filter: {
        filter: FilterQuery<UserInterface>;
        projection?: ProjectionType<UserInterface>;
        options?: QueryOptions<UserInterface> | null;
    };
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<UserInterface>;
        match?: unknown;
    };
    select: string;
};

export default findOneQueryType;

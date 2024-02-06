import { Model, ProjectionType, QueryOptions } from 'mongoose';

import { UserInterface } from '@/interfaces';

type findByIdQueryType = {
    filter: {
        _id: string;
        projection?: ProjectionType<UserInterface> | null;
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

export default findByIdQueryType;

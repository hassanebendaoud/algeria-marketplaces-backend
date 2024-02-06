import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { UserInterface } from '@/interfaces';

type findOneAndUpdateQueryType = {
    filter: FilterQuery<UserInterface>;
    update: UpdateQuery<UserInterface>;
    options?: QueryOptions<UserInterface> | null;
};

export default findOneAndUpdateQueryType;

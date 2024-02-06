import { QueryOptions, UpdateQuery } from 'mongoose';

import { UserInterface } from '@/interfaces';

type findByIdAndUpdateQueryType = {
    _id: string;
    update: UpdateQuery<UserInterface>;
    options?: QueryOptions<UserInterface>;
};

export default findByIdAndUpdateQueryType;

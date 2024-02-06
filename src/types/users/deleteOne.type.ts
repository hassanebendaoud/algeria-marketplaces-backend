import { FilterQuery, MongooseQueryOptions } from 'mongoose';

import { UserInterface } from '@/interfaces';

type deleteOneQueryType = {
    filter: FilterQuery<UserInterface>;
    options?: Omit<
        MongooseQueryOptions<UserInterface>,
        'lean' | 'timestamps'
    > | null;
};

export default deleteOneQueryType;

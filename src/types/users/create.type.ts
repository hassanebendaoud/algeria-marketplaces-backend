import { AnyKeys } from 'mongoose';

import { UserInterface } from '@/interfaces';

type createQueryType = {
    data: AnyKeys<UserInterface>;
};

export default createQueryType;

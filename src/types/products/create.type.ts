import { AnyKeys } from 'mongoose';

import { ProductInterface } from '@/interfaces';

type createQueryType = {
    data: AnyKeys<ProductInterface>;
};

export default createQueryType;

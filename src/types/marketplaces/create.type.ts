import { AnyKeys } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces';

type createQueryType = {
    data: AnyKeys<MarketplaceInterface>;
};

export default createQueryType;

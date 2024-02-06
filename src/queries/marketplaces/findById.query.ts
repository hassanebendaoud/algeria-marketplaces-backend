import { ObjectId } from 'bson';

import { MarketplaceModel } from '@/models';

const findByIdQuery = async ({
  _id,
  populate = [],
  salt = [],
}: {
  _id: ObjectId;
  populate?: any[];
  salt?: string[];
}) => {
  const data = await MarketplaceModel.findById(_id)
    .select(salt)
    .populate(populate);
  return data;
};

export default findByIdQuery;

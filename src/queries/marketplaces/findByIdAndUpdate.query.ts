import { ObjectId } from 'bson';

import { MarketplaceModel } from '@/models';

const findByIdAndUpdateQuery = async ({
  _id,
  data,
  options,
}: {
  _id: ObjectId;
  data: any;
  options?: any;
}) => {
  const recordUpdated = await MarketplaceModel.findByIdAndUpdate(
    _id,
    data,
    options
  );
  return recordUpdated;
};

export default findByIdAndUpdateQuery;

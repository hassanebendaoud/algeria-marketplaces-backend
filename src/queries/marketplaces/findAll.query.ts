import { MarketplaceModel } from '@/models';
import utils from '@/utils';

const findAllQuery = async ({
  filter = {},
  populate = [],
  salt = [],
  options = { page: 1, size: 10 },
  sort = { createdAt: -1 },
}: {
  filter?: any;
  populate?: any[];
  salt?: string[];
  options?: { page: number; size: number };
  sort?: any;
}) => {
  const { page, size } = options;
  const { limit, skip } = utils.pagination.getPagination(page, size);

  const rows = await MarketplaceModel.find(filter)
    .select(salt)
    .populate(populate)
    .skip(skip)
    .limit(limit)
    .sort(sort);
  const count = await MarketplaceModel.countDocuments(filter);
  const { totalItems, totalPages, currentPage } =
    utils.pagination.getPagingData(count, page, limit);

  return {
    totalItems,
    totalPages,
    currentPage,
    count,
    rows,
  };
};

export default findAllQuery;

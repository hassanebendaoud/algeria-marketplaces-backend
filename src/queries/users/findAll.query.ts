import { UserModel } from '@/models';
import { findAllUsersQueryType } from '@/types/users';
import utils from '@/utils';

const findAllQuery = async ({
    filter,
    populate = {
        path: '',
    },
    select = '',
    paginationOptions = { page: 1, size: 10 },
    sort = { createdAt: -1 },
}: findAllUsersQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await UserModel.find(filter)
        .select(select)
        .populate(
            populate.path,
            populate.select,
            populate.model,
            populate.match
        )
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const count = await UserModel.countDocuments(filter);
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

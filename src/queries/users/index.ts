import { UserModel } from '@/models';
import {
    createUsersQueryType, deleteOneUsersQueryType, findAllUsersQueryType,
    findByIdAndUpdateUsersQueryType, findByIdUsersQueryType, findOneAndUpdateUsersQueryType,
    findOneUsersQueryType, updateOneUsersQueryType
} from '@/types/users';
import utils from '@/utils';

const createQuery = async ({ data }: createUsersQueryType) => {
    const recordCreated = await UserModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({ filter, options }: deleteOneUsersQueryType) => {
    const recordDeleted = await UserModel.deleteOne(filter, options);
    return recordDeleted;
};

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

const findByIdQuery = async ({
    filter: { _id },
    populate = {
        path: '',
    },
    select,
}: findByIdUsersQueryType) => {
    const data = await UserModel.findById(_id)
        .select(select)
        .populate(
            populate?.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

const findByIdAndUpdateQuery = async ({
    _id,
    update,
    options,
}: findByIdAndUpdateUsersQueryType) => {
    const recordUpdated = await UserModel.findByIdAndUpdate(
        _id,
        update,
        options
    );
    return recordUpdated;
};

const findOneQuery = async ({
    filter,
    populate = {
        path: '',
    },
    select,
}: findOneUsersQueryType) => {
    const data = await UserModel.findOne(filter)
        .select(select)
        .populate(
            populate.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

const findOneAndUpdateQuery = async ({
    filter,
    update,
    options,
}: findOneAndUpdateUsersQueryType) => {
    const recordUpdated = await UserModel.findOneAndUpdate(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const updateOneQuery = async ({
    filter,
    update,
    options,
}: updateOneUsersQueryType) => {
    const recordUpdated = await UserModel.updateOne(filter, update, options);
    return recordUpdated;
};
const usersQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default usersQueries;

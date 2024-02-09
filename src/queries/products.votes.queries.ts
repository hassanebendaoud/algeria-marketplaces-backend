import { ProductVoteModel } from '@/models';
import {
    createProductsVotesQueryType,
    deleteOneProductsVotesQueryType,
    findAllProductsVotesQueryType,
    findByIdAndUpdateProductsVotesQueryType,
    findByIdProductsVotesQueryType,
    findOneAndUpdateProductsVotesQueryType,
    findOneProductsVotesQueryType,
    updateOneProductsVotesQueryType,
} from '@/types/products.votes.types';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsVotesQueryType) => {
    const recordCreated = await ProductVoteModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsVotesQueryType) => {
    const recordDeleted = await ProductVoteModel.deleteOne(filter, options);
    return recordDeleted;
};

const findAllQuery = async ({
    filter = {},
    populate = {
        path: '',
    },
    select = '',
    paginationOptions = { page: 1, size: 10 },
    sort = { createdAt: -1 },
}: findAllProductsVotesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductVoteModel.find(filter)
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
    const count = await ProductVoteModel.countDocuments(filter);
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
}: findByIdProductsVotesQueryType) => {
    const data = await ProductVoteModel.findById(_id)
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
}: findByIdAndUpdateProductsVotesQueryType) => {
    const recordUpdated = await ProductVoteModel.findByIdAndUpdate(
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
}: findOneProductsVotesQueryType) => {
    const data = await ProductVoteModel.findOne(filter)
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
}: findOneAndUpdateProductsVotesQueryType) => {
    const recordUpdated = await ProductVoteModel.findOneAndUpdate(
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
}: updateOneProductsVotesQueryType) => {
    const recordUpdated = await ProductVoteModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const productsVotesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsVotesQueries;

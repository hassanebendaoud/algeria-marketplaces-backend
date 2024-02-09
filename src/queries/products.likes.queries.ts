import { ProductLikeModel } from '@/models';
import {
    createProductsLikesQueryType,
    deleteOneProductsLikesQueryType,
    findAllProductsLikesQueryType,
    findByIdAndUpdateProductsLikesQueryType,
    findByIdProductsLikesQueryType,
    findOneAndUpdateProductsLikesQueryType,
    findOneProductsLikesQueryType,
    updateOneProductsLikesQueryType,
} from '@/types/products.likes.types';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsLikesQueryType) => {
    const recordCreated = await ProductLikeModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsLikesQueryType) => {
    const recordDeleted = await ProductLikeModel.deleteOne(filter, options);
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
}: findAllProductsLikesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductLikeModel.find(filter)
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
    const count = await ProductLikeModel.countDocuments(filter);
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
}: findByIdProductsLikesQueryType) => {
    const data = await ProductLikeModel.findById(_id)
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
}: findByIdAndUpdateProductsLikesQueryType) => {
    const recordUpdated = await ProductLikeModel.findByIdAndUpdate(
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
}: findOneProductsLikesQueryType) => {
    const data = await ProductLikeModel.findOne(filter)
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
}: findOneAndUpdateProductsLikesQueryType) => {
    const recordUpdated = await ProductLikeModel.findOneAndUpdate(
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
}: updateOneProductsLikesQueryType) => {
    const recordUpdated = await ProductLikeModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const productsLikesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsLikesQueries;

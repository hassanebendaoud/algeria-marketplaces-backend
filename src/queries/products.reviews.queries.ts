import { ProductReviewModel } from '@/models';
import {
    createProductsReviewsQueryType,
    deleteOneProductsReviewsQueryType,
    findAllProductsReviewsQueryType,
    findByIdAndUpdateProductsReviewsQueryType,
    findByIdProductsReviewsQueryType,
    findOneAndUpdateProductsReviewsQueryType,
    findOneProductsReviewsQueryType,
    updateOneProductsReviewsQueryType,
} from '@/types/products.reviews.types';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsReviewsQueryType) => {
    const recordCreated = await ProductReviewModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsReviewsQueryType) => {
    const recordDeleted = await ProductReviewModel.deleteOne(filter, options);
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
}: findAllProductsReviewsQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductReviewModel.find(filter)
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
    const count = await ProductReviewModel.countDocuments(filter);
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
}: findByIdProductsReviewsQueryType) => {
    const data = await ProductReviewModel.findById(_id)
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
}: findByIdAndUpdateProductsReviewsQueryType) => {
    const recordUpdated = await ProductReviewModel.findByIdAndUpdate(
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
}: findOneProductsReviewsQueryType) => {
    const data = await ProductReviewModel.findOne(filter)
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
}: findOneAndUpdateProductsReviewsQueryType) => {
    const recordUpdated = await ProductReviewModel.findOneAndUpdate(
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
}: updateOneProductsReviewsQueryType) => {
    const recordUpdated = await ProductReviewModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const productsReviewsQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsReviewsQueries;

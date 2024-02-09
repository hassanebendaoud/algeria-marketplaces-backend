import { ProductCommentModel } from '@/models';
import {
    createProductsCommentsQueryType,
    deleteOneProductsCommentsQueryType,
    findAllProductsCommentsQueryType,
    findByIdAndUpdateProductsCommentsQueryType,
    findByIdProductsCommentsQueryType,
    findOneAndUpdateProductsCommentsQueryType,
    findOneProductsCommentsQueryType,
    updateOneProductsCommentsQueryType,
} from '@/types/products.comments.types';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsCommentsQueryType) => {
    const recordCreated = await ProductCommentModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsCommentsQueryType) => {
    const recordDeleted = await ProductCommentModel.deleteOne(filter, options);
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
}: findAllProductsCommentsQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductCommentModel.find(filter)
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
    const count = await ProductCommentModel.countDocuments(filter);
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
}: findByIdProductsCommentsQueryType) => {
    const data = await ProductCommentModel.findById(_id)
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
}: findByIdAndUpdateProductsCommentsQueryType) => {
    const recordUpdated = await ProductCommentModel.findByIdAndUpdate(
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
}: findOneProductsCommentsQueryType) => {
    const data = await ProductCommentModel.findOne(filter)
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
}: findOneAndUpdateProductsCommentsQueryType) => {
    const recordUpdated = await ProductCommentModel.findOneAndUpdate(
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
}: updateOneProductsCommentsQueryType) => {
    const recordUpdated = await ProductCommentModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const productsCommentsQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsCommentsQueries;

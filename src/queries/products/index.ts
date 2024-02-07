import { ProductModel } from '@/models';
import {
    createProductsQueryType, deleteOneProductsQueryType, findAllProductsQueryType,
    findByIdAndUpdateProductsQueryType, findByIdProductsQueryType,
    findOneAndUpdateProductsQueryType, findOneProductsQueryType, updateOneProductsQueryType
} from '@/types/products';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsQueryType) => {
    const recordCreated = await ProductModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsQueryType) => {
    const recordDeleted = await ProductModel.deleteOne(filter, options);
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
}: findAllProductsQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductModel.find(filter)
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
    const count = await ProductModel.countDocuments(filter);
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
}: findByIdProductsQueryType) => {
    const data = await ProductModel.findById(_id)
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
}: findByIdAndUpdateProductsQueryType) => {
    const recordUpdated = await ProductModel.findByIdAndUpdate(
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
}: findOneProductsQueryType) => {
    const data = await ProductModel.findOne(filter)
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
}: findOneAndUpdateProductsQueryType) => {
    const recordUpdated = await ProductModel.findOneAndUpdate(
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
}: updateOneProductsQueryType) => {
    const recordUpdated = await ProductModel.updateOne(filter, update, options);
    return recordUpdated;
};

const productsQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsQueries;

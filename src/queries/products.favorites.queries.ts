import { ProductFavoriteModel } from '@/models';
import {
    createProductsFavoritesQueryType,
    deleteOneProductsFavoritesQueryType,
    findAllProductsFavoritesQueryType,
    findByIdAndUpdateProductsFavoritesQueryType,
    findByIdProductsFavoritesQueryType,
    findOneAndUpdateProductsFavoritesQueryType,
    findOneProductsFavoritesQueryType,
    updateOneProductsFavoritesQueryType,
} from '@/types/products.favorites.types';
import utils from '@/utils';

const createQuery = async ({ data }: createProductsFavoritesQueryType) => {
    const recordCreated = await ProductFavoriteModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsFavoritesQueryType) => {
    const recordDeleted = await ProductFavoriteModel.deleteOne(filter, options);
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
}: findAllProductsFavoritesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await ProductFavoriteModel.find(filter)
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
    const count = await ProductFavoriteModel.countDocuments(filter);
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
}: findByIdProductsFavoritesQueryType) => {
    const data = await ProductFavoriteModel.findById(_id)
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
}: findByIdAndUpdateProductsFavoritesQueryType) => {
    const recordUpdated = await ProductFavoriteModel.findByIdAndUpdate(
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
}: findOneProductsFavoritesQueryType) => {
    const data = await ProductFavoriteModel.findOne(filter)
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
}: findOneAndUpdateProductsFavoritesQueryType) => {
    const recordUpdated = await ProductFavoriteModel.findOneAndUpdate(
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
}: updateOneProductsFavoritesQueryType) => {
    const recordUpdated = await ProductFavoriteModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const productsFavoritesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default productsFavoritesQueries;

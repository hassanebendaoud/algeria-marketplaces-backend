import { MarketplaceFavoriteModel } from '@/models';
import {
    createMarketplacesFavoritesQueryType,
    deleteOneMarketplacesFavoritesQueryType,
    findAllMarketplacesFavoritesQueryType,
    findByIdAndUpdateMarketplacesFavoritesQueryType,
    findByIdMarketplacesFavoritesQueryType,
    findOneAndUpdateMarketplacesFavoritesQueryType,
    findOneMarketplacesFavoritesQueryType,
    updateOneMarketplacesFavoritesQueryType,
} from '@/types/marketplaces.favorites.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesFavoritesQueryType) => {
    const recordCreated = await MarketplaceFavoriteModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesFavoritesQueryType) => {
    const recordDeleted = await MarketplaceFavoriteModel.deleteOne(
        filter,
        options
    );
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
}: findAllMarketplacesFavoritesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceFavoriteModel.find(filter)
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
    const count = await MarketplaceFavoriteModel.countDocuments(filter);
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
}: findByIdMarketplacesFavoritesQueryType) => {
    const data = await MarketplaceFavoriteModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesFavoritesQueryType) => {
    const recordUpdated = await MarketplaceFavoriteModel.findByIdAndUpdate(
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
}: findOneMarketplacesFavoritesQueryType) => {
    const data = await MarketplaceFavoriteModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesFavoritesQueryType) => {
    const recordUpdated = await MarketplaceFavoriteModel.findOneAndUpdate(
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
}: updateOneMarketplacesFavoritesQueryType) => {
    const recordUpdated = await MarketplaceFavoriteModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesFavoritesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesFavoritesQueries;

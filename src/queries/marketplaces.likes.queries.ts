import { MarketplaceLikeModel } from '@/models';
import {
    createMarketplacesLikesQueryType,
    deleteOneMarketplacesLikesQueryType,
    findAllMarketplacesLikesQueryType,
    findByIdAndUpdateMarketplacesLikesQueryType,
    findByIdMarketplacesLikesQueryType,
    findOneAndUpdateMarketplacesLikesQueryType,
    findOneMarketplacesLikesQueryType,
    updateOneMarketplacesLikesQueryType,
} from '@/types/marketplaces.likes.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesLikesQueryType) => {
    const recordCreated = await MarketplaceLikeModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesLikesQueryType) => {
    const recordDeleted = await MarketplaceLikeModel.deleteOne(filter, options);
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
}: findAllMarketplacesLikesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceLikeModel.find(filter)
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
    const count = await MarketplaceLikeModel.countDocuments(filter);
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
}: findByIdMarketplacesLikesQueryType) => {
    const data = await MarketplaceLikeModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesLikesQueryType) => {
    const recordUpdated = await MarketplaceLikeModel.findByIdAndUpdate(
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
}: findOneMarketplacesLikesQueryType) => {
    const data = await MarketplaceLikeModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesLikesQueryType) => {
    const recordUpdated = await MarketplaceLikeModel.findOneAndUpdate(
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
}: updateOneMarketplacesLikesQueryType) => {
    const recordUpdated = await MarketplaceLikeModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesLikesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesLikesQueries;

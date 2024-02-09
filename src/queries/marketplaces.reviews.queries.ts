import { MarketplaceReviewModel } from '@/models';
import {
    createMarketplacesReviewsQueryType,
    deleteOneMarketplacesReviewsQueryType,
    findAllMarketplacesReviewsQueryType,
    findByIdAndUpdateMarketplacesReviewsQueryType,
    findByIdMarketplacesReviewsQueryType,
    findOneAndUpdateMarketplacesReviewsQueryType,
    findOneMarketplacesReviewsQueryType,
    updateOneMarketplacesReviewsQueryType,
} from '@/types/marketplaces.reviews.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesReviewsQueryType) => {
    const recordCreated = await MarketplaceReviewModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesReviewsQueryType) => {
    const recordDeleted = await MarketplaceReviewModel.deleteOne(
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
}: findAllMarketplacesReviewsQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceReviewModel.find(filter)
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
    const count = await MarketplaceReviewModel.countDocuments(filter);
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
}: findByIdMarketplacesReviewsQueryType) => {
    const data = await MarketplaceReviewModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesReviewsQueryType) => {
    const recordUpdated = await MarketplaceReviewModel.findByIdAndUpdate(
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
}: findOneMarketplacesReviewsQueryType) => {
    const data = await MarketplaceReviewModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesReviewsQueryType) => {
    const recordUpdated = await MarketplaceReviewModel.findOneAndUpdate(
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
}: updateOneMarketplacesReviewsQueryType) => {
    const recordUpdated = await MarketplaceReviewModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesReviewsQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesReviewsQueries;

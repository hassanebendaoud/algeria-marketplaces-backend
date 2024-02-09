import { MarketplaceCommentModel } from '@/models';
import {
    createMarketplacesCommentsQueryType,
    deleteOneMarketplacesCommentsQueryType,
    findAllMarketplacesCommentsQueryType,
    findByIdAndUpdateMarketplacesCommentsQueryType,
    findByIdMarketplacesCommentsQueryType,
    findOneAndUpdateMarketplacesCommentsQueryType,
    findOneMarketplacesCommentsQueryType,
    updateOneMarketplacesCommentsQueryType,
} from '@/types/marketplaces.comments.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesCommentsQueryType) => {
    const recordCreated = await MarketplaceCommentModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesCommentsQueryType) => {
    const recordDeleted = await MarketplaceCommentModel.deleteOne(
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
}: findAllMarketplacesCommentsQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceCommentModel.find(filter)
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
    const count = await MarketplaceCommentModel.countDocuments(filter);
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
}: findByIdMarketplacesCommentsQueryType) => {
    const data = await MarketplaceCommentModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesCommentsQueryType) => {
    const recordUpdated = await MarketplaceCommentModel.findByIdAndUpdate(
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
}: findOneMarketplacesCommentsQueryType) => {
    const data = await MarketplaceCommentModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesCommentsQueryType) => {
    const recordUpdated = await MarketplaceCommentModel.findOneAndUpdate(
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
}: updateOneMarketplacesCommentsQueryType) => {
    const recordUpdated = await MarketplaceCommentModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesCommentsQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesCommentsQueries;

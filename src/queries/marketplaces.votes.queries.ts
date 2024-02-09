import { MarketplaceVoteModel } from '@/models';
import {
    createMarketplacesVotesQueryType,
    deleteOneMarketplacesVotesQueryType,
    findAllMarketplacesVotesQueryType,
    findByIdAndUpdateMarketplacesVotesQueryType,
    findByIdMarketplacesVotesQueryType,
    findOneAndUpdateMarketplacesVotesQueryType,
    findOneMarketplacesVotesQueryType,
    updateOneMarketplacesVotesQueryType,
} from '@/types/marketplaces.votes.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesVotesQueryType) => {
    const recordCreated = await MarketplaceVoteModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesVotesQueryType) => {
    const recordDeleted = await MarketplaceVoteModel.deleteOne(filter, options);
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
}: findAllMarketplacesVotesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceVoteModel.find(filter)
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
    const count = await MarketplaceVoteModel.countDocuments(filter);
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
}: findByIdMarketplacesVotesQueryType) => {
    const data = await MarketplaceVoteModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesVotesQueryType) => {
    const recordUpdated = await MarketplaceVoteModel.findByIdAndUpdate(
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
}: findOneMarketplacesVotesQueryType) => {
    const data = await MarketplaceVoteModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesVotesQueryType) => {
    const recordUpdated = await MarketplaceVoteModel.findOneAndUpdate(
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
}: updateOneMarketplacesVotesQueryType) => {
    const recordUpdated = await MarketplaceVoteModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesVotesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesVotesQueries;

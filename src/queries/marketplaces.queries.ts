import { MarketplaceModel } from '@/models';
import {
    createMarketplacesQueryType,
    deleteOneMarketplacesQueryType,
    findAllMarketplacesQueryType,
    findByIdAndUpdateMarketplacesQueryType,
    findByIdMarketplacesQueryType,
    findOneAndUpdateMarketplacesQueryType,
    findOneMarketplacesQueryType,
    updateManyMarketplacesQueryType,
    updateOneMarketplacesQueryType,
} from '@/types/marketplaces.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesQueryType) => {
    const recordCreated = await MarketplaceModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesQueryType) => {
    const recordDeleted = await MarketplaceModel.deleteOne(filter, options);
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
}: findAllMarketplacesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceModel.find(filter)
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
    const count = await MarketplaceModel.countDocuments(filter);
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
}: findByIdMarketplacesQueryType) => {
    const data = await MarketplaceModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.findByIdAndUpdate(
        _id,
        update,
        options
    );
    return recordUpdated;
};

const updateManyQuery = async ({
    filter,
    update,
    options,
}: updateManyMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.updateMany(
        filter,
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
}: findOneMarketplacesQueryType) => {
    const data = await MarketplaceModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.findOneAndUpdate(
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
}: updateOneMarketplacesQueryType) => {
    const recordUpdated = await MarketplaceModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesQueries = {
    createQuery,
    updateOneQuery,
    updateManyQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesQueries;

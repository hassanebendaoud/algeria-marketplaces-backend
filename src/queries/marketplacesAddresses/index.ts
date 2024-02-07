import { MarketplaceAddressModel } from '@/models';
import {
    createMarketplacesQueryType, deleteOneMarketplacesQueryType, findAllMarketplacesQueryType,
    findByIdAndUpdateMarketplacesQueryType, findByIdMarketplacesQueryType,
    findOneAndUpdateMarketplacesQueryType, findOneMarketplacesQueryType,
    updateOneMarketplacesQueryType
} from '@/types/marketplaces';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesQueryType) => {
    const recordCreated = await MarketplaceAddressModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesQueryType) => {
    const recordDeleted = await MarketplaceAddressModel.deleteOne(
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
}: findAllMarketplacesQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceAddressModel.find(filter)
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
    const count = await MarketplaceAddressModel.countDocuments(filter);
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
    const data = await MarketplaceAddressModel.findById(_id)
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
    const recordUpdated = await MarketplaceAddressModel.findByIdAndUpdate(
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
}: findOneMarketplacesQueryType) => {
    const data = await MarketplaceAddressModel.findOne(filter)
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
    const recordUpdated = await MarketplaceAddressModel.findOneAndUpdate(
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
    const recordUpdated = await MarketplaceAddressModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesAddressesQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesAddressesQueries;

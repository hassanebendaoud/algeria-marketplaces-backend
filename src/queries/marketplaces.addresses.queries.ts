import { MarketplaceAddressModel } from '@/models';
import {
    createMarketplacesAddressesQueryType,
    deleteOneMarketplacesAddressesQueryType,
    findAllMarketplacesAddressesQueryType,
    findByIdAndUpdateMarketplacesAddressesQueryType,
    findByIdMarketplacesAddressesQueryType,
    findOneAndUpdateMarketplacesAddressesQueryType,
    findOneMarketplacesAddressesQueryType,
    updateOneMarketplacesAddressesQueryType,
} from '@/types/marketplaces.addresses.types';
import utils from '@/utils';

const createQuery = async ({ data }: createMarketplacesAddressesQueryType) => {
    const recordCreated = await MarketplaceAddressModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesAddressesQueryType) => {
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
}: findAllMarketplacesAddressesQueryType) => {
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
}: findByIdMarketplacesAddressesQueryType) => {
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
}: findByIdAndUpdateMarketplacesAddressesQueryType) => {
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
}: findOneMarketplacesAddressesQueryType) => {
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
}: findOneAndUpdateMarketplacesAddressesQueryType) => {
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
}: updateOneMarketplacesAddressesQueryType) => {
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
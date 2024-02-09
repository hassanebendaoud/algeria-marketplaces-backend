import { MarketplaceContactInformationModel } from '@/models';
import {
    createMarketplacesContactsInformationQueryType,
    deleteOneMarketplacesContactsInformationQueryType,
    findAllMarketplacesContactsInformationQueryType,
    findByIdAndUpdateMarketplacesContactsInformationQueryType,
    findByIdMarketplacesContactsInformationQueryType,
    findOneAndUpdateMarketplacesContactsInformationQueryType,
    findOneMarketplacesContactsInformationQueryType,
    updateOneMarketplacesContactsInformationQueryType,
} from '@/types/marketplaces.contactsInformation.types';
import utils from '@/utils';

const createQuery = async ({
    data,
}: createMarketplacesContactsInformationQueryType) => {
    const recordCreated = await MarketplaceContactInformationModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesContactsInformationQueryType) => {
    const recordDeleted = await MarketplaceContactInformationModel.deleteOne(
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
}: findAllMarketplacesContactsInformationQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceContactInformationModel.find(filter)
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
    const count =
        await MarketplaceContactInformationModel.countDocuments(filter);
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
}: findByIdMarketplacesContactsInformationQueryType) => {
    const data = await MarketplaceContactInformationModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesContactsInformationQueryType) => {
    const recordUpdated =
        await MarketplaceContactInformationModel.findByIdAndUpdate(
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
}: findOneMarketplacesContactsInformationQueryType) => {
    const data = await MarketplaceContactInformationModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesContactsInformationQueryType) => {
    const recordUpdated =
        await MarketplaceContactInformationModel.findOneAndUpdate(
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
}: updateOneMarketplacesContactsInformationQueryType) => {
    const recordUpdated = await MarketplaceContactInformationModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesContactsInformationQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesContactsInformationQueries;

import { MarketplaceSocialMediaModel } from '@/models';
import {
    createMarketplacesSocialMediasQueryType,
    deleteOneMarketplacesSocialMediasQueryType,
    findAllMarketplacesSocialMediasQueryType,
    findByIdAndUpdateMarketplacesSocialMediasQueryType,
    findByIdMarketplacesSocialMediasQueryType,
    findOneAndUpdateMarketplacesSocialMediasQueryType,
    findOneMarketplacesSocialMediasQueryType,
    updateOneMarketplacesSocialMediasQueryType,
} from '@/types/marketplaces.socialMedias.types';
import utils from '@/utils';

const createQuery = async ({
    data,
}: createMarketplacesSocialMediasQueryType) => {
    const recordCreated = await MarketplaceSocialMediaModel.create(data);
    return recordCreated;
};

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneMarketplacesSocialMediasQueryType) => {
    const recordDeleted = await MarketplaceSocialMediaModel.deleteOne(
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
}: findAllMarketplacesSocialMediasQueryType) => {
    const { page, size } = paginationOptions;
    const { limit, skip } = utils.pagination.getPagination(page, size);

    const rows = await MarketplaceSocialMediaModel.find(filter)
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
    const count = await MarketplaceSocialMediaModel.countDocuments(filter);
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
}: findByIdMarketplacesSocialMediasQueryType) => {
    const data = await MarketplaceSocialMediaModel.findById(_id)
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
}: findByIdAndUpdateMarketplacesSocialMediasQueryType) => {
    const recordUpdated = await MarketplaceSocialMediaModel.findByIdAndUpdate(
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
}: findOneMarketplacesSocialMediasQueryType) => {
    const data = await MarketplaceSocialMediaModel.findOne(filter)
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
}: findOneAndUpdateMarketplacesSocialMediasQueryType) => {
    const recordUpdated = await MarketplaceSocialMediaModel.findOneAndUpdate(
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
}: updateOneMarketplacesSocialMediasQueryType) => {
    const recordUpdated = await MarketplaceSocialMediaModel.updateOne(
        filter,
        update,
        options
    );
    return recordUpdated;
};

const marketplacesSocialMediasQueries = {
    createQuery,
    updateOneQuery,
    deleteOneQuery,

    findAllQuery,
    findByIdQuery,
    findByIdAndUpdateQuery,
    findOneQuery,
    findOneAndUpdateQuery,
};

export default marketplacesSocialMediasQueries;

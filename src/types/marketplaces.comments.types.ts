import {
    AnyKeys,
    FilterQuery,
    Model,
    MongooseQueryOptions,
    ProjectionType,
    QueryOptions,
    SortOrder,
    UpdateQuery,
    UpdateWithAggregationPipeline,
} from 'mongoose';

import { MarketplaceInterface } from '@/interfaces/marketplaces.interfaces';

export type createMarketplacesCommentsQueryType = {
    data: AnyKeys<MarketplaceInterface>;
};

export type deleteOneMarketplacesCommentsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    options?: Omit<
        MongooseQueryOptions<MarketplaceInterface>,
        'lean' | 'timestamps'
    > | null;
};

export type updateOneMarketplacesCommentsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<MarketplaceInterface>, 'lean'> | null;
};

export type findOneAndUpdateMarketplacesCommentsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface> | null;
};

export type findOneMarketplacesCommentsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    projection?: ProjectionType<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface> | null;

    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<MarketplaceInterface>;
        match?: unknown;
    };
    select: string;
};

export type findByIdAndUpdateMarketplacesCommentsQueryType = {
    _id: string;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface>;
};

export type findByIdMarketplacesCommentsQueryType = {
    filter: {
        _id: string;
        projection?: ProjectionType<MarketplaceInterface> | null;
        options?: QueryOptions<MarketplaceInterface> | null;
    };
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<MarketplaceInterface>;
        match?: unknown;
    };
    select: string;
};

export type findAllMarketplacesCommentsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<MarketplaceInterface>;
        match?: unknown;
    };
    select: string;
    paginationOptions: {
        page: number;
        size: number;
    };
    sort: {
        [key: string]: SortOrder;
    };
};

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

export type createMarketplacesReviewsQueryType = {
    data: AnyKeys<MarketplaceInterface>;
};

export type deleteOneMarketplacesReviewsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    options?: Omit<
        MongooseQueryOptions<MarketplaceInterface>,
        'lean' | 'timestamps'
    > | null;
};

export type updateOneMarketplacesReviewsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<MarketplaceInterface>, 'lean'> | null;
};

export type findOneAndUpdateMarketplacesReviewsQueryType = {
    filter: FilterQuery<MarketplaceInterface>;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface> | null;
};

export type findOneMarketplacesReviewsQueryType = {
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

export type findByIdAndUpdateMarketplacesReviewsQueryType = {
    _id: string;
    update: UpdateQuery<MarketplaceInterface>;
    options?: QueryOptions<MarketplaceInterface>;
};

export type findByIdMarketplacesReviewsQueryType = {
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

export type findAllMarketplacesReviewsQueryType = {
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

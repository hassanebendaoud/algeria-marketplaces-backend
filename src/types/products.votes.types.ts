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

import { ProductInterface } from '@/interfaces/products.interfaces';

export type createProductsVotesQueryType = {
    data: AnyKeys<ProductInterface>;
};

export type deleteOneProductsVotesQueryType = {
    filter: FilterQuery<ProductInterface>;
    options?: Omit<
        MongooseQueryOptions<ProductInterface>,
        'lean' | 'timestamps'
    > | null;
};

export type updateOneProductsVotesQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<ProductInterface>, 'lean'> | null;
};

export type findOneAndUpdateProductsVotesQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;
};

export type findOneProductsVotesQueryType = {
    filter: FilterQuery<ProductInterface>;
    projection?: ProjectionType<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;

    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
        match?: unknown;
    };
    select: string;
};

export type findByIdAndUpdateProductsVotesQueryType = {
    _id: string;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface>;
};

export type findByIdProductsVotesQueryType = {
    filter: {
        _id: string;
        projection?: ProjectionType<ProductInterface> | null;
        options?: QueryOptions<ProductInterface> | null;
    };
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
        match?: unknown;
    };
    select: string;
};

export type findAllProductsVotesQueryType = {
    filter: FilterQuery<ProductInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<ProductInterface>;
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

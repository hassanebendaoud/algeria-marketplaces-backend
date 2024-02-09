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

export type createProductsFavoritesQueryType = {
    data: AnyKeys<ProductInterface>;
};

export type deleteOneProductsFavoritesQueryType = {
    filter: FilterQuery<ProductInterface>;
    options?: Omit<
        MongooseQueryOptions<ProductInterface>,
        'lean' | 'timestamps'
    > | null;
};

export type updateOneProductsFavoritesQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<ProductInterface>, 'lean'> | null;
};

export type findOneAndUpdateProductsFavoritesQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;
};

export type findOneProductsFavoritesQueryType = {
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

export type findByIdAndUpdateProductsFavoritesQueryType = {
    _id: string;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface>;
};

export type findByIdProductsFavoritesQueryType = {
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

export type findAllProductsFavoritesQueryType = {
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

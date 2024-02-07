import {
    AnyKeys, FilterQuery, Model, MongooseQueryOptions, ProjectionType, QueryOptions, SortOrder,
    UpdateQuery, UpdateWithAggregationPipeline
} from 'mongoose';

import { ProductInterface } from '@/interfaces/products.interfaces';

export type updateOneProductsQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<ProductInterface>, 'lean'> | null;
};

export type findOneAndUpdateProductsQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;
};
export type findOneProductsQueryType = {
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
export type findByIdAndUpdateProductsQueryType = {
    _id: string;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface>;
};
export type findByIdProductsQueryType = {
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
export type findAllProductsQueryType = {
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
export type deleteOneProductsQueryType = {
    filter: FilterQuery<ProductInterface>;
    options?: Omit<
        MongooseQueryOptions<ProductInterface>,
        'lean' | 'timestamps'
    > | null;
};
export type createProductsQueryType = {
    data: AnyKeys<ProductInterface>;
};

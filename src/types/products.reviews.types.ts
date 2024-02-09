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

export type createProductsReviewsQueryType = {
    data: AnyKeys<ProductInterface>;
};

export type deleteOneProductsReviewsQueryType = {
    filter: FilterQuery<ProductInterface>;
    options?: Omit<
        MongooseQueryOptions<ProductInterface>,
        'lean' | 'timestamps'
    > | null;
};

export type updateOneProductsReviewsQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<ProductInterface>, 'lean'> | null;
};

export type findOneAndUpdateProductsReviewsQueryType = {
    filter: FilterQuery<ProductInterface>;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface> | null;
};

export type findOneProductsReviewsQueryType = {
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

export type findByIdAndUpdateProductsReviewsQueryType = {
    _id: string;
    update: UpdateQuery<ProductInterface>;
    options?: QueryOptions<ProductInterface>;
};

export type findByIdProductsReviewsQueryType = {
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

export type findAllProductsReviewsQueryType = {
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

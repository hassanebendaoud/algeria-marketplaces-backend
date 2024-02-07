import {
    AnyKeys, FilterQuery, Model, MongooseQueryOptions, ProjectionType, QueryOptions, SortOrder,
    UpdateQuery, UpdateWithAggregationPipeline
} from 'mongoose';

import { UserInterface } from '@/interfaces/users.interface';

export type updateOneUsersQueryType = {
    filter: FilterQuery<UserInterface>;
    update: UpdateQuery<UserInterface> | UpdateWithAggregationPipeline;
    options?: Omit<MongooseQueryOptions<UserInterface>, 'lean'> | null;
};
export type findOneAndUpdateUsersQueryType = {
    filter: FilterQuery<UserInterface>;
    update: UpdateQuery<UserInterface>;
    options?: QueryOptions<UserInterface> | null;
};
export type findOneUsersQueryType = {
    filter: FilterQuery<UserInterface>;
    projection?: ProjectionType<UserInterface>;
    options?: QueryOptions<UserInterface> | null;

    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<UserInterface>;
        match?: unknown;
    };
    select: string;
};
export type findByIdAndUpdateUsersQueryType = {
    _id: string;
    update: UpdateQuery<UserInterface>;
    options?: QueryOptions<UserInterface>;
};
export type findByIdUsersQueryType = {
    filter: {
        _id: string;
        projection?: ProjectionType<UserInterface> | null;
        options?: QueryOptions<UserInterface> | null;
    };
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<UserInterface>;
        match?: unknown;
    };
    select: string;
};
export type findAllUsersQueryType = {
    filter: FilterQuery<UserInterface>;
    populate?: {
        path: string | string[];
        select?: string;
        model?: string | Model<UserInterface>;
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
export type deleteOneUsersQueryType = {
    filter: FilterQuery<UserInterface>;
    options?: Omit<
        MongooseQueryOptions<UserInterface>,
        'lean' | 'timestamps'
    > | null;
};
export type createUsersQueryType = {
    data: AnyKeys<UserInterface>;
};

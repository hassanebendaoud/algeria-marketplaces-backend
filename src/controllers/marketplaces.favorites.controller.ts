import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceFavoriteInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesFavoritesQueries from '@queries/marketplaces.favorites.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceFavorite from the request body
        const marketplaceFavorite: MarketplaceFavoriteInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceFavorite: MarketplaceFavoriteInterface = {
            ...marketplaceFavorite,
            User: userId,
        };

        if (marketplaceId) {
            newMarketplaceFavorite.Marketplace = marketplaceId;
        }

        const marketplaceFavoriteCreated =
            await marketplacesFavoritesQueries.createQuery({
                data: newMarketplaceFavorite,
            });

        // Update the user with the new favorite
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceFavorites: marketplaceFavoriteCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace favorite created
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: marketplaceId,
            update: {
                $push: {
                    Favorites: marketplaceFavoriteCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Favorite Created',
            data: marketplaceFavoriteCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceFavoriteId = req.query.marketplaceFavoriteId;

        const marketplaceFavoriteDeleted =
            await marketplacesFavoritesQueries.deleteOneQuery({
                filter: { _id: marketplaceFavoriteId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Favorites: marketplaceFavoriteId },
            update: {
                $pull: { Favorites: marketplaceFavoriteId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Favorite Deleted',
            data: marketplaceFavoriteDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesFavoritesController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesFavoritesQueries.findAllQuery({
            filter: {},
            select: '',
            populate: {
                path: '',
            },
            paginationOptions: {
                page: options.page,
                size: options.size,
            },
            sort: {
                createdAt: -1,
            },
        });

        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'No Data' });
        }
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByIdMarketplaceFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceFavoriteId = req.query
            .marketplaceFavoriteId! as string;
        const marketplaceFavorite =
            await marketplacesFavoritesQueries.findByIdQuery({
                filter: {
                    _id: marketplaceFavoriteId,
                },
                select: '',
            });

        if (!marketplaceFavorite) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Favorite not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Favorite found',
            data: marketplaceFavorite,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceFavorite: MarketplaceFavoriteInterface = req.body;
        const marketplaceFavoriteId = req.query
            .marketplaceFavoriteId! as string;

        const putFavorite: MarketplaceFavoriteInterface = {
            ...marketplaceFavorite,
        };

        const marketplaceFavoriteUpdated =
            await marketplacesFavoritesQueries.findByIdAndUpdateQuery({
                _id: marketplaceFavoriteId,
                update: putFavorite,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Favorite Updated',
            data: marketplaceFavoriteUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesFavoritesControllers = {
    createMarketplaceFavoriteController,
    deleteOneByIdMarketplaceFavoriteController,
    getAllMarketplacesFavoritesController,
    getOneByIdMarketplaceFavoriteController,
    updateOneByIdMarketplaceFavoriteController,
};

export default marketplacesFavoritesControllers;

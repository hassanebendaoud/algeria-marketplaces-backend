import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceLikeInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesLikesQueries from '@queries/marketplaces.likes.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceLikeController = async (req: Request, res: Response) => {
    try {
        // Get the marketplaceLike from the request body
        const marketplaceLike: MarketplaceLikeInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceLike: MarketplaceLikeInterface = {
            ...marketplaceLike,
            User: userId,
        };

        if (marketplaceId) {
            newMarketplaceLike.Marketplace = marketplaceId;
        }

        const marketplaceLikeCreated =
            await marketplacesLikesQueries.createQuery({
                data: newMarketplaceLike,
            });

        // Update the user with the new like
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceLikes: marketplaceLikeCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace like created
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: marketplaceId,
            update: {
                $push: {
                    Likes: marketplaceLikeCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Like Created',
            data: marketplaceLikeCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceLikeController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceLikeId = req.query.marketplaceLikeId;

        const marketplaceLikeDeleted =
            await marketplacesLikesQueries.deleteOneQuery({
                filter: { _id: marketplaceLikeId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Likes: marketplaceLikeId },
            update: {
                $pull: { Likes: marketplaceLikeId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Like Deleted',
            data: marketplaceLikeDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesLikesController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesLikesQueries.findAllQuery({
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

const getOneByIdMarketplaceLikeController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceLikeId = req.query.marketplaceLikeId! as string;
        const marketplaceLike = await marketplacesLikesQueries.findByIdQuery({
            filter: {
                _id: marketplaceLikeId,
            },
            select: '',
        });

        if (!marketplaceLike) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Like not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Like found',
            data: marketplaceLike,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceLikeController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceLike: MarketplaceLikeInterface = req.body;
        const marketplaceLikeId = req.query.marketplaceLikeId! as string;

        const putLike: MarketplaceLikeInterface = {
            ...marketplaceLike,
        };

        const marketplaceLikeUpdated =
            await marketplacesLikesQueries.findByIdAndUpdateQuery({
                _id: marketplaceLikeId,
                update: putLike,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Like Updated',
            data: marketplaceLikeUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesLikesControllers = {
    createMarketplaceLikeController,
    deleteOneByIdMarketplaceLikeController,
    getAllMarketplacesLikesController,
    getOneByIdMarketplaceLikeController,
    updateOneByIdMarketplaceLikeController,
};

export default marketplacesLikesControllers;

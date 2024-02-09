import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceReviewInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesReviewsQueries from '@queries/marketplaces.reviews.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceReview from the request body
        const marketplaceReview: MarketplaceReviewInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceReview: MarketplaceReviewInterface = {
            ...marketplaceReview,
            User: userId,
        };

        if (marketplaceId) {
            newMarketplaceReview.Marketplace = marketplaceId;
        }

        const marketplaceReviewCreated =
            await marketplacesReviewsQueries.createQuery({
                data: newMarketplaceReview,
            });

        // Update the user with the new review
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceReviews: marketplaceReviewCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace review created
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: marketplaceId,
            update: {
                $push: {
                    Reviews: marketplaceReviewCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Review Created',
            data: marketplaceReviewCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceReviewId = req.query.marketplaceReviewId;

        const marketplaceReviewDeleted =
            await marketplacesReviewsQueries.deleteOneQuery({
                filter: { _id: marketplaceReviewId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Reviews: marketplaceReviewId },
            update: {
                $pull: { Reviews: marketplaceReviewId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Review Deleted',
            data: marketplaceReviewDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesReviewsController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesReviewsQueries.findAllQuery({
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

const getOneByIdMarketplaceReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceReviewId = req.query.marketplaceReviewId! as string;
        const marketplaceReview =
            await marketplacesReviewsQueries.findByIdQuery({
                filter: {
                    _id: marketplaceReviewId,
                },
                select: '',
            });

        if (!marketplaceReview) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Review not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Review found',
            data: marketplaceReview,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceReview: MarketplaceReviewInterface = req.body;
        const marketplaceReviewId = req.query.marketplaceReviewId! as string;

        const putReview: MarketplaceReviewInterface = {
            ...marketplaceReview,
        };

        const marketplaceReviewUpdated =
            await marketplacesReviewsQueries.findByIdAndUpdateQuery({
                _id: marketplaceReviewId,
                update: putReview,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Review Updated',
            data: marketplaceReviewUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesReviewsControllers = {
    createMarketplaceReviewController,
    deleteOneByIdMarketplaceReviewController,
    getAllMarketplacesReviewsController,
    getOneByIdMarketplaceReviewController,
    updateOneByIdMarketplaceReviewController,
};

export default marketplacesReviewsControllers;

import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceCommentInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesCommentsQueries from '@queries/marketplaces.comments.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceComment from the request body
        const marketplaceComment: MarketplaceCommentInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceComment: MarketplaceCommentInterface = {
            ...marketplaceComment,
            User: userId,
        };

        if (marketplaceId) {
            newMarketplaceComment.Marketplace = marketplaceId;
        }

        const marketplaceCommentCreated =
            await marketplacesCommentsQueries.createQuery({
                data: newMarketplaceComment,
            });

        // Update the user with the new comment
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceComments: marketplaceCommentCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace comment created
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: marketplaceId,
            update: {
                $push: {
                    Comments: marketplaceCommentCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Comment Created',
            data: marketplaceCommentCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceCommentId = req.query.marketplaceCommentId;

        const marketplaceCommentDeleted =
            await marketplacesCommentsQueries.deleteOneQuery({
                filter: { _id: marketplaceCommentId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Comments: marketplaceCommentId },
            update: {
                $pull: { Comments: marketplaceCommentId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Comment Deleted',
            data: marketplaceCommentDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesCommentsController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesCommentsQueries.findAllQuery({
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

const getOneByIdMarketplaceCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceCommentId = req.query.marketplaceCommentId! as string;
        const marketplaceComment =
            await marketplacesCommentsQueries.findByIdQuery({
                filter: {
                    _id: marketplaceCommentId,
                },
                select: '',
            });

        if (!marketplaceComment) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Comment not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Comment found',
            data: marketplaceComment,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceComment: MarketplaceCommentInterface = req.body;
        const marketplaceCommentId = req.query.marketplaceCommentId! as string;

        const putComment: MarketplaceCommentInterface = {
            ...marketplaceComment,
        };

        const marketplaceCommentUpdated =
            await marketplacesCommentsQueries.findByIdAndUpdateQuery({
                _id: marketplaceCommentId,
                update: putComment,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Comment Updated',
            data: marketplaceCommentUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesCommentsControllers = {
    createMarketplaceCommentController,
    deleteOneByIdMarketplaceCommentController,
    getAllMarketplacesCommentsController,
    getOneByIdMarketplaceCommentController,
    updateOneByIdMarketplaceCommentController,
};

export default marketplacesCommentsControllers;

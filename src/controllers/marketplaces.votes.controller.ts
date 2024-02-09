import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceVoteInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesVotesQueries from '@queries/marketplaces.votes.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceVoteController = async (req: Request, res: Response) => {
    try {
        // Get the marketplaceVote from the request body
        const marketplaceVote: MarketplaceVoteInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceVote: MarketplaceVoteInterface = {
            ...marketplaceVote,
            User: userId,
        };

        if (marketplaceId) {
            newMarketplaceVote.Marketplace = marketplaceId;
        }

        const marketplaceVoteCreated =
            await marketplacesVotesQueries.createQuery({
                data: newMarketplaceVote,
            });

        // Update the user with the new vote
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceVotes: marketplaceVoteCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace vote created
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: marketplaceId,
            update: {
                $push: {
                    Votes: marketplaceVoteCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Vote Created',
            data: marketplaceVoteCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceVoteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceVoteId = req.query.marketplaceVoteId;

        const marketplaceVoteDeleted =
            await marketplacesVotesQueries.deleteOneQuery({
                filter: { _id: marketplaceVoteId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Votes: marketplaceVoteId },
            update: {
                $pull: { Votes: marketplaceVoteId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Vote Deleted',
            data: marketplaceVoteDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesVotesController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesVotesQueries.findAllQuery({
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

const getOneByIdMarketplaceVoteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceVoteId = req.query.marketplaceVoteId! as string;
        const marketplaceVote = await marketplacesVotesQueries.findByIdQuery({
            filter: {
                _id: marketplaceVoteId,
            },
            select: '',
        });

        if (!marketplaceVote) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Vote not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Vote found',
            data: marketplaceVote,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceVoteController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceVote: MarketplaceVoteInterface = req.body;
        const marketplaceVoteId = req.query.marketplaceVoteId! as string;

        const putVote: MarketplaceVoteInterface = {
            ...marketplaceVote,
        };

        const marketplaceVoteUpdated =
            await marketplacesVotesQueries.findByIdAndUpdateQuery({
                _id: marketplaceVoteId,
                update: putVote,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Vote Updated',
            data: marketplaceVoteUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesVotesControllers = {
    createMarketplaceVoteController,
    deleteOneByIdMarketplaceVoteController,
    getAllMarketplacesVotesController,
    getOneByIdMarketplaceVoteController,
    updateOneByIdMarketplaceVoteController,
};

export default marketplacesVotesControllers;

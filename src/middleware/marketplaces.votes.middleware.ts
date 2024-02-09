import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesVotesQueries from '@/queries/marketplaces.votes.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
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
            message: `Marketplace vote not found with ID: ${marketplaceVoteId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceVoteId = req.query.marketplaceVoteId! as string;

    if (!ObjectId.isValid(marketplaceVoteId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceVoteId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceVoteId from the request query
    const marketplaceVoteId = req.query.marketplaceVoteId! as string;
    // Find the marketplaceVote
    const marketplaceVote = await marketplacesVotesQueries.findByIdQuery({
        filter: {
            _id: marketplaceVoteId,
        },
        select: '',
    });
    // This is the id of the owner of the marketplaceVote
    const marketplaceVoteUserId = marketplaceVote?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceVote
    if (marketplaceVoteUserId !== userId) {
        // If the user is not the owner of the marketplaceVote, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceVote.',
        });
    }

    // If the user is the owner of the marketplaceVote, continue
    next();
};

const marketplacesVotesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesVotesMiddleware;

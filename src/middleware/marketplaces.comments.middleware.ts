import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesCommentsQueries from '@/queries/marketplaces.comments.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceCommentId = req.query.marketplaceCommentId! as string;

    const marketplaceComment = await marketplacesCommentsQueries.findByIdQuery({
        filter: {
            _id: marketplaceCommentId,
        },
        select: '',
    });

    if (!marketplaceComment) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace comment not found with ID: ${marketplaceCommentId}`,
        });
    }

    return next();
};

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceCommentId = req.query.marketplaceCommentId! as string;

    if (!ObjectId.isValid(marketplaceCommentId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceCommentId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceCommentId from the request query
    const marketplaceCommentId = req.query.marketplaceCommentId! as string;
    // Find the marketplaceComment
    const marketplaceComment = await marketplacesCommentsQueries.findByIdQuery({
        filter: {
            _id: marketplaceCommentId,
        },
        select: '',
    });
    // This is the id of the owner of the marketplaceComment
    const marketplaceCommentUserId =
        marketplaceComment?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceComment
    if (marketplaceCommentUserId !== userId) {
        // If the user is not the owner of the marketplaceComment, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceComment.',
        });
    }

    // If the user is the owner of the marketplaceComment, continue
    next();
};

const marketplacesCommentsMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesCommentsMiddleware;

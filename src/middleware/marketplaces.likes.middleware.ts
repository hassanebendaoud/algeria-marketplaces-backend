import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesLikesQueries from '@/queries/marketplaces.likes.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
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
            message: `Marketplace like not found with ID: ${marketplaceLikeId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceLikeId = req.query.marketplaceLikeId! as string;

    if (!ObjectId.isValid(marketplaceLikeId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceLikeId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceLikeId from the request query
    const marketplaceLikeId = req.query.marketplaceLikeId! as string;
    // Find the marketplaceLike
    const marketplaceLike = await marketplacesLikesQueries.findByIdQuery({
        filter: {
            _id: marketplaceLikeId,
        },
        select: '',
    });
    // This is the id of the owner of the marketplaceLike
    const marketplaceLikeUserId = marketplaceLike?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceLike
    if (marketplaceLikeUserId !== userId) {
        // If the user is not the owner of the marketplaceLike, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceLike.',
        });
    }

    // If the user is the owner of the marketplaceLike, continue
    next();
};

const marketplacesLikesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesLikesMiddleware;

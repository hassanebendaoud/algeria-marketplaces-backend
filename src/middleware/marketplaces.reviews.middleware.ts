import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesReviewsQueries from '@/queries/marketplaces.reviews.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceReviewId = req.query.marketplaceReviewId! as string;

    const marketplaceReview = await marketplacesReviewsQueries.findByIdQuery({
        filter: {
            _id: marketplaceReviewId,
        },
        select: '',
    });

    if (!marketplaceReview) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace review not found with ID: ${marketplaceReviewId}`,
        });
    }

    return next();
};

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceReviewId = req.query.marketplaceReviewId! as string;

    if (!ObjectId.isValid(marketplaceReviewId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceReviewId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceReviewId from the request query
    const marketplaceReviewId = req.query.marketplaceReviewId! as string;
    // Find the marketplaceReview
    const marketplaceReview = await marketplacesReviewsQueries.findByIdQuery({
        filter: {
            _id: marketplaceReviewId,
        },
        select: '',
    });
    // This is the id of the owner of the marketplaceReview
    const marketplaceReviewUserId =
        marketplaceReview?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceReview
    if (marketplaceReviewUserId !== userId) {
        // If the user is not the owner of the marketplaceReview, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceReview.',
        });
    }

    // If the user is the owner of the marketplaceReview, continue
    next();
};

const marketplacesReviewsMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesReviewsMiddleware;

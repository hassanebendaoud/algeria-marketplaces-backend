import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesSocialMediasQueries from '@/queries/marketplaces.socialMedias.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceSocialMediaId = req.query
        .marketplaceSocialMediaId! as string;

    const marketplaceSocialMedia =
        await marketplacesSocialMediasQueries.findByIdQuery({
            filter: {
                _id: marketplaceSocialMediaId,
            },
            select: '',
        });

    if (!marketplaceSocialMedia) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace socialmedia not found with ID: ${marketplaceSocialMediaId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceSocialMediaId = req.query
        .marketplaceSocialMediaId! as string;

    if (!ObjectId.isValid(marketplaceSocialMediaId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceSocialMediaId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceSocialMediaId from the request query
    const marketplaceSocialMediaId = req.query
        .marketplaceSocialMediaId! as string;
    // Find the marketplaceSocialMedia
    const marketplaceSocialMedia =
        await marketplacesSocialMediasQueries.findByIdQuery({
            filter: {
                _id: marketplaceSocialMediaId,
            },
            select: '',
        });
    // This is the id of the owner of the marketplaceSocialMedia
    const marketplaceSocialMediaUserId =
        marketplaceSocialMedia?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceSocialMedia
    if (marketplaceSocialMediaUserId !== userId) {
        // If the user is not the owner of the marketplaceSocialMedia, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceSocialMedia.',
        });
    }

    // If the user is the owner of the marketplaceSocialMedia, continue
    next();
};

const marketplacesSocialMediasMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesSocialMediasMiddleware;

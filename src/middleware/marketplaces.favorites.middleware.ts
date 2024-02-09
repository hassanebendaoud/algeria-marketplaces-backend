import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesFavoritesQueries from '@/queries/marketplaces.favorites.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceFavoriteId = req.query.marketplaceFavoriteId! as string;

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
            message: `Marketplace favorite not found with ID: ${marketplaceFavoriteId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceFavoriteId = req.query.marketplaceFavoriteId! as string;

    if (!ObjectId.isValid(marketplaceFavoriteId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceFavoriteId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceFavoriteId from the request query
    const marketplaceFavoriteId = req.query.marketplaceFavoriteId! as string;
    // Find the marketplaceFavorite
    const marketplaceFavorite =
        await marketplacesFavoritesQueries.findByIdQuery({
            filter: {
                _id: marketplaceFavoriteId,
            },
            select: '',
        });
    // This is the id of the owner of the marketplaceFavorite
    const marketplaceFavoriteUserId =
        marketplaceFavorite?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceFavorite
    if (marketplaceFavoriteUserId !== userId) {
        // If the user is not the owner of the marketplaceFavorite, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceFavorite.',
        });
    }

    // If the user is the owner of the marketplaceFavorite, continue
    next();
};

const marketplacesFavoritesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesFavoritesMiddleware;

import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesQueries from '@/queries/marketplaces.queries';
import { ExpressUserType } from '@/types/express.types';

const isUsernameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const marketplaceUsername = req.body.username! as string;

    const marketplace = await marketplacesQueries.findOneQuery({
        filter: { username: marketplaceUsername },
        select: '',
    });

    if (marketplace) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace with Username: ${marketplaceUsername} already exists.`,
        });
    }

    return next();
};
const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceId = req.query.marketplaceId! as string;

    const marketplace = await marketplacesQueries.findByIdQuery({
        filter: {
            _id: marketplaceId,
        },
        select: '',
    });

    if (!marketplace) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace not found with ID: ${marketplaceId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceId = req.query.marketplaceId! as string;

    if (!ObjectId.isValid(marketplaceId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceId from the request query
    const marketplaceId = req.query.marketplaceId! as string;
    // Find the marketplace
    const marketplace = await marketplacesQueries.findByIdQuery({
        filter: {
            _id: marketplaceId,
        },
        select: '',
    });
    // This is the id of the owner of the marketplace
    const marketplaceUserId = marketplace?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplace
    if (marketplaceUserId !== userId) {
        // If the user is not the owner of the marketplace, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplace.',
        });
    }

    // If the user is the owner of the marketplace, continue
    next();
};

const isSlugExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const marketplaceSlug = req.body.slug! as string;

    const marketplace = await marketplacesQueries.findOneQuery({
        filter: {
            slug: marketplaceSlug,
        },
        select: '',
    });

    if (marketplace) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace with Slug: ${marketplaceSlug} already exists.`,
        });
    }

    return next();
};

const marketplacesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
    isUsernameExists,
    isSlugExists,
};

export default marketplacesMiddleware;

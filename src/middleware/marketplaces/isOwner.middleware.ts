import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@/queries';
import { ExpressUser } from '@/types/ExpressUser';

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
    const user = req.user! as ExpressUser;

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

export default isOwner;

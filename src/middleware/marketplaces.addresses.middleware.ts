import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesAddressesQueries from '@/queries/marketplaces.addresses.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceAddressId = req.query.marketplaceAddressId! as string;

    const marketplaceAddress = await marketplacesAddressesQueries.findByIdQuery(
        {
            filter: {
                _id: marketplaceAddressId,
            },
            select: '',
        }
    );

    if (!marketplaceAddress) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace address not found with ID: ${marketplaceAddressId}`,
        });
    }

    return next();
};

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceAddressId = req.query.marketplaceAddressId! as string;

    if (!ObjectId.isValid(marketplaceAddressId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceAddressId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceAddressId from the request query
    const marketplaceAddressId = req.query.marketplaceAddressId! as string;
    // Find the marketplaceAddress
    const marketplaceAddress = await marketplacesAddressesQueries.findByIdQuery(
        {
            filter: {
                _id: marketplaceAddressId,
            },
            select: '',
        }
    );
    // This is the id of the owner of the marketplaceAddress
    const marketplaceAddressUserId =
        marketplaceAddress?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceAddress
    if (marketplaceAddressUserId !== userId) {
        // If the user is not the owner of the marketplaceAddress, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this marketplaceAddress.',
        });
    }

    // If the user is the owner of the marketplaceAddress, continue
    next();
};

const marketplacesAddressesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesAddressesMiddleware;

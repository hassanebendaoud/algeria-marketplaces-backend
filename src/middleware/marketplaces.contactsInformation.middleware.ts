import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import marketplacesContactsInformationQueries from '@/queries/marketplaces.contactsInformation.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceContactInformationId from the request query
    const marketplaceContactInformationId = req.query
        .marketplaceContactInformationId! as string;

    // Find the marketplace ContactInformation
    const marketplaceContactInformation =
        await marketplacesContactsInformationQueries.findByIdQuery({
            filter: {
                _id: marketplaceContactInformationId,
            },
            select: '',
        });

    if (!marketplaceContactInformation) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace contactinformation not found with ID: ${marketplaceContactInformationId}`,
        });
    }

    return next();
};

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const marketplaceContactInformationId = req.query
        .marketplaceContactInformationId! as string;

    if (!ObjectId.isValid(marketplaceContactInformationId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace ID is not valid: ${marketplaceContactInformationId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the marketplaceContactInformationId from the request query
    const marketplaceContactInformationId = req.query
        .marketplaceContactInformationId! as string;

    // Find the marketplaceContactInformation
    const marketplaceContactInformation =
        await marketplacesContactsInformationQueries.findByIdQuery({
            filter: {
                _id: marketplaceContactInformationId,
            },
            select: '',
        });
    // This is the id of the owner of the marketplaceContactInformation
    const marketplaceContactInformationUserId =
        marketplaceContactInformation?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the marketplaceContactInformation
    if (marketplaceContactInformationUserId !== userId) {
        // If the user is not the owner of the marketplaceContactInformation, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message:
                'You are not the owner of this marketplaceContactInformation.',
        });
    }

    // If the user is the owner of the marketplaceContactInformation, continue
    next();
};

const marketplacesContactsInformationMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default marketplacesContactsInformationMiddleware;

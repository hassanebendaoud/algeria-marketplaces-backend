import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceContactInformationInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesContactsInformationQueries from '@queries/marketplaces.contactsInformation.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceContactInformationController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceContactInformation from the request body
        const marketplaceContactInformation: MarketplaceContactInformationInterface =
            req.body;

        let marketplaceIds = req.query.marketplaceId! as string[];
        marketplaceIds =
            typeof marketplaceIds === 'string'
                ? [marketplaceIds]
                : marketplaceIds;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceContactInformation: MarketplaceContactInformationInterface =
            {
                ...marketplaceContactInformation,
                User: userId,
            };

        if (marketplaceIds) {
            newMarketplaceContactInformation.Marketplaces = marketplaceIds;
        }

        const marketplaceContactInformationCreated =
            await marketplacesContactsInformationQueries.createQuery({
                data: newMarketplaceContactInformation,
            });

        // Update the user with the new contactin formation
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceContactsInformation:
                        marketplaceContactInformationCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace contact information created
        await marketplacesQueries.updateManyQuery({
            filter: {
                _id: { $in: marketplaceIds },
            },
            update: {
                $push: {
                    ContactsInformation:
                        marketplaceContactInformationCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace ContactInformation Created',
            data: marketplaceContactInformationCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceContactInformationController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceContactInformationId =
            req.query.marketplaceContactInformationId;

        const marketplaceContactInformationDeleted =
            await marketplacesContactsInformationQueries.deleteOneQuery({
                filter: { _id: marketplaceContactInformationId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { ContactsInformation: marketplaceContactInformationId },
            update: {
                $pull: { ContactsInformation: marketplaceContactInformationId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace ContactInformation Deleted',
            data: marketplaceContactInformationDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesContactsInformationController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesContactsInformationQueries.findAllQuery({
            filter: {},
            select: '',
            populate: {
                path: '',
            },
            paginationOptions: {
                page: options.page,
                size: options.size,
            },
            sort: {
                createdAt: -1,
            },
        });

        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'No Data' });
        }
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByIdMarketplaceContactInformationController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceContactInformationId = req.query
            .marketplaceContactInformationId! as string;
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
                message: 'Marketplace ContactInformation not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace ContactInformation found',
            data: marketplaceContactInformation,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceContactInformationController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceContactInformation: MarketplaceContactInformationInterface =
            req.body;
        const marketplaceContactInformationId = req.query
            .marketplaceContactInformationId! as string;

        const putContactInformation: MarketplaceContactInformationInterface = {
            ...marketplaceContactInformation,
        };

        const marketplaceContactInformationUpdated =
            await marketplacesContactsInformationQueries.findByIdAndUpdateQuery(
                {
                    _id: marketplaceContactInformationId,
                    update: putContactInformation,
                    options: {
                        upsert: false,
                        new: true,
                        runValidators: true,
                    },
                }
            );

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace ContactInformation Updated',
            data: marketplaceContactInformationUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesContactsInformationControllers = {
    createMarketplaceContactInformationController,
    deleteOneByIdMarketplaceContactInformationController,
    getAllMarketplacesContactsInformationController,
    getOneByIdMarketplaceContactInformationController,
    updateOneByIdMarketplaceContactInformationController,
};

export default marketplacesContactsInformationControllers;

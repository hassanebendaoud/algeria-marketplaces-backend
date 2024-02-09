import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceAddressInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesAddressesQueries from '@queries/marketplaces.addresses.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceAddressController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceAddress from the request body
        const marketplaceAddress: MarketplaceAddressInterface = req.body;

        let marketplaceIds = req.query.marketplaceId! as string[];
        marketplaceIds =
            typeof marketplaceIds === 'string'
                ? [marketplaceIds]
                : marketplaceIds;
        console.log('marketplaceId', marketplaceIds);

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplaceAddress: MarketplaceAddressInterface = {
            ...marketplaceAddress,
            User: userId,
        };

        if (marketplaceIds) {
            newMarketplaceAddress.Marketplaces = marketplaceIds;
        }

        const marketplaceAddressCreated =
            await marketplacesAddressesQueries.createQuery({
                data: newMarketplaceAddress,
            });

        // Update the user with the new address
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceAddresses: marketplaceAddressCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace address created
        await marketplacesQueries.updateManyQuery({
            filter: {
                _id: { $in: marketplaceIds },
            },
            update: {
                $push: {
                    Addresses: marketplaceAddressCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Address Created',
            data: marketplaceAddressCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceAddressController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceAddressId = req.query.marketplaceAddressId;

        const marketplaceAddressDeleted =
            await marketplacesAddressesQueries.deleteOneQuery({
                filter: { _id: marketplaceAddressId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Addresses: marketplaceAddressId },
            update: {
                $pull: { Addresses: marketplaceAddressId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Address Deleted',
            data: marketplaceAddressDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesAddressesController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesAddressesQueries.findAllQuery({
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

const getOneByIdMarketplaceAddressController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceAddressId = req.query.marketplaceAddressId! as string;
        const marketplaceAddress =
            await marketplacesAddressesQueries.findByIdQuery({
                filter: {
                    _id: marketplaceAddressId,
                },
                select: '',
            });

        if (!marketplaceAddress) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace Address not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Address found',
            data: marketplaceAddress,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceAddressController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceAddress: MarketplaceAddressInterface = req.body;
        const marketplaceAddressId = req.query.marketplaceAddressId! as string;

        const putAddress: MarketplaceAddressInterface = {
            ...marketplaceAddress,
        };

        const marketplaceAddressUpdated =
            await marketplacesAddressesQueries.findByIdAndUpdateQuery({
                _id: marketplaceAddressId,
                update: putAddress,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Address Updated',
            data: marketplaceAddressUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesAddressesControllers = {
    createMarketplaceAddressController,
    deleteOneByIdMarketplaceAddressController,
    getAllMarketplacesAddressesController,
    getOneByIdMarketplaceAddressController,
    updateOneByIdMarketplaceAddressController,
};

export default marketplacesAddressesControllers;

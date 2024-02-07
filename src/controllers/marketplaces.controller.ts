import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesQueries from '@queries/marketplaces.queries';
import usersQueries from '@queries/users.queries';

const createMarketplaceController = async (req: Request, res: Response) => {
    try {
        // Get the marketplace from the request body
        const marketplace: MarketplaceInterface = req.body;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newMarketplace: MarketplaceInterface = {
            ...marketplace,
            User: userId,
        };

        const marketplaceCreated = await marketplacesQueries.createQuery({
            data: newMarketplace,
        });

        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    Marketplaces: marketplaceCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Created',
            data: marketplaceCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceId = req.query.marketplaceId;

        const marketplaceDeleted = await marketplacesQueries.deleteOneQuery({
            filter: { _id: marketplaceId },
        });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Marketplaces: marketplaceId },
            update: {
                $pull: { Marketplaces: marketplaceId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace Deleted',
            data: marketplaceDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesQueries.findAllQuery({
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

const getOneByIdMarketplaceController = async (req: Request, res: Response) => {
    try {
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
                message: 'Marketplace not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace found',
            data: marketplace,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneBySlugMarketplaceController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceSlug = req.query.marketplaceSlug! as string;

        const marketplace = await marketplacesQueries.findOneQuery({
            filter: { slug: marketplaceSlug },
            select: '',
        });

        if (!marketplace) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace found',
            data: marketplace,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByUsernameMarketplaceController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceUsername = req.query.marketplaceUsername! as string;

        const marketplace = await marketplacesQueries.findOneQuery({
            filter: {
                username: marketplaceUsername,
            },
            select: '',
        });

        if (!marketplace) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Marketplace not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace found',
            data: marketplace,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplace: MarketplaceInterface = req.body;
        const marketplaceId = req.query.marketplaceId! as string;

        const putMarketplace: MarketplaceInterface = {
            ...marketplace,
        };

        const marketplaceUpdated =
            await marketplacesQueries.findByIdAndUpdateQuery({
                _id: marketplaceId,
                update: putMarketplace,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace Updated',
            data: marketplaceUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesControllers = {
    createMarketplaceController,
    deleteOneByIdMarketplaceController,
    getAllMarketplacesController,
    getOneByIdMarketplaceController,
    getOneBySlugMarketplaceController,
    getOneByUsernameMarketplaceController,
    updateOneByIdMarketplaceController,
};

export default marketplacesControllers;

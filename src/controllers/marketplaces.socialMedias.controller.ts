import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { MarketplaceSocialMediaInterface } from '@interfaces/marketplaces.interfaces';
import marketplacesSocialMediasQueries from '@queries/marketplaces.socialMedias.queries';
import usersQueries from '@queries/users.queries';
import marketplacesQueries from '@/queries/marketplaces.queries';

const createMarketplaceSocialMediaController = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the marketplaceSocialMedia from the request body
        const marketplaceSocialMedia: MarketplaceSocialMediaInterface =
            req.body;

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

        const newMarketplaceSocialMedia: MarketplaceSocialMediaInterface = {
            ...marketplaceSocialMedia,
            User: userId,
            Marketplaces: marketplaceIds,
        };

        if (marketplaceIds) {
            newMarketplaceSocialMedia.Marketplaces = marketplaceIds;
        }

        // Create the marketplace social media
        const marketplaceSocialMediaCreated =
            await marketplacesSocialMediasQueries.createQuery({
                data: newMarketplaceSocialMedia,
            });

        // Update the user with the new social media
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    MarketplaceSocialMedias: marketplaceSocialMediaCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the marketplace with the new marketplace social media created
        await marketplacesQueries.updateManyQuery({
            filter: {
                _id: { $in: marketplaceIds },
            },
            update: {
                $push: {
                    SocialMedias: marketplaceSocialMediaCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace SocialMedia Created',
            data: marketplaceSocialMediaCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdMarketplaceSocialMediaController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceSocialMediaId = req.query.marketplaceSocialMediaId;

        const marketplaceSocialMediaDeleted =
            await marketplacesSocialMediasQueries.deleteOneQuery({
                filter: { _id: marketplaceSocialMediaId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { SocialMedias: marketplaceSocialMediaId },
            update: {
                $pull: { SocialMedias: marketplaceSocialMediaId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace SocialMedia Deleted',
            data: marketplaceSocialMediaDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllMarketplacesSocialMediasController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await marketplacesSocialMediasQueries.findAllQuery({
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

const getOneByIdMarketplaceSocialMediaController = async (
    req: Request,
    res: Response
) => {
    try {
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
                message: 'Marketplace SocialMedia not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Marketplace SocialMedia found',
            data: marketplaceSocialMedia,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdMarketplaceSocialMediaController = async (
    req: Request,
    res: Response
) => {
    try {
        const marketplaceSocialMedia: MarketplaceSocialMediaInterface =
            req.body;
        const marketplaceSocialMediaId = req.query
            .marketplaceSocialMediaId! as string;

        const putSocialMedia: MarketplaceSocialMediaInterface = {
            ...marketplaceSocialMedia,
        };

        const marketplaceSocialMediaUpdated =
            await marketplacesSocialMediasQueries.findByIdAndUpdateQuery({
                _id: marketplaceSocialMediaId,
                update: putSocialMedia,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Marketplace SocialMedia Updated',
            data: marketplaceSocialMediaUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const marketplacesSocialMediasControllers = {
    createMarketplaceSocialMediaController,
    deleteOneByIdMarketplaceSocialMediaController,
    getAllMarketplacesSocialMediasController,
    getOneByIdMarketplaceSocialMediaController,
    updateOneByIdMarketplaceSocialMediaController,
};

export default marketplacesSocialMediasControllers;

import { Request, Response } from 'express';

import utils from '@/utils';
import { MarketplaceInterface } from '@interfaces/index';
import { marketplacesQueries, usersQueries } from '@queries/index';

const createMarketplaceController = async (req: Request, res: Response) => {
    try {
        const marketplace: MarketplaceInterface = req.body;
        const User = marketplace.User! as string;

        const newMarketplace: MarketplaceInterface = {
            ...marketplace,
        };

        const marketplaceCreated = await marketplacesQueries.createQuery({
            data: newMarketplace,
        });

        await usersQueries.findByIdAndUpdateQuery({
            _id: User,
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

export default createMarketplaceController;

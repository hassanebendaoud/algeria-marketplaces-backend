import { Request, Response } from 'express';

import { ExpressUser } from '@/types/ExpressUser';
import utils from '@/utils';
import { MarketplaceInterface } from '@interfaces/index';
import { marketplacesQueries, usersQueries } from '@queries/index';

const createMarketplaceController = async (req: Request, res: Response) => {
    try {
        // Get the marketplace from the request body
        const marketplace: MarketplaceInterface = req.body;

        // This is the user that is logged in
        const user = req.user! as ExpressUser;

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

export default createMarketplaceController;

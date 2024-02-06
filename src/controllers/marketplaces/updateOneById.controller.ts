import { Request, Response } from 'express';

import utils from '@/utils';
import { MarketplaceInterface } from '@interfaces/index';
import { marketplacesQueries } from '@queries/index';

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

export default updateOneByIdMarketplaceController;

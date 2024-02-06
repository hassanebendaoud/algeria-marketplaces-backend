import { Request, Response } from 'express';

import utils from '@/utils';
import { marketplacesQueries, usersQueries } from '@queries/index';

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

export default deleteOneByIdMarketplaceController;

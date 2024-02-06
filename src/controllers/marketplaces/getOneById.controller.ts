import { Request, Response } from 'express';

import utils from '@/utils';
import { marketplacesQueries } from '@queries/index';

const getOneByIdController = async (req: Request, res: Response) => {
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

export default getOneByIdController;

import { Request, Response } from 'express';

import utils from '@/utils';
import { productsQueries } from '@queries/index';

const getOneBySlugProductController = async (req: Request, res: Response) => {
    try {
        const productSlug = req.query.productSlug! as string;

        const product = await productsQueries.findOneQuery({
            filter: { slug: productSlug },
            select: '',
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product found',
            data: product,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

export default getOneBySlugProductController;

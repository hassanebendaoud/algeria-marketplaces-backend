import { NextFunction, Request, Response } from 'express';

import { productsQueries } from '@/queries';

const isSlugExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productSlug = req.body.slug! as string;

    const product = await productsQueries.findOneQuery({
        filter: {
            slug: productSlug,
        },
        select: '',
    });

    if (product) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product with Slug: ${productSlug} already exists.`,
        });
    }

    return next();
};

export default isSlugExists;

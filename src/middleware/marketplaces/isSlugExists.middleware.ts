import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@/queries';

const isSlugExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const marketplaceSlug = req.body.slug! as string;

    const marketplace = await marketplacesQueries.findOneQuery({
        filter: {
            slug: marketplaceSlug,
        },
        select: '',
    });

    if (marketplace) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace with Slug: ${marketplaceSlug} already exists.`,
        });
    }

    return next();
};

export default isSlugExists;

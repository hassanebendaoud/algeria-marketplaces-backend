import { NextFunction, Request, Response } from 'express';

import { marketplacesQueries } from '@/queries';

const isUsernameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const marketplaceUsername = req.body.username! as string;

    const marketplace = await marketplacesQueries.findOneQuery({
        filter: { username: marketplaceUsername },
        select: '',
    });

    if (marketplace) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Marketplace with Username: ${marketplaceUsername} already exists.`,
        });
    }

    return next();
};

export default isUsernameExists;

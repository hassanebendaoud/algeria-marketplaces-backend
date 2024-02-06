import { NextFunction, Request, Response } from 'express';

import { productsQueries } from '@/queries';

const isUsernameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productUsername = req.body.username! as string;

    const product = await productsQueries.findOneQuery({
        filter: { username: productUsername },
        select: '',
    });

    if (product) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product with Username: ${productUsername} already exists.`,
        });
    }

    return next();
};

export default isUsernameExists;

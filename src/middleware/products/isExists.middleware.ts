import { NextFunction, Request, Response } from 'express';

import { productsQueries } from '@queries/index';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId! as string;

    const product = await productsQueries.findByIdQuery({
        filter: {
            _id: productId,
        },
        select: '',
    });

    if (!product) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product not found with ID: ${productId}`,
        });
    }

    return next();
};

export default isExists;

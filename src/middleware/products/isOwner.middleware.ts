import { NextFunction, Request, Response } from 'express';

import { productsQueries } from '@/queries';
import { ExpressUser } from '@/types/ExpressUser';

const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productId from the request query
    const productId = req.query.productId! as string;

    // Find the product
    const product = await productsQueries.findByIdQuery({
        filter: {
            _id: productId,
        },
        select: '',
    });

    // This is the id of the owner of the product
    const productUserId = product?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUser;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the product
    if (productUserId !== userId) {
        // If the user is not the owner of the product, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this product.',
        });
    }

    // If the user is the owner of the product, continue
    next();
};

export default isOwner;

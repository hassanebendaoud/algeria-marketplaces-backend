import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsLikesQueries from '@/queries/products.likes.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productLikeId = req.query.productLikeId! as string;

    const productLike = await productsLikesQueries.findByIdQuery({
        filter: {
            _id: productLikeId,
        },
        select: '',
    });

    if (!productLike) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product like not found with ID: ${productLikeId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productLikeId = req.query.productLikeId! as string;

    if (!ObjectId.isValid(productLikeId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productLikeId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productLikeId from the request query
    const productLikeId = req.query.productLikeId! as string;
    // Find the productLike
    const productLike = await productsLikesQueries.findByIdQuery({
        filter: {
            _id: productLikeId,
        },
        select: '',
    });
    // This is the id of the owner of the productLike
    const productLikeUserId = productLike?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the productLike
    if (productLikeUserId !== userId) {
        // If the user is not the owner of the productLike, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this productLike.',
        });
    }

    // If the user is the owner of the productLike, continue
    next();
};

const productsLikesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default productsLikesMiddleware;

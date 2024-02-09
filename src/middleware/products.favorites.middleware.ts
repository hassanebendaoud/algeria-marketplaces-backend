import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsFavoritesQueries from '@/queries/products.favorites.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productFavoriteId = req.query.productFavoriteId! as string;

    const productFavorite = await productsFavoritesQueries.findByIdQuery({
        filter: {
            _id: productFavoriteId,
        },
        select: '',
    });

    if (!productFavorite) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product favorite not found with ID: ${productFavoriteId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productFavoriteId = req.query.productFavoriteId! as string;

    if (!ObjectId.isValid(productFavoriteId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productFavoriteId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productFavoriteId from the request query
    const productFavoriteId = req.query.productFavoriteId! as string;
    // Find the productFavorite
    const productFavorite = await productsFavoritesQueries.findByIdQuery({
        filter: {
            _id: productFavoriteId,
        },
        select: '',
    });
    // This is the id of the owner of the productFavorite
    const productFavoriteUserId = productFavorite?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the productFavorite
    if (productFavoriteUserId !== userId) {
        // If the user is not the owner of the productFavorite, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this productFavorite.',
        });
    }

    // If the user is the owner of the productFavorite, continue
    next();
};

const productsFavoritesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default productsFavoritesMiddleware;

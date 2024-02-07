import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsQueries from '@/queries/products.queries';
import { ExpressUserType } from '@/types/express.types';

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

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId! as string;

    if (!ObjectId.isValid(productId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productId}`,
        });
    }

    return next();
};

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
    const user = req.user! as ExpressUserType;

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

const productsMiddleware = {
    isExists,
    isIdValid,
    isOwner,
    isUsernameExists,
    isSlugExists,
};

export default productsMiddleware;

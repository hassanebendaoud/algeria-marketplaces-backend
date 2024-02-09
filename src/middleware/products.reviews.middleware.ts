import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsReviewsQueries from '@/queries/products.reviews.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productReviewId = req.query.productReviewId! as string;

    const productReview = await productsReviewsQueries.findByIdQuery({
        filter: {
            _id: productReviewId,
        },
        select: '',
    });

    if (!productReview) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product review not found with ID: ${productReviewId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productReviewId = req.query.productReviewId! as string;

    if (!ObjectId.isValid(productReviewId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productReviewId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productReviewId from the request query
    const productReviewId = req.query.productReviewId! as string;
    // Find the productReview
    const productReview = await productsReviewsQueries.findByIdQuery({
        filter: {
            _id: productReviewId,
        },
        select: '',
    });
    // This is the id of the owner of the productReview
    const productReviewUserId = productReview?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the productReview
    if (productReviewUserId !== userId) {
        // If the user is not the owner of the productReview, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this productReview.',
        });
    }

    // If the user is the owner of the productReview, continue
    next();
};

const productsReviewsMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default productsReviewsMiddleware;

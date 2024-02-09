import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsCommentsQueries from '@/queries/products.comments.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productCommentId = req.query.productCommentId! as string;

    const productComment = await productsCommentsQueries.findByIdQuery({
        filter: {
            _id: productCommentId,
        },
        select: '',
    });

    if (!productComment) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product comment not found with ID: ${productCommentId}`,
        });
    }

    return next();
};

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productCommentId = req.query.productCommentId! as string;

    if (!ObjectId.isValid(productCommentId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productCommentId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productCommentId from the request query
    const productCommentId = req.query.productCommentId! as string;
    // Find the productComment
    const productComment = await productsCommentsQueries.findByIdQuery({
        filter: {
            _id: productCommentId,
        },
        select: '',
    });
    // This is the id of the owner of the productComment
    const productCommentUserId = productComment?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the productComment
    if (productCommentUserId !== userId) {
        // If the user is not the owner of the productComment, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this productComment.',
        });
    }

    // If the user is the owner of the productComment, continue
    next();
};

const productsCommentsMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default productsCommentsMiddleware;

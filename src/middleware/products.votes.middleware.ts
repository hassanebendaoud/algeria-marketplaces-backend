import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import productsVotesQueries from '@/queries/products.votes.queries';
import { ExpressUserType } from '@/types/express.types';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const productVoteId = req.query.productVoteId! as string;

    const productVote = await productsVotesQueries.findByIdQuery({
        filter: {
            _id: productVoteId,
        },
        select: '',
    });

    if (!productVote) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product vote not found with ID: ${productVoteId}`,
        });
    }

    return next();
};
const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productVoteId = req.query.productVoteId! as string;

    if (!ObjectId.isValid(productVoteId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productVoteId}`,
        });
    }

    return next();
};
const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    // Get the productVoteId from the request query
    const productVoteId = req.query.productVoteId! as string;
    // Find the productVote
    const productVote = await productsVotesQueries.findByIdQuery({
        filter: {
            _id: productVoteId,
        },
        select: '',
    });
    // This is the id of the owner of the productVote
    const productVoteUserId = productVote?.User.toString() as string;

    // This is the user that is logged in
    const user = req.user! as ExpressUserType;

    // This is the id of the user that is logged in
    const userId = user._id.toString() as string;

    // Check if the user is the owner of the productVote
    if (productVoteUserId !== userId) {
        // If the user is not the owner of the productVote, return an error
        return res.status(401).json({
            success: false,
            status: 'error',
            message: 'You are not the owner of this productVote.',
        });
    }

    // If the user is the owner of the productVote, continue
    next();
};

const productsVotesMiddleware = {
    isExists,
    isIdValid,
    isOwner,
};

export default productsVotesMiddleware;

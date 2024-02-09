import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductVoteInterface } from '@interfaces/products.interfaces';
import productsVotesQueries from '@queries/products.votes.queries';
import usersQueries from '@queries/users.queries';
import productsQueries from '@/queries/products.queries';

const createProductVoteController = async (req: Request, res: Response) => {
    try {
        // Get the productVote from the request body
        const productVote: ProductVoteInterface = req.body;
        const productId = req.query.productId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newProductVote: ProductVoteInterface = {
            ...productVote,
            User: userId,
        };

        if (productId) {
            newProductVote.Product = productId;
        }

        const productVoteCreated = await productsVotesQueries.createQuery({
            data: newProductVote,
        });

        // Update the user with the new vote
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    ProductVotes: productVoteCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the product with the new product vote created
        await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: {
                $push: {
                    Votes: productVoteCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Vote Created',
            data: productVoteCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductVoteController = async (
    req: Request,
    res: Response
) => {
    try {
        const productVoteId = req.query.productVoteId;

        const productVoteDeleted = await productsVotesQueries.deleteOneQuery({
            filter: { _id: productVoteId },
        });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Votes: productVoteId },
            update: {
                $pull: { Votes: productVoteId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Vote Deleted',
            data: productVoteDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsVotesController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsVotesQueries.findAllQuery({
            filter: {},
            select: '',
            populate: {
                path: '',
            },
            paginationOptions: {
                page: options.page,
                size: options.size,
            },
            sort: {
                createdAt: -1,
            },
        });

        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'No Data' });
        }
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByIdProductVoteController = async (req: Request, res: Response) => {
    try {
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
                message: 'Product Vote not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Vote found',
            data: productVote,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductVoteController = async (
    req: Request,
    res: Response
) => {
    try {
        const productVote: ProductVoteInterface = req.body;
        const productVoteId = req.query.productVoteId! as string;

        const putVote: ProductVoteInterface = {
            ...productVote,
        };

        const productVoteUpdated =
            await productsVotesQueries.findByIdAndUpdateQuery({
                _id: productVoteId,
                update: putVote,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Vote Updated',
            data: productVoteUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsVotesControllers = {
    createProductVoteController,
    deleteOneByIdProductVoteController,
    getAllProductsVotesController,
    getOneByIdProductVoteController,
    updateOneByIdProductVoteController,
};

export default productsVotesControllers;

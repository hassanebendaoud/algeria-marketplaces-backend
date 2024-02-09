import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductCommentInterface } from '@interfaces/products.interfaces';
import productsCommentsQueries from '@queries/products.comments.queries';
import usersQueries from '@queries/users.queries';
import productsQueries from '@/queries/products.queries';

const createProductCommentController = async (req: Request, res: Response) => {
    try {
        // Get the productComment from the request body
        const productComment: ProductCommentInterface = req.body;
        const productId = req.query.productId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newProductComment: ProductCommentInterface = {
            ...productComment,
            User: userId,
        };

        if (productId) {
            newProductComment.Product = productId;
        }

        const productCommentCreated = await productsCommentsQueries.createQuery(
            {
                data: newProductComment,
            }
        );

        // Update the user with the new comment
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    ProductComments: productCommentCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the product with the new product comment created
        await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: {
                $push: {
                    Comments: productCommentCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Comment Created',
            data: productCommentCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        const productCommentId = req.query.productCommentId;

        const productCommentDeleted =
            await productsCommentsQueries.deleteOneQuery({
                filter: { _id: productCommentId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Comments: productCommentId },
            update: {
                $pull: { Comments: productCommentId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Comment Deleted',
            data: productCommentDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsCommentsController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsCommentsQueries.findAllQuery({
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

const getOneByIdProductCommentController = async (
    req: Request,
    res: Response
) => {
    try {
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
                message: 'Product Comment not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Comment found',
            data: productComment,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductCommentController = async (
    req: Request,
    res: Response
) => {
    try {
        const productComment: ProductCommentInterface = req.body;
        const productCommentId = req.query.productCommentId! as string;

        const putComment: ProductCommentInterface = {
            ...productComment,
        };

        const productCommentUpdated =
            await productsCommentsQueries.findByIdAndUpdateQuery({
                _id: productCommentId,
                update: putComment,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Comment Updated',
            data: productCommentUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsCommentsControllers = {
    createProductCommentController,
    deleteOneByIdProductCommentController,
    getAllProductsCommentsController,
    getOneByIdProductCommentController,
    updateOneByIdProductCommentController,
};

export default productsCommentsControllers;

import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductReviewInterface } from '@interfaces/products.interfaces';
import productsReviewsQueries from '@queries/products.reviews.queries';
import usersQueries from '@queries/users.queries';
import productsQueries from '@/queries/products.queries';

const createProductReviewController = async (req: Request, res: Response) => {
    try {
        // Get the productReview from the request body
        const productReview: ProductReviewInterface = req.body;
        const productId = req.query.productId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newProductReview: ProductReviewInterface = {
            ...productReview,
            User: userId,
        };

        if (productId) {
            newProductReview.Product = productId;
        }

        const productReviewCreated = await productsReviewsQueries.createQuery({
            data: newProductReview,
        });

        // Update the user with the new review
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    ProductReviews: productReviewCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the product with the new product review created
        await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: {
                $push: {
                    Reviews: productReviewCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Review Created',
            data: productReviewCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        const productReviewId = req.query.productReviewId;

        const productReviewDeleted =
            await productsReviewsQueries.deleteOneQuery({
                filter: { _id: productReviewId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Reviews: productReviewId },
            update: {
                $pull: { Reviews: productReviewId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Review Deleted',
            data: productReviewDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsReviewsController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsReviewsQueries.findAllQuery({
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

const getOneByIdProductReviewController = async (
    req: Request,
    res: Response
) => {
    try {
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
                message: 'Product Review not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Review found',
            data: productReview,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductReviewController = async (
    req: Request,
    res: Response
) => {
    try {
        const productReview: ProductReviewInterface = req.body;
        const productReviewId = req.query.productReviewId! as string;

        const putReview: ProductReviewInterface = {
            ...productReview,
        };

        const productReviewUpdated =
            await productsReviewsQueries.findByIdAndUpdateQuery({
                _id: productReviewId,
                update: putReview,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Review Updated',
            data: productReviewUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsReviewsControllers = {
    createProductReviewController,
    deleteOneByIdProductReviewController,
    getAllProductsReviewsController,
    getOneByIdProductReviewController,
    updateOneByIdProductReviewController,
};

export default productsReviewsControllers;

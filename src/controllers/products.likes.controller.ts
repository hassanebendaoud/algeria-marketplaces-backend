import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductLikeInterface } from '@interfaces/products.interfaces';
import productsLikesQueries from '@queries/products.likes.queries';
import usersQueries from '@queries/users.queries';
import productsQueries from '@/queries/products.queries';

const createProductLikeController = async (req: Request, res: Response) => {
    try {
        // Get the productLike from the request body
        const productLike: ProductLikeInterface = req.body;
        const productId = req.query.productId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newProductLike: ProductLikeInterface = {
            ...productLike,
            User: userId,
        };

        if (productId) {
            newProductLike.Product = productId;
        }

        const productLikeCreated = await productsLikesQueries.createQuery({
            data: newProductLike,
        });

        // Update the user with the new like
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    ProductLikes: productLikeCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the product with the new product like created
        await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: {
                $push: {
                    Likes: productLikeCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Like Created',
            data: productLikeCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductLikeController = async (
    req: Request,
    res: Response
) => {
    try {
        const productLikeId = req.query.productLikeId;

        const productLikeDeleted = await productsLikesQueries.deleteOneQuery({
            filter: { _id: productLikeId },
        });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Likes: productLikeId },
            update: {
                $pull: { Likes: productLikeId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Like Deleted',
            data: productLikeDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsLikesController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsLikesQueries.findAllQuery({
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

const getOneByIdProductLikeController = async (req: Request, res: Response) => {
    try {
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
                message: 'Product Like not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Like found',
            data: productLike,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductLikeController = async (
    req: Request,
    res: Response
) => {
    try {
        const productLike: ProductLikeInterface = req.body;
        const productLikeId = req.query.productLikeId! as string;

        const putLike: ProductLikeInterface = {
            ...productLike,
        };

        const productLikeUpdated =
            await productsLikesQueries.findByIdAndUpdateQuery({
                _id: productLikeId,
                update: putLike,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Like Updated',
            data: productLikeUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsLikesControllers = {
    createProductLikeController,
    deleteOneByIdProductLikeController,
    getAllProductsLikesController,
    getOneByIdProductLikeController,
    updateOneByIdProductLikeController,
};

export default productsLikesControllers;

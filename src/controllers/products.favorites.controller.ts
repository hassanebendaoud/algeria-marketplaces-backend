import { Request, Response } from 'express';

import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductFavoriteInterface } from '@interfaces/products.interfaces';
import productsFavoritesQueries from '@queries/products.favorites.queries';
import usersQueries from '@queries/users.queries';
import productsQueries from '@/queries/products.queries';

const createProductFavoriteController = async (req: Request, res: Response) => {
    try {
        // Get the productFavorite from the request body
        const productFavorite: ProductFavoriteInterface = req.body;
        const productId = req.query.productId! as string;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        const newProductFavorite: ProductFavoriteInterface = {
            ...productFavorite,
            User: userId,
        };

        if (productId) {
            newProductFavorite.Product = productId;
        }

        const productFavoriteCreated =
            await productsFavoritesQueries.createQuery({
                data: newProductFavorite,
            });

        // Update the user with the new favorite
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    ProductFavorites: productFavoriteCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // update the product with the new product favorite created
        await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: {
                $push: {
                    Favorites: productFavoriteCreated._id,
                },
            },
            options: {
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Favorite Created',
            data: productFavoriteCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        const productFavoriteId = req.query.productFavoriteId;

        const productFavoriteDeleted =
            await productsFavoritesQueries.deleteOneQuery({
                filter: { _id: productFavoriteId },
            });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Favorites: productFavoriteId },
            update: {
                $pull: { Favorites: productFavoriteId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Favorite Deleted',
            data: productFavoriteDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsFavoritesController = async (
    req: Request,
    res: Response
) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsFavoritesQueries.findAllQuery({
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

const getOneByIdProductFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
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
                message: 'Product Favorite not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Favorite found',
            data: productFavorite,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductFavoriteController = async (
    req: Request,
    res: Response
) => {
    try {
        const productFavorite: ProductFavoriteInterface = req.body;
        const productFavoriteId = req.query.productFavoriteId! as string;

        const putFavorite: ProductFavoriteInterface = {
            ...productFavorite,
        };

        const productFavoriteUpdated =
            await productsFavoritesQueries.findByIdAndUpdateQuery({
                _id: productFavoriteId,
                update: putFavorite,
                options: {
                    upsert: false,
                    new: true,
                    runValidators: true,
                },
            });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Favorite Updated',
            data: productFavoriteUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsFavoritesControllers = {
    createProductFavoriteController,
    deleteOneByIdProductFavoriteController,
    getAllProductsFavoritesController,
    getOneByIdProductFavoriteController,
    updateOneByIdProductFavoriteController,
};

export default productsFavoritesControllers;

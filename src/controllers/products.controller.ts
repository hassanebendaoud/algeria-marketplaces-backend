import { Request, Response } from 'express';

import marketplacesQueries from '@/queries/marketplaces.queries';
import productsQueries from '@/queries/products.queries';
import usersQueries from '@/queries/users.queries';
import { ExpressUserType } from '@/types/express.types';
import utils from '@/utils';
import { ProductInterface } from '@interfaces/products.interfaces';

const createProductController = async (req: Request, res: Response) => {
    try {
        // Get the product from the request body
        const product: ProductInterface = req.body;

        // This is the user that is logged in
        const user = req.user! as ExpressUserType;

        // This is the id of the user that is logged in
        const userId = user._id.toString() as string;

        // The new product that will be created
        const newProduct: ProductInterface = {
            ...product,
            User: userId,
        };

        // Create the product and get the created product
        const productCreated = await productsQueries.createQuery({
            data: newProduct,
        });

        // Update the user with the new product
        await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: {
                $push: {
                    Products: productCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        // Update the marketplace with the new product
        await marketplacesQueries.findByIdAndUpdateQuery({
            _id: productCreated.Marketplace as string,
            update: {
                $push: {
                    Products: productCreated._id,
                },
            },
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Created',
            data: productCreated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const deleteOneByIdProductController = async (req: Request, res: Response) => {
    try {
        // Get the product id from the request query
        const productId = req.query.productId;

        // Delete the product from the database and get information about the deleted product
        const productDeleted = await productsQueries.deleteOneQuery({
            filter: { _id: productId },
        });

        // Remove the product from the user's products array
        await usersQueries.findOneAndUpdateQuery({
            filter: { Products: productId },
            update: {
                $pull: { Products: productId },
            },
            options: {},
        });

        // Remove the product from the marketplace products array
        await marketplacesQueries.findOneAndUpdateQuery({
            filter: { Products: productId },
            update: {
                $pull: { Products: productId },
            },
            options: {},
        });

        // Return the information about the deleted product
        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product Deleted',
            data: productDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getAllProductsController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await productsQueries.findAllQuery({
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

const getOneByIdProductController = async (req: Request, res: Response) => {
    try {
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
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product found',
            data: product,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneBySlugProductController = async (req: Request, res: Response) => {
    try {
        const productSlug = req.query.productSlug! as string;

        const product = await productsQueries.findOneQuery({
            filter: { slug: productSlug },
            select: '',
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product found',
            data: product,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByUsernameProductController = async (
    req: Request,
    res: Response
) => {
    try {
        const productUsername = req.query.productUsername! as string;

        const product = await productsQueries.findOneQuery({
            filter: {
                username: productUsername,
            },
            select: '',
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product found',
            data: product,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const updateOneByIdProductController = async (req: Request, res: Response) => {
    try {
        const product: ProductInterface = req.body;
        const productId = req.query.productId! as string;

        const putProduct: ProductInterface = {
            ...product,
        };

        const productUpdated = await productsQueries.findByIdAndUpdateQuery({
            _id: productId,
            update: putProduct,
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product Updated',
            data: productUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const productsControllers = {
    createProductController,
    deleteOneByIdProductController,
    getAllProductsController,
    getOneByIdProductController,
    getOneBySlugProductController,
    getOneByUsernameProductController,
    updateOneByIdProductController,
};

export default productsControllers;

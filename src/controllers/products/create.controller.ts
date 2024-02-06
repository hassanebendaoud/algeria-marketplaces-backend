import { Request, Response } from 'express';

import { ExpressUser } from '@/types/ExpressUser';
import utils from '@/utils';
import { ProductInterface } from '@interfaces/index';
import { marketplacesQueries, productsQueries, usersQueries } from '@queries/index';

const createProductController = async (req: Request, res: Response) => {
    try {
        // Get the product from the request body
        const product: ProductInterface = req.body;

        // This is the user that is logged in
        const user = req.user! as ExpressUser;

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

export default createProductController;

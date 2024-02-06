import { Request, Response } from 'express';

import utils from '@/utils';
import { marketplacesQueries, productsQueries, usersQueries } from '@queries/index';

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

export default deleteOneByIdProductController;

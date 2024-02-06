import { Request, Response } from 'express';

import utils from '@/utils';
import { ProductInterface } from '@interfaces/index';
import { productsQueries } from '@queries/index';

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

export default updateOneByIdProductController;

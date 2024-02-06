import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId! as string;

    if (!ObjectId.isValid(productId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `Product ID is not valid: ${productId}`,
        });
    }

    return next();
};

export default isIdValid;

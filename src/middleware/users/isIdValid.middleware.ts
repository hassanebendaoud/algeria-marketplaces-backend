import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.userId! as string;

    if (!ObjectId.isValid(userId)) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `User ID is not valid: ${userId}`,
        });
    }

    return next();
};

export default isIdValid;

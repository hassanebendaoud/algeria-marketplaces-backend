import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

import usersQueries from '@/queries/users.queries';

const isExists = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.userId! as string;

    const user = await usersQueries.findByIdQuery({
        filter: {
            _id: userId,
        },
        select: '',
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `User not found with ID: ${userId}`,
        });
    }

    return next();
};

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

const isUsernameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userUsername = req.body.username! as string;

    const user = await usersQueries.findOneQuery({
        filter: { username: userUsername },
        select: '',
    });

    if (user) {
        return res.status(404).json({
            success: false,
            status: 'error',
            message: `User with Username: ${userUsername} already exists.`,
        });
    }

    return next();
};

const usersMiddleware = {
    isExists,
    isIdValid,
    isUsernameExists,
};

export default usersMiddleware;

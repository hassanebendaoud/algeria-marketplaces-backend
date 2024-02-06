import { NextFunction, Request, Response } from 'express';

import { usersQueries } from '@queries/index';

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

export default isExists;

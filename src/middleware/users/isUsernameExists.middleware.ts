import { NextFunction, Request, Response } from 'express';

import { usersQueries } from '@/queries';

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

export default isUsernameExists;

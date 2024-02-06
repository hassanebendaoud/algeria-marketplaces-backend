import { Request, Response } from 'express';

import utils from '@/utils';
import { UserInterface } from '@interfaces/index';
import { usersQueries } from '@queries/index';

const updateOneByIdUserController = async (req: Request, res: Response) => {
    try {
        const user: UserInterface = req.body;
        const userId = req.query.userId! as string;

        const putUser: UserInterface = {
            ...user,
        };

        const userUpdated = await usersQueries.findByIdAndUpdateQuery({
            _id: userId,
            update: putUser,
            options: {
                upsert: false,
                new: true,
                runValidators: true,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'success',
            message: 'User Updated',
            data: userUpdated,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

export default updateOneByIdUserController;

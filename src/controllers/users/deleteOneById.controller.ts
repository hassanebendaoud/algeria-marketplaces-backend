import { Request, Response } from 'express';

import utils from '@/utils';
import { usersQueries } from '@queries/index';

const deleteOneByIdUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;

        const userDeleted = await usersQueries.deleteOneQuery({
            filter: { _id: userId },
        });

        await usersQueries.findOneAndUpdateQuery({
            filter: { Users: userId },
            update: {
                $pull: { Users: userId },
            },
            options: {},
        });

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'User Deleted',
            data: userDeleted,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

export default deleteOneByIdUserController;

import { Request, Response } from 'express';

import utils from '@/utils';
import { usersQueries } from '@queries/index';

const getOneByIdController = async (req: Request, res: Response) => {
    try {
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
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'success',
            message: 'User found',
            data: user,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

export default getOneByIdController;

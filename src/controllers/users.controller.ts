import { Request, Response } from 'express';

import { UserModel } from '@/models';
import utils from '@/utils';
import { UserInterface } from '@interfaces/users.interface';
import usersQueries from '@queries/users.queries';

const createUserController = async (req: Request, res: Response) => {
    const { password } = req.body;

    const saltHash = utils.generatePassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new UserModel({
        ...req.body,
        hash,
        salt,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            data: savedUser,
        });
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

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

const getAllUsersController = async (req: Request, res: Response) => {
    const { page, size } = req.query;

    const options = {
        page: parseInt(page as string),
        size: parseInt(size as string),
    };

    try {
        const data = await usersQueries.findAllQuery({
            filter: {},
            select: '',
            populate: {
                path: '',
            },
            paginationOptions: {
                page: options.page,
                size: options.size,
            },
            sort: {
                createdAt: -1,
            },
        });

        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'No Data' });
        }
    } catch (error: unknown) {
        utils.handleCatchErrorResponse(error, res);
    }
};

const getOneByIdUserController = async (req: Request, res: Response) => {
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

const getOneBySlugUserController = async (req: Request, res: Response) => {
    try {
        const userSlug = req.query.userSlug! as string;

        const user = await usersQueries.findOneQuery({
            filter: { slug: userSlug },
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

const getOneByUsernameUserController = async (req: Request, res: Response) => {
    try {
        const userUsername = req.query.userUsername! as string;

        const user = await usersQueries.findOneQuery({
            filter: {
                username: userUsername,
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

const usersController = {
    createUserController,
    deleteOneByIdUserController,
    getAllUsersController,
    getOneByIdUserController,
    getOneBySlugUserController,
    getOneByUsernameUserController,
    updateOneByIdUserController,
};

export default usersController;

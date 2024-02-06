import { Request, Response } from 'express';

import { UserModel } from '@/models';
import utils from '@/utils';

const register = async (req: Request, res: Response) => {
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

export default register;

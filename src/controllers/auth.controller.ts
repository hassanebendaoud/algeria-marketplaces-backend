import { NextFunction, Request, Response } from 'express';
import cookie from 'cookie';
import { UserModel } from '@/models';
import utils from '@/utils';
import ms from 'ms';

const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;
    try {
        const authUser = await UserModel.findOne({ username }).select(
            '+hash +salt'
        );
        if (!authUser) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid Credentials' });
        }
        const isValid = utils.validPassword(
            password,
            authUser.hash,
            authUser.salt
        );
        if (isValid) {
            const tokenObject = utils.issueJWT({
                _id: authUser._id,
            });

            const data = {
                id: authUser._id,
                username: authUser.username,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                name: `${authUser.firstName} ${authUser.lastName}`,
            };

            const responseObj = {
                success: true,
                data,
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
            };

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('user-token', tokenObject.token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: ms(tokenObject.expires),
                    path: '/',
                })
            );

            return res.status(200).json(responseObj);
        } else {
            res.status(401).json({
                success: false,
                message: 'You entered the wrong password',
            });
        }
    } catch (error) {
        next(error);
    }
};

const protectController = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'You accessed the protect route!',
    });
};

const meController = async (req: Request, res: Response) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        data: user,
    });
};

const registerController = async (req: Request, res: Response) => {
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

const logoutController = async (req: Request, res: Response) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('user-token', '', {
            httpOnly: true,
            secure: false,
            maxAge: -1,
            path: '/',
        })
    );

    res.status(200).json({
        success: true,
        message: 'You have successfully signed out!',
    });
};

const authController = {
    loginController,
    registerController,
    protectController,
    meController,
    logoutController,
};

export default authController;

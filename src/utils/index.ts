import crypto from 'crypto';
import { Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';

import { MarketplaceInterface } from '@/interfaces/marketplaces.interfaces';
import { ProductInterface } from '@/interfaces/products.interfaces';
import { keysConfig } from '@config/index';

const checkKeyPairExist = () => {
    // Path to the public key file
    const publicKeyPath = keysConfig.publicKeyPath;

    // Path to the private key file
    const privateKeyPath = keysConfig.privateKeyPath;

    try {
        // Check if the public key exists
        if (!fs.existsSync(publicKeyPath)) {
            throw new Error('Public key pair not found');
        } else {
            console.log(`Public key is found at ${publicKeyPath}`);
        }

        // Check if the private key exists
        if (!fs.existsSync(privateKeyPath)) {
            throw new Error('Private key pair not found');
        } else {
            console.log(`Private key is found at ${privateKeyPath}`);
        }
    } catch (error: unknown) {
        utils.handleCatchError(error);
    }
};

const createUniqueSlug = async (
    model: Model<MarketplaceInterface> | Model<ProductInterface>,
    value: string
) => {
    let slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const count = await model.countDocuments({
        slug: new RegExp('^' + slug + '(-[0-9]*)?$', 'i'),
    });
    if (count > 0) {
        slug = slug + '-' + count;
    }
    return slug;
};

const generateKeyPair = () => {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standards 1
            format: 'pem', // Privacy Enhanced Mail
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standards 1
            format: 'pem', // Privacy Enhanced Mail
        },
    });

    // Path to the public key file
    const publicKeyPath = keysConfig.publicKeyPath;
    // Create the public key file
    fs.writeFileSync(publicKeyPath, keyPair.publicKey);
    console.log(`Public key is saved to ${publicKeyPath}`);

    // Path to the private key file
    const privateKeyPath = keysConfig.privateKeyPath;
    // Create the private key file
    fs.writeFileSync(privateKeyPath, keyPair.privateKey);
    console.log(`Private key is saved to ${privateKeyPath}`);
};

const generatePassword = (password: string) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return { salt, hash: genHash };
};

const handleCatchError = (error: unknown) => {
    // some code that handles the error
    if (typeof error === 'string') {
        // handle string error
        throw new Error(error);
    } else if (error instanceof Error) {
        // handle Error object
        throw error;
    } else {
        // handle other types of errors
        throw new Error('An error occurred');
    }
};

const handleCatchErrorResponse = (error: unknown, res: Response) => {
    if (typeof error === 'string') {
        console.log('error', error);
        return res.status(500).send({ message: error });
    } else if (error instanceof Error) {
        console.log('error', error.message);
        return res.status(500).send({ message: error.message });
    } else {
        console.log('error', 'An error occurred');
        return res.status(500).send({ message: 'An error occurred' });
    }
};

const issueJWT = (user: { _id: mongoose.Types.ObjectId }) => {
    const pathToPrivateKey = keysConfig.privateKeyPath;
    const PRIV_KEY = fs.readFileSync(pathToPrivateKey, 'utf-8');

    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    };
};

const getPagingData = (count: number, page: number, limit: number) => {
    const totalItems = count;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, totalPages, currentPage };
};

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 0;
    const skip = page ? page * limit : 0;
    return { limit, skip };
};

export const validPassword = (password: string, hash: string, salt: string) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
};

const utils = {
    generatePassword,
    validPassword,
    issueJWT,
    generateKeyPair,
    checkKeyPairExist,
    createUniqueSlug,
    pagination: {
        getPagingData,
        getPagination,
    },
    handleCatchError,
    handleCatchErrorResponse,
};

export default utils;

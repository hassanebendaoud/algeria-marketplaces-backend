import crypto from 'crypto';

export const validPassword = (password: string, hash: string, salt: string) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
};

export default validPassword;

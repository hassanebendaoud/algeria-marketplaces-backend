import isExists from './isExists.middleware';
import isIdValid from './isIdValid.middleware';
import isUsernameExists from './isUsernameExists.middleware';

const usersMiddleware = {
    isExists,
    isIdValid,
    isUsernameExists,
};

export default usersMiddleware;

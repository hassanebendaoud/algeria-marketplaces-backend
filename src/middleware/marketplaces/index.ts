import isExists from './isExists.middleware';
import isIdValid from './isIdValid.middleware';
import isOwner from './isOwner.middleware';
import isSlugExists from './isSlugExists.middleware';
import isUsernameExists from './isUsernameExists.middleware';

const marketplacesMiddleware = {
  isExists,
  isIdValid,
  isOwner,
  isUsernameExists,
  isSlugExists,
};

export default marketplacesMiddleware;

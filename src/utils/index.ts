import checkKeyPairExist from '@utils/check-key-pair-exist.utils';
import createUniqueSlug from '@utils/createUniqueSlug.utils';
import generateKeyPair from '@utils/generate-key-pair.utils';
import generatePassword from '@utils/generate-password.utils';
import issueJWT from '@utils/issue-jwt.utils';
import pagination from '@utils/pagination.utils';
import validPassword from '@utils/valid-password.utils';

import handleCatchError from './handleCatchError.utils';
import handleCatchErrorResponse from './handleCatchErrorResponse.utils';

const utils = {
    generatePassword,
    validPassword,
    issueJWT,
    generateKeyPair,
    checkKeyPairExist,
    createUniqueSlug,
    pagination,
    handleCatchError,
    handleCatchErrorResponse,
};

export default utils;

import { UserModel } from '@/models';
import { findByIdAndUpdateUsersQueryType } from '@/types/users';

const findByIdAndUpdateQuery = async ({
    _id,
    update,
    options,
}: findByIdAndUpdateUsersQueryType) => {
    const recordUpdated = await UserModel.findByIdAndUpdate(
        _id,
        update,
        options
    );
    return recordUpdated;
};

export default findByIdAndUpdateQuery;

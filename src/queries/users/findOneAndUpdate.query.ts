import { UserModel } from '@/models';
import { findOneAndUpdateUsersQueryType } from '@/types/users';

const findOneAndUpdateQuery = async ({
    filter,
    update,
    options,
}: findOneAndUpdateUsersQueryType) => {
    const recordUpdated = await UserModel.findOneAndUpdate(
        filter,
        update,
        options
    );
    return recordUpdated;
};

export default findOneAndUpdateQuery;

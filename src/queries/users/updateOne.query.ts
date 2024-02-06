import { UserModel } from '@/models';
import { updateOneUsersQueryType } from '@/types/users';

const updateOneQuery = async ({
    filter,
    update,
    options,
}: updateOneUsersQueryType) => {
    const recordUpdated = await UserModel.updateOne(filter, update, options);
    return recordUpdated;
};

export default updateOneQuery;

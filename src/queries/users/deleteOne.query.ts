import { UserModel } from '@/models';
import { deleteOneUsersQueryType } from '@/types/users';

const deleteOneQuery = async ({ filter, options }: deleteOneUsersQueryType) => {
    const recordDeleted = await UserModel.deleteOne(filter, options);
    return recordDeleted;
};

export default deleteOneQuery;

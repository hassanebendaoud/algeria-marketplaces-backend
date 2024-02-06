import { UserModel } from '@/models';
import { createUsersQueryType } from '@/types/users';

const createQuery = async ({ data }: createUsersQueryType) => {
    const recordCreated = await UserModel.create(data);
    return recordCreated;
};

export default createQuery;

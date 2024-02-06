import { UserModel } from '@/models';
import { findOneUsersQueryType } from '@/types/users';

const findOneQuery = async ({
    filter,
    populate = {
        path: '',
    },
    select,
}: findOneUsersQueryType) => {
    const data = await UserModel.findOne(filter)
        .select(select)
        .populate(
            populate.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

export default findOneQuery;

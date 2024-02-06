import { UserModel } from '@/models';
import { findByIdUsersQueryType } from '@/types/users';

const findByIdQuery = async ({
    filter: { _id },
    populate = {
        path: '',
    },
    select,
}: findByIdUsersQueryType) => {
    const data = await UserModel.findById(_id)
        .select(select)
        .populate(
            populate?.path,
            populate?.select,
            populate?.model,
            populate?.match
        );
    return data;
};

export default findByIdQuery;

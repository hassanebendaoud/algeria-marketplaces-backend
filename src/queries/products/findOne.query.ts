import { ProductModel } from '@/models';
import { findOneProductsQueryType } from '@/types/products';

const findOneQuery = async ({
    filter,
    populate = {
        path: '',
    },
    select,
}: findOneProductsQueryType) => {
    const data = await ProductModel.findOne(filter)
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

import { ProductModel } from '@/models';
import { findByIdProductsQueryType } from '@/types/products';

const findByIdQuery = async ({
    filter: { _id },
    populate = {
        path: '',
    },
    select,
}: findByIdProductsQueryType) => {
    const data = await ProductModel.findById(_id)
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

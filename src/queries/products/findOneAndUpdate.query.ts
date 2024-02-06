import { ProductModel } from '@/models';
import { findOneAndUpdateProductsQueryType } from '@/types/products';

const findOneAndUpdateQuery = async ({
    filter,
    update,
    options,
}: findOneAndUpdateProductsQueryType) => {
    const recordUpdated = await ProductModel.findOneAndUpdate(
        filter,
        update,
        options
    );
    return recordUpdated;
};

export default findOneAndUpdateQuery;

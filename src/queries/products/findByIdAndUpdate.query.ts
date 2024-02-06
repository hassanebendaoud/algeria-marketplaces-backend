import { ProductModel } from '@/models';
import { findByIdAndUpdateProductsQueryType } from '@/types/products';

const findByIdAndUpdateQuery = async ({
    _id,
    update,
    options,
}: findByIdAndUpdateProductsQueryType) => {
    const recordUpdated = await ProductModel.findByIdAndUpdate(
        _id,
        update,
        options
    );
    return recordUpdated;
};

export default findByIdAndUpdateQuery;

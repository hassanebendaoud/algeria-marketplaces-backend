import { ProductModel } from '@/models';
import { updateOneProductsQueryType } from '@/types/products';

const updateOneQuery = async ({
    filter,
    update,
    options,
}: updateOneProductsQueryType) => {
    const recordUpdated = await ProductModel.updateOne(filter, update, options);
    return recordUpdated;
};

export default updateOneQuery;

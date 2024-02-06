import { ProductModel } from '@/models';
import { deleteOneProductsQueryType } from '@/types/products';

const deleteOneQuery = async ({
    filter,
    options,
}: deleteOneProductsQueryType) => {
    const recordDeleted = await ProductModel.deleteOne(filter, options);
    return recordDeleted;
};

export default deleteOneQuery;

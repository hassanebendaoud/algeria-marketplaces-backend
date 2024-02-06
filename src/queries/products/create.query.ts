import { ProductModel } from '@/models';
import { createProductsQueryType } from '@/types/products';

const createQuery = async ({ data }: createProductsQueryType) => {
    const recordCreated = await ProductModel.create(data);
    return recordCreated;
};

export default createQuery;

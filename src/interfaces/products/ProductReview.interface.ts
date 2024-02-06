import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { ReviewInterface } from '@interfaces/shared/Review.interface';

export interface ProductReviewInterface extends ReviewInterface {
  Product: ProductInterface | ObjectId | string;
}

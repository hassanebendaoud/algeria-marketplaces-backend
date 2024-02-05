import { Schema } from 'mongoose';

import { ProductInterface } from './Product.interface';
import { ReviewInterface } from './Review.interface';

export interface ProductReviewInterface extends ReviewInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

import { Schema } from 'mongoose';

import { ProductInterface } from './Product.interface';
import { ProductInteractionInterface } from './ProductInteraction.interface';

export interface ProductVoteInterface extends ProductInteractionInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

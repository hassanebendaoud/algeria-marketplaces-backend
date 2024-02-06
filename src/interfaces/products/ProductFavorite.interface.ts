import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { ProductInteractionInterface } from '@interfaces/products/ProductInteraction.interface';

export interface ProductFavoriteInterface extends ProductInteractionInterface {
  Product: ProductInterface | ObjectId | string;
}

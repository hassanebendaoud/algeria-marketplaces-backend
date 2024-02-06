import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { InteractionInterface } from '@interfaces/shared/Interaction.interface';

export interface ProductInteractionInterface extends InteractionInterface {
  Product: ProductInterface | ObjectId | string;
}

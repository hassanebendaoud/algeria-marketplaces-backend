import { Schema } from 'mongoose';

import { InteractionInterface } from './Interaction.interface';
import { ProductInterface } from './Product.interface';

export interface ProductInteractionInterface extends InteractionInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

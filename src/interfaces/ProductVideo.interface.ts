import { Schema } from 'mongoose';

import { FileInterface } from './File.interface';
import { ProductInterface } from './Product.interface';

export interface ProductVideoInterface extends FileInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

import { Schema } from 'mongoose';

import { FileInterface } from './File.interface';
import { ProductInterface } from './Product.interface';

export interface ProductImageInterface extends FileInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

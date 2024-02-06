import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { FileInterface } from '@interfaces/shared/File.interface';

export interface ProductVideoInterface extends FileInterface {
  Product: ProductInterface | ObjectId | string;
}

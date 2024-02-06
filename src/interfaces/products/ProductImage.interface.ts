import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { FileInterface } from '@interfaces/shared/File.interface';

export interface ProductImageInterface extends FileInterface {
  Product: ProductInterface | ObjectId | string;
}

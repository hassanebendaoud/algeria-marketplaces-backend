import { ObjectId } from 'mongoose';

import { ProductInterface } from '@interfaces/products/Product.interface';
import { CommentInterface } from '@interfaces/shared/Comment.interface';

export interface ProductCommentInterface extends CommentInterface {
  Product: ProductInterface | ObjectId | string;
}

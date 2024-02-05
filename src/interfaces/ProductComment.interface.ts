import { Schema } from 'mongoose';

import { CommentInterface } from './Comment.interface';
import { ProductInterface } from './Product.interface';

export interface ProductCommentInterface extends CommentInterface {
  Product: ProductInterface | Schema.Types.ObjectId | string;
}

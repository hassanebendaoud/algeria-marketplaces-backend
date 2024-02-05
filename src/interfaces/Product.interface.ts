import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';
import { ProductCommentInterface } from './ProductComment.interface';
import { ProductFavoriteInterface } from './ProductFavorite.interface';
import { ProductImageInterface } from './ProductImage.interface';
import { ProductLikeInterface } from './ProductLike.interface';
import { ProductReviewInterface } from './ProductReview.interface';
import { ProductVideoInterface } from './ProductVideo.interface';
import { ProductVoteInterface } from './ProductVote.interface';
import { UserInterface } from './User.interface';

export interface ProductInterface {
  title: string;
  slug?: string;
  price: number;

  User: UserInterface | Schema.Types.ObjectId | string;

  Marketplace: MarketplaceInterface | Schema.Types.ObjectId | string;

  Images?: (ProductImageInterface | Schema.Types.ObjectId | string)[];
  Videos?: (ProductVideoInterface | Schema.Types.ObjectId | string)[];

  Comments?: (ProductCommentInterface | Schema.Types.ObjectId | string)[];
  Reviews?: (ProductReviewInterface | Schema.Types.ObjectId | string)[];

  Likes?: (ProductLikeInterface | Schema.Types.ObjectId | string)[];
  Votes?: (ProductVoteInterface | Schema.Types.ObjectId | string)[];
  Favorites?: (ProductFavoriteInterface | Schema.Types.ObjectId | string)[];

  createdAt: Date;
  updatedAt: Date;
}

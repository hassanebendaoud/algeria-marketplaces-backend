import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/auth/User.interface';
import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
import { ProductCommentInterface } from '@interfaces/products/ProductComment.interface';
import { ProductFavoriteInterface } from '@interfaces/products/ProductFavorite.interface';
import { ProductImageInterface } from '@interfaces/products/ProductImage.interface';
import { ProductLikeInterface } from '@interfaces/products/ProductLike.interface';
import { ProductReviewInterface } from '@interfaces/products/ProductReview.interface';
import { ProductVideoInterface } from '@interfaces/products/ProductVideo.interface';
import { ProductVoteInterface } from '@interfaces/products/ProductVote.interface';

export interface ProductInterface {
    title: string;
    slug?: string;
    description: string;
    price: number;

    User: UserInterface | ObjectId | string;

    Marketplace: MarketplaceInterface | ObjectId | string;

    Images?: (ProductImageInterface | ObjectId | string)[];
    Videos?: (ProductVideoInterface | ObjectId | string)[];

    Comments?: (ProductCommentInterface | ObjectId | string)[];
    Reviews?: (ProductReviewInterface | ObjectId | string)[];

    Likes?: (ProductLikeInterface | ObjectId | string)[];
    Votes?: (ProductVoteInterface | ObjectId | string)[];
    Favorites?: (ProductFavoriteInterface | ObjectId | string)[];

    createdAt: Date;
    updatedAt: Date;
}

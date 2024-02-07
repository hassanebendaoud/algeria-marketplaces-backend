import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces.interfaces';
import {
    CommentInterface, FileInterface, InteractionInterface, ReviewInterface
} from '@interfaces/shared.interfaces';
import { UserInterface } from '@interfaces/users.interface';

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
export interface ProductCommentInterface extends CommentInterface {
    Product: ProductInterface | ObjectId | string;
}
export interface ProductFavoriteInterface extends ProductInteractionInterface {
    Product: ProductInterface | ObjectId | string;
}
export interface ProductImageInterface extends FileInterface {
    Product: ProductInterface | ObjectId | string;
}
export interface ProductInteractionInterface extends InteractionInterface {
    Product: ProductInterface | ObjectId | string;
}
export interface ProductLikeInterface extends ProductInteractionInterface {}
export interface ProductReviewInterface extends ReviewInterface {
    Product: ProductInterface | ObjectId | string;
}

export interface ProductVideoInterface extends FileInterface {
    Product: ProductInterface | ObjectId | string;
}

export interface ProductVoteInterface extends ProductInteractionInterface {
    Product: ProductInterface | ObjectId | string;
}

import { ObjectId } from 'mongoose';

import { UserInterface } from '@interfaces/auth/User.interface';
import { MarketplaceAddressInterface } from '@interfaces/marketplaces/MarketplaceAddress.interface';
import { MarketplaceAvatarInterface } from '@interfaces/marketplaces/MarketplaceAvatar.interface';
import { MarketplaceCommentInterface } from '@interfaces/marketplaces/MarketplaceComment.interface';
import {
    MarketplaceContactInformationInterface
} from '@interfaces/marketplaces/MarketplaceContactInformation.interface';
import {
    MarketplaceFavoriteInterface
} from '@interfaces/marketplaces/MarketplaceFavorite.interface';
import { MarketplaceImageInterface } from '@interfaces/marketplaces/MarketplaceImage.interface';
import { MarketplaceLikeInterface } from '@interfaces/marketplaces/MarketplaceLike.interface';
import { MarketplaceReviewInterface } from '@interfaces/marketplaces/MarketplaceReview.interface';
import {
    MarketplaceSocialMediaInterface
} from '@interfaces/marketplaces/MarketplaceSocialMedia.interface';
import { MarketplaceVideoInterface } from '@interfaces/marketplaces/MarketplaceVideo.interface';
import { MarketplaceVoteInterface } from '@interfaces/marketplaces/MarketplaceVote.interface';
import { ProductInterface } from '@interfaces/products/Product.interface';

export interface MarketplaceInterface {
    id: string;
    name: string;
    slug?: string;
    username: string;
    description: string;

    User: UserInterface | ObjectId | string;

    Products?: (ProductInterface | ObjectId | string)[];

    Avatars?: (MarketplaceAvatarInterface | ObjectId | string)[];
    Images?: (MarketplaceImageInterface | ObjectId | string)[];
    Videos?: (MarketplaceVideoInterface | ObjectId | string)[];

    ContactsInformation?: (
        | MarketplaceContactInformationInterface
        | ObjectId
        | string
    )[];
    Addresses?: (MarketplaceAddressInterface | ObjectId | string)[];
    SocialMedia?: (MarketplaceSocialMediaInterface | ObjectId | string)[];

    Comments?: (MarketplaceCommentInterface | ObjectId | string)[];
    Reviews?: (MarketplaceReviewInterface | ObjectId | string)[];

    Likes?: (MarketplaceLikeInterface | ObjectId | string)[];
    Votes?: (MarketplaceVoteInterface | ObjectId | string)[];
    Favorites?: (MarketplaceFavoriteInterface | ObjectId | string)[];

    createdAt: Date;
    updatedAt: Date;
}

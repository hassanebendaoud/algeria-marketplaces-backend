import { ObjectId } from 'mongoose';

import {
    MarketplaceAddressInterface, MarketplaceAvatarInterface, MarketplaceCommentInterface,
    MarketplaceContactInformationInterface, MarketplaceFavoriteInterface, MarketplaceImageInterface,
    MarketplaceInterface, MarketplaceLikeInterface, MarketplaceReviewInterface,
    MarketplaceSocialMediaInterface, MarketplaceVideoInterface, MarketplaceVoteInterface
} from '@interfaces/marketplaces.interfaces';
import {
    ProductFavoriteInterface, ProductInterface, ProductLikeInterface, ProductVoteInterface
} from '@interfaces/products.interfaces';

export interface UserInterface {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    hash: string;
    salt: string;
    gender?: string;
    dateBirthday?: string;

    MarketplaceAvatars?: (MarketplaceAvatarInterface | ObjectId | string)[];
    MarketplaceImages?: (MarketplaceImageInterface | ObjectId | string)[];
    MarketplaceVideos?: (MarketplaceVideoInterface | ObjectId | string)[];

    Marketplaces?: (MarketplaceInterface | ObjectId | string)[];
    Products?: (ProductInterface | ObjectId | string)[];

    MarketplaceContactsInformation?: (
        | MarketplaceContactInformationInterface
        | ObjectId
        | string
    )[];
    MarketplaceAddresses?: (MarketplaceAddressInterface | ObjectId | string)[];
    MarketplaceSocialMedias?: (
        | MarketplaceSocialMediaInterface
        | ObjectId
        | string
    )[];

    MarketplaceComments?: (MarketplaceCommentInterface | ObjectId | string)[];
    MarketplaceReviews?: (MarketplaceReviewInterface | ObjectId | string)[];

    MarketplaceLikes?: (MarketplaceLikeInterface | ObjectId | string)[];
    MarketplaceVotes?: (MarketplaceVoteInterface | ObjectId | string)[];
    MarketplaceFavorites?: (MarketplaceFavoriteInterface | ObjectId | string)[];

    ProductLikes?: (ProductLikeInterface | ObjectId | string)[];
    ProductVotes?: (ProductVoteInterface | ObjectId | string)[];
    ProductFavorites?: (ProductFavoriteInterface | ObjectId | string)[];

    createdAt: Date;
    updatedAt: Date;
}

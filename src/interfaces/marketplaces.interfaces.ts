import { ObjectId } from 'bson';

import { ProductInterface } from '@interfaces/products.interfaces';
import {
    AddressInterface,
    CommentInterface,
    ContactInformationInterface,
    FileInterface,
    InteractionInterface,
    ReviewInterface,
    SocialMediaInterface,
} from '@interfaces/shared.interfaces';

import { UserInterface } from './users.interface';

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
export interface MarketplaceAddressInterface extends AddressInterface {
    Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
export interface MarketplaceAvatarInterface extends FileInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceCommentInterface extends CommentInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceContactInformationInterface
    extends ContactInformationInterface {
    Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
export interface MarketplaceCoverInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceFavoriteInterface
    extends MarketplaceInteractionInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceImageInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceInteractionInterface extends InteractionInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceLikeInterface
    extends MarketplaceInteractionInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceReviewInterface extends ReviewInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceSocialMediaInterface extends SocialMediaInterface {
    Marketplaces: (MarketplaceInterface | ObjectId | string)[];
}
export interface MarketplaceVideoInterface extends FileInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}
export interface MarketplaceVoteInterface
    extends MarketplaceInteractionInterface {
    Marketplace: MarketplaceInterface | ObjectId | string;
}

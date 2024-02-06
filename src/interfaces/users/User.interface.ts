import { ObjectId } from 'mongoose';

import { MarketplaceInterface } from '@interfaces/marketplaces/Marketplace.interface';
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
import { ProductFavoriteInterface } from '@interfaces/products/ProductFavorite.interface';
import { ProductLikeInterface } from '@interfaces/products/ProductLike.interface';
import { ProductVoteInterface } from '@interfaces/products/ProductVote.interface';

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

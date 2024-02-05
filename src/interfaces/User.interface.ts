import { Schema } from 'mongoose';

import { MarketplaceInterface } from './Marketplace.interface';
import { MarketplaceAddressInterface } from './MarketplaceAddress.interface';
import { MarketplaceAvatarInterface } from './MarketplaceAvatar.interface';
import { MarketplaceCommentInterface } from './MarketplaceComment.interface';
import { MarketplaceContactInformationInterface } from './MarketplaceContactInformation.interface';
import { MarketplaceFavoriteInterface } from './MarketplaceFavorite.interface';
import { MarketplaceImageInterface } from './MarketplaceImage.interface';
import { MarketplaceLikeInterface } from './MarketplaceLike.interface';
import { MarketplaceReviewInterface } from './MarketplaceReview.interface';
import { MarketplaceSocialMediaInterface } from './MarketplaceSocialMedia.interface';
import { MarketplaceVideoInterface } from './MarketplaceVideo.interface';
import { MarketplaceVoteInterface } from './MarketplaceVote.interface';
import { ProductInterface } from './Product.interface';
import { ProductFavoriteInterface } from './ProductFavorite.interface';
import { ProductLikeInterface } from './ProductLike.interface';
import { ProductVoteInterface } from './ProductVote.interface';

export interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hash: string;
  salt: string;
  gender?: string;
  dateBirthday?: string;

  MarketplaceAvatars?: (
    | MarketplaceAvatarInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceImages?: (
    | MarketplaceImageInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceVideos?: (
    | MarketplaceVideoInterface
    | Schema.Types.ObjectId
    | string
  )[];

  Marketplaces?: (MarketplaceInterface | Schema.Types.ObjectId | string)[];
  Products?: (ProductInterface | Schema.Types.ObjectId | string)[];

  MarketplaceContactsInformation?: (
    | MarketplaceContactInformationInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceAddresses?: (
    | MarketplaceAddressInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceSocialMedias?: (
    | MarketplaceSocialMediaInterface
    | Schema.Types.ObjectId
    | string
  )[];

  MarketplaceComments?: (
    | MarketplaceCommentInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceReviews?: (
    | MarketplaceReviewInterface
    | Schema.Types.ObjectId
    | string
  )[];

  MarketplaceLikes?: (
    | MarketplaceLikeInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceVotes?: (
    | MarketplaceVoteInterface
    | Schema.Types.ObjectId
    | string
  )[];
  MarketplaceFavorites?: (
    | MarketplaceFavoriteInterface
    | Schema.Types.ObjectId
    | string
  )[];

  ProductLikes?: (ProductLikeInterface | Schema.Types.ObjectId | string)[];
  ProductVotes?: (ProductVoteInterface | Schema.Types.ObjectId | string)[];
  ProductFavorites?: (
    | ProductFavoriteInterface
    | Schema.Types.ObjectId
    | string
  )[];

  createdAt: Date;
  updatedAt: Date;
}

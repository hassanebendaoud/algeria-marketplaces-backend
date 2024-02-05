import { MarketplaceAddressInterface } from './MarketplaceAddress.interface';
import { MarketplaceAvatarInterface } from './MarketplaceAvatar.interface';
import { MarketplaceCommentInterface } from './MarketplaceComment.interface';
import {
  MarketplaceContactInformationInterface,
} from './MarketplaceContactInformation.interface';
import { MarketplaceFavoriteInterface } from './MarketplaceFavorite.interface';
import { MarketplaceImageInterface } from './MarketplaceImage.interface';
import { MarketplaceLikeInterface } from './MarketplaceLike.interface';
import { MarketplaceReviewInterface } from './MarketplaceReview.interface';
import {
  MarketplaceSocialMediaInterface,
} from './MarketplaceSocialMedia.interface';
import { MarketplaceVideoInterface } from './MarketplaceVideo.interface';
import { MarketplaceVoteInterface } from './MarketplaceVote.interface';
import { ProductInterface } from './Product.interface';
import { UserInterface } from './User.interface';

export interface MarketplaceInterface {
  id: string;
  name: string;
  slug?: string;
  username: string;
  description: string;

  User: UserInterface;

  Products?: ProductInterface[];

  Avatars?: MarketplaceAvatarInterface[];
  Images?: MarketplaceImageInterface[];
  Videos?: MarketplaceVideoInterface[];

  ContactsInformation?: MarketplaceContactInformationInterface[];
  Addresses?: MarketplaceAddressInterface[];
  SocialMedia?: MarketplaceSocialMediaInterface[];

  Comments?: MarketplaceCommentInterface[];
  Reviews?: MarketplaceReviewInterface[];

  Likes?: MarketplaceLikeInterface[];
  Votes?: MarketplaceVoteInterface[];
  Favorites?: MarketplaceFavoriteInterface[];

  createdAt: Date;
  updatedAt: Date;
}

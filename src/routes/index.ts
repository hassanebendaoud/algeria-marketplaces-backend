import authRouter from '@routes/auth.routes';
import marketplacesAddressesRouter from '@routes/marketplaces.addresses.routes';
import marketplacesCommentsRouter from '@routes/marketplaces.comments.routes';
import marketplacesReviewsRouter from '@routes/marketplaces.reviews.routes';

import productsCommentsRouter from '@routes/products.comments.routes';
import productsReviewsRouter from '@routes/products.reviews.routes';

import marketplacesRouter from '@routes/marketplaces.routes';
import productsRouter from '@routes/products.routes';
import usersRouter from '@routes/users.routes';
import marketplacesSocialMediasRouter from '@routes/marketplaces.socialMedias.routes';
import marketplacesContactsInformationRouter from '@routes/marketplaces.contactsInformation.routes';

import marketplacesLikesRouter from '@routes/marketplaces.likes.routes';
import marketplacesVotesRouter from '@routes/marketplaces.votes.routes';
import marketplacesFavoritesRouter from '@routes/marketplaces.favorites.routes';

import productsLikesRouter from '@routes/products.likes.routes';
import productsVotesRouter from '@routes/products.votes.routes';
import productsFavoritesRouter from '@routes/products.favorites.routes';

import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/marketplaces', marketplacesRouter);
router.use('/marketplaces/addresses', marketplacesAddressesRouter);
router.use('/marketplaces/comments', marketplacesCommentsRouter);
router.use('/marketplaces/reviews', marketplacesReviewsRouter);

router.use('/products/comments', productsCommentsRouter);
router.use('/products/reviews', productsReviewsRouter);

router.use('/marketplaces/socialMedias', marketplacesSocialMediasRouter);
router.use(
    '/marketplaces/contactsInformation',
    marketplacesContactsInformationRouter
);
router.use('/marketplaces/likes', marketplacesLikesRouter);
router.use('/marketplaces/votes', marketplacesVotesRouter);
router.use('/marketplaces/favorites', marketplacesFavoritesRouter);

router.use('/products/likes', productsLikesRouter);
router.use('/products/votes', productsVotesRouter);
router.use('/products/favorites', productsFavoritesRouter);

router.use('/products', productsRouter);

export default router;

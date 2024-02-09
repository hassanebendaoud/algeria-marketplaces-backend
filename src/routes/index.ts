import authRouter from '@routes/auth.routes';
import marketplacesAddressesRouter from '@routes/marketplaces.addresses.routes';
import marketplacesCommentsRouter from '@routes/marketplaces.comments.routes';
import marketplacesReviewsRouter from '@routes/marketplaces.reviews.routes';
import marketplacesRouter from '@routes/marketplaces.routes';
import productsRouter from '@routes/products.routes';
import usersRouter from '@routes/users.routes';
import marketplacesSocialMediasRouter from '@routes/marketplaces.socialMedias.routes';
import marketplacesContactsInformationRouter from '@routes/marketplaces.contactsInformation.routes';
import marketplacesLikesRouter from '@routes/marketplaces.likes.routes';
import marketplacesVotesRouter from '@routes/marketplaces.votes.routes';
import marketplacesFavoritesRouter from '@routes/marketplaces.favorites.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/marketplaces', marketplacesRouter);
router.use('/marketplaces/addresses', marketplacesAddressesRouter);
router.use('/marketplaces/comments', marketplacesCommentsRouter);
router.use('/marketplaces/reviews', marketplacesReviewsRouter);
router.use('/marketplaces/socialMedias', marketplacesSocialMediasRouter);
router.use(
    '/marketplaces/contactsInformation',
    marketplacesContactsInformationRouter
);
router.use('/marketplaces/likes', marketplacesLikesRouter);
router.use('/marketplaces/votes', marketplacesVotesRouter);
router.use('/marketplaces/favorites', marketplacesFavoritesRouter);

router.use('/products', productsRouter);

export default router;

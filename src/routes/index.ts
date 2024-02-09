import { Router } from 'express';
import authRouter from '@routes/auth.routes';
import marketplacesRouter from '@routes/marketplaces.routes';
import marketplacesAddressesRouter from '@routes/marketplaces.addresses.routes';
import productsRouter from '@routes/products.routes';
import usersRouter from '@routes/users.routes';
import marketplacesCommentsRouter from '@routes/marketplaces.comments.routes';
import marketplacesReviewsRouter from '@routes/marketplaces.reviews.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/marketplaces', marketplacesRouter);
router.use('/marketplaces/addresses', marketplacesAddressesRouter);
router.use('/marketplaces/comments', marketplacesCommentsRouter);
router.use('/marketplaces/reviews', marketplacesReviewsRouter);
router.use('/products', productsRouter);

export default router;

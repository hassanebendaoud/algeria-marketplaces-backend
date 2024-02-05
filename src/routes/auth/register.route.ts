import express from 'express';

import register from '../../controllers/auth/register.controller';
import zodValidateMiddleware from '../../middleware/zodValidate.middleware';
import registerSchema from '../../zod/schema/auth/register.schema';

const router = express.Router();

router.post("/", zodValidateMiddleware(registerSchema), register);

export default router;

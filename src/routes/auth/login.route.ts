import express from 'express';

import login from '../../controllers/auth/login.controller';
import zodValidateMiddleware from '../../middleware/zodValidate.middleware';
import loginSchema from '../../zod/schema/auth/login.schema';

const router = express.Router();

router.post("/", zodValidateMiddleware(loginSchema), login);

export default router;

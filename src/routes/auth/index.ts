import { Router } from "express";

import loginRoute from "./login.route";
import registerRoute from "./register.route";
import protectRoute from "./protect.route";
import protectMiddleware from "../../middleware/protect.middleware";

const router = Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/protect", protectMiddleware, protectRoute);

export default router;

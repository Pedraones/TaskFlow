import { Router } from "express";
import { loginController } from "../controller/login.controller";
import { registerController } from "../controller/register.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { meController } from "../controller/me.controller";
import { logoutController } from "../controller/logout.controller";
import { authLimiter } from "../../middlewares/rate-limit";
import { forgotPasswordController } from "../controller/forgot-password.controller";

const router = Router();

router.post("/login",authLimiter, loginController);
router.post("/register",authLimiter, registerController);

router.get("/me", authMiddleware, meController);
router.post("/logout", authMiddleware, logoutController);

router.post("/forgot-password", authLimiter, forgotPasswordController);

export default router;

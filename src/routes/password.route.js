import { Router } from "express";
import { newPassword, recoverPassword } from "../controllers/password.controllers.js";
import auth from "../helpers/auth.js";
const router = Router();

router.put("/recoverpassword", recoverPassword)
router.put("/newpassword", newPassword)

export default router;

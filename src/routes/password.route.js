import { Router } from "express";
import { recoverPassword } from "../controllers/password.controllers.js";
import auth from "../helpers/auth.js";
const router = Router();

router.put("/recoverpassword", recoverPassword)


export default router;

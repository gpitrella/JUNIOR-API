import { Router } from "express";
import { AllUsers, userProjects } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/allusers", AllUsers)
router.post("/projects", userProjects)

export default router;
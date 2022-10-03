import { Router } from "express";
import { AllUsers, userProjects } from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers", AllUsers)
// router.post("/projects", auth ,userProjects)
router.post("/projects", userProjects)

export default router;
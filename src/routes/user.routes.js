import { Router } from "express";
import { AllUsers, userProjects, userCollaborations } from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers", AllUsers)
router.post("/projects", userProjects)
router.post("/collaboration",userCollaborations)

export default router;
import { Router } from "express";
import { AllUsers, userProjects, userCollaborations, MyCollaborations, getUserById } from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers",AllUsers);
router.get("/:id", getUserById);
router.post("/projects", auth, userProjects);
router.post("/collaboration",userCollaborations)
router.post("/mycollaborations", MyCollaborations)

export default router;
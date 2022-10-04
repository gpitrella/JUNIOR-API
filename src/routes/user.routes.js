import { Router } from "express";
import { AllUsers, userProjects, getUserById } from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers",AllUsers);
router.get("/:id", getUserById);
router.post("/projects", auth ,userProjects);

export default router;
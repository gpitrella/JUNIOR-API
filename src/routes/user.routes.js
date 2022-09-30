import { Router } from "express";
import { AllUsers, prueba, userProjects } from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers",AllUsers)
router.post("/projects", auth ,userProjects)

export default router;
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import filterRoutes from "./filters.routes.js";
import techRoutes from "./tech.routes.js";
import projectsRoutes from "./project.routes.js";
import userRoutes from "./user.routes.js";
import passwordRoutes from "./password.routes.js";
import commentsRoutes from "./comments.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/filters", filterRoutes);
router.use("/tech", techRoutes);
router.use("/projects", projectsRoutes);
router.use("/password",passwordRoutes);
router.use("/comments", commentsRoutes);

export default router;
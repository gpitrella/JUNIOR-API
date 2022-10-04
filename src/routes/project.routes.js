import { Router } from "express";
import { createNewProject, getAllProyect, getProjectById, projectDelete, updateProject } from "../controllers/project.controller.js";
//import { isAuthenticated } from "../helpers/auth.js";
const router = Router();
//GET
router.get("/allprojects", getAllProyect);
router.get("/:id", getProjectById);
//POST
router.post("/newproject", createNewProject);
//PUT
router.put("/updateproject", updateProject);
//DELETE
router.delete("/deleteproject", projectDelete);

export default router;



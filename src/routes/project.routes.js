import { Router } from "express";
import { createNewProject, getAllProyect, getCollaborator_project, getProjectById, projectDelete, updateProject } from "../controllers/project.controller.js";
import auth from "../helpers/auth.js";
const router = Router();
//GET
router.get("/allprojects", getAllProyect)
//GET By Id
router.get("/projectsbyid/:id", getProjectById)
//GET
router.get("/projectcollaborators/:id",getCollaborator_project)
//POST
router.post("/newproject", createNewProject);
//PUT
router.put("/updateproject", updateProject)
//DELETE
router.delete("/deleteproject", projectDelete)

export default router;



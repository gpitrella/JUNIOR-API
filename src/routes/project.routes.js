import { Router } from "express";
import { createNewProject, getAllProyect, getProjectById, getProjectCollaborator, projectDelete, updateProject } from "../controllers/project.controller.js";
//import { isAuthenticated } from "../helpers/auth.js";
import auth from "../helpers/auth.js";

const router = Router();
//GET
router.get("/allprojects", getAllProyect);

//GET By Id
router.get("/:id", getProjectById);

// GET Project Collaborators
router.get("/collaborator/:id", getProjectCollaborator);

//POST
router.post("/newproject", createNewProject);
//PUT
router.put("/updateproject", updateProject);
//DELETE
router.delete("/deleteproject", projectDelete);

export default router;



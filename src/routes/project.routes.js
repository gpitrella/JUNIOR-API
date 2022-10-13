import { Router } from "express";
import { createNewProject, getAllProyect, getProjectById, projectDelete, updateProject } from "../controllers/project.controller.js";
//import { isAuthenticated } from "../helpers/auth.js";
import auth from "../helpers/auth.js";

const router = Router();
//GET
router.get("/allprojects", getAllProyect);

//GET By Id
router.get("/:id", getProjectById);
// router.get("/projectsbyid", getProjectById)
//POST
router.post("/newproject", createNewProject);
//PUT
router.put("/updateproject", updateProject);
//DELETE
router.delete("/deleteproject", projectDelete);

export default router;



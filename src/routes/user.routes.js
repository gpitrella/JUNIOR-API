import { Router } from "express";
import { 
    AllUsers, 
    userProjects, 
    userCollaborations, 
    MyCollaborations, 
    getUserById, 
    userUpdate, 
    userCollaboratorName, 
    sendInvitationProject 
} from "../controllers/user.controllers.js";
import auth from "../helpers/auth.js";

const router = Router();

router.get("/allusers",AllUsers);
router.get("/:id", getUserById);
router.get("/projects/:id", auth, userProjects);
router.put("/update/:id", userUpdate);
router.get("/name/:id", userCollaboratorName)
router.post("/collaboration",userCollaborations);
router.post("/mycollaborations", MyCollaborations); 
router.post("/sendinvitation", sendInvitationProject);

export default router;
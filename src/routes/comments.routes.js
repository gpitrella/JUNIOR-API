import { Router } from "express";
import { getCommentsByUser, getCommentsByProject, postComment, answerComment } from '../controllers/comment.controllers.js';
const router = Router();

// Main Routes
router.get("/byuser/:idUser", getCommentsByUser);
router.get("/byproject/:idProject", getCommentsByProject);
router.post("/postcomment", postComment);
router.put("/answercomment/:idComment", answerComment);

export default router
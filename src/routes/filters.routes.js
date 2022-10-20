import { Router } from "express";
import { filterByTechs } from '../controllers/filters.controllers.js';
const router = Router();

// Main Routes
router.post("/",filterByTechs);

export default router
import express from "express";

import { postSnippets } from "../controllers/snippetsController";

const router = express.Router();
router.post("/", postSnippets);

export default router;

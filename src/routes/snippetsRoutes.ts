import express from "express";

import { getSnippets, postSnippets } from "../controllers/snippetsController";

const router = express.Router();
router.post("/", postSnippets).get("/", getSnippets);

export default router;

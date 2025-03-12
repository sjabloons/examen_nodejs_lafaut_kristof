import express from "express";

import {
    getSnippets,
    postSnippets,
    getSnippetsById,
    deleteById,
    putById,
} from "../controllers/snippetsController";

const router = express.Router();
router
    .post("/", postSnippets)
    .get("/", getSnippets)
    .get("/:id", getSnippetsById)
    .delete("/:id", deleteById)
    .put("/:id", putById);

export default router;

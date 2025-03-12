import { Request, Response } from "express";
import { Snippet } from "../models/snippetsModel";

export const postSnippets = async (req: Request, res: Response) => {
    try {
        const { title, code, language, tags, expiresIn } = req.body;
        const snippet = await Snippet.create({
            title,
            code,
            language,
            tags,
            expiresIn,
        });
        console.log(snippet);
        res.status(201).json(snippet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

import { Request, Response } from "express";
import { Snippet } from "../models/snippetsModel";

const decodeSnippet = (encodedCode: string): string => {
    return Buffer.from(encodedCode, "base64").toString("utf-8");
};
export const postSnippets = async (req: Request, res: Response) => {
    try {
        const { title, code, language, tags, expiresIn } = req.body;
        const encodedCode = Buffer.from(code).toString("base64");
        const snippet = await Snippet.create({
            title,
            code: encodedCode,
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

export const getSnippets = async (req: Request, res: Response) => {
    try {
        const { language, tags, page, limit, sort, order } = req.query;
        const query: any = {
            $or: [
                { expirationDate: { $gt: Date.now() } },
                { expirationDate: { $exists: false } },
            ],
        };
        if (language) {
            query.language = { $regex: language, $options: "i" };
        }
        if (tags) {
            const tagsArray = (tags as string)
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
            query.tags = { $in: tagsArray.map((tag) => new RegExp(tag, "i")) };
        }
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const sortOrder = order === "asc" ? 1 : -1;
        const sortOption: any = { [sort as string]: sortOrder };
        const snippets = await Snippet.find(query)
            .sort(sortOption)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const decodedSnippets = snippets.map((snippet) => {
            const snippetObj = snippet.toObject();
            return {
                ...snippetObj,
                code: decodeSnippet(snippetObj.code),
            };
        });

        console.log(decodedSnippets);
        res.status(200).json(decodedSnippets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error get" });
    }
};

export const getSnippetsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const snippets = await Snippet.findById(id);
        console.log(snippets);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error getbyId" });
    }
};

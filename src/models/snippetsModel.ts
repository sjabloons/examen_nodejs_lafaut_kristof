import mongoose from "mongoose";

const SnippetsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    expiresIn: { type: Number, required: false },
});

export const Snippet = mongoose.model("snippets", SnippetsSchema);

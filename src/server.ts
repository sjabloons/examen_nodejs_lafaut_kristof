// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import snippetsRoutes from "./routes/snippetsRoutes";
import { Snippet } from "./models/snippetsModel";
import mongoose from "mongoose";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ejs
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

app.get("/", async (req, res) => {
    const allSnippets = await Snippet.find();
    res.render("home", {
        snippets: allSnippets,
        title: "Examen NodeJS Lafaut Kristof",
    });
});
// Routes
app.use("/api/snippets", snippetsRoutes);
app.all("*", notFound);

// Database connection
try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connection OK");
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}! 🚀`);
});

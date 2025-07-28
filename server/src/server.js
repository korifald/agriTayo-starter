import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import FarmerRoutes from "./routes/FarmerRoutes.js";
import PreorderRoutes from "./routes/PreorderRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production") {
        app.use(cors({origin: "http://localhost:5173",}));
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/farmers", FarmerRoutes);
app.use("/api/preorders", PreorderRoutes);

if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../agriTayo/dist")))

        app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../agriTayo/dist/index.html"));
})
}

connectDB().then(() => {
        app.listen(
                PORT,
                () => console.log(`Server started on PORT:${PORT}`)
        )
});







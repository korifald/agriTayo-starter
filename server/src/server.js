import express from "express";
import FarmerRoutes from "./routes/FarmerRoutes.js";
import PreorderRoutes from "./routes/PreorderRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());

connectDB().then(() => {
        app.listen(
                PORT,
                () => console.log(`Server started on PORT:${PORT}`)
        )
});

app.use(express.json());
app.use(rateLimiter);

app.use("/api/farmers", FarmerRoutes);
app.use("/api/preorders", PreorderRoutes);






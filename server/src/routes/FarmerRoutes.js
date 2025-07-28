import express from "express"
import { 
        createFarmer,
        getFarmers,
        getFarmerById,
        updateFarmer,
        deleteFarmer
} from "../controllers/FarmerController.js";

const router = express.Router();

router.get("/", getFarmers);
router.get("/:id", getFarmerById);
router.post("/", createFarmer);
router.put("/:id", updateFarmer);
router.delete("/:id", deleteFarmer);

export default router;

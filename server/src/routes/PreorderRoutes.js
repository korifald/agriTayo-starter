import express from "express";
import {
        getPreorders,
        createPreorder,
        deletePreorder
} from "../controllers/PreorderController.js";

const router = express.Router();

router.get("/", getPreorders);
router.post("/", createPreorder);
router.delete("/:id", deletePreorder);

export default router;
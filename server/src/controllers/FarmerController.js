import Farmer from "../models/Farmer.js";

export async function getFarmers(req, res) {
        try {
                const farmers = await Farmer.find();
                res.status(200).json(farmers);
        } catch (error) {
                console.error("Error in getFarmers:", error);
                res.status(500).json(
                        { message: "Internal server error" });
        }
}

export async function getFarmerById(req, res) {
        const { id } = req.params;
        try {
                const farmer = await Farmer.findById(id);
                if (!farmer) {
                        return res.status(404).json(
                                { message: "Farmer not found" });
                }
                res.status(200).json(farmer);
        } catch (error) {
                console.error("Error in getFarmerById:", error);
                res.status(500).json({ message: "Internal server error" });
        }
}

export async function createFarmer(req, res) {
        const { name, province, municipality, products, verifiedNum } = req.body;

        if (!name || !province || !municipality || !products) {
                return res.status(400).json(
                        { message: "All fields are required" });
        }

        try {
                const newFarmer = new Farmer({
                        name,
                        province,
                        municipality,
                        products,
                        verifiedNum: verifiedNum || "+14027916453"
                });

                await newFarmer.save();
                res.status(201).json(newFarmer);
        } catch (error) {
                console.error("Error in createFarmer:", error);
                res.status(500).json({ message: "Internal server error" });
        }
}
// doesn't yet include farmer number; same verifiedNum for MVP
export async function updateFarmer(req, res) {
        const { id } = req.params;
        const { name, province, municipality, products } = req.body;

        if (!name || !province || !municipality || !products) {
                return res.status(400).json(
                        { message: "All fields are required" });
        }

        try {
                const updatedFarmer = await Farmer.findByIdAndUpdate(
                        id,
                        { name, province, municipality, products },
                        { new: true }
                );

                if (!updatedFarmer) {
                        return res.status(404).json(
                                { message: "Farmer not found" });
                }

                res.status(200).json(updatedFarmer);
        } catch (error) {
                console.error("Error in updateFarmer:", error);
                res.status(500).json({ message: "Internal server error" });
        }
}

export async function deleteFarmer(req, res) {
        const { id } = req.params;

        try {
                const deletedFarmer = await Farmer.findByIdAndDelete(id);
                if (!deletedFarmer) {
                        return res.status(404).json(
                                { message: "Farmer not found" });
                }
                res.status(200).json(
                        { message: "Farmer removed successfully" });
        } catch (error) {
                console.error("Error in deleteFarmer:", error);
                res.status(500).json({ message: "Internal server error" });
        }
}

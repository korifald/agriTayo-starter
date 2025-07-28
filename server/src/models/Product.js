import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },

        variety: {
                type: String,
                required: true,
        },

        maxQuantityKg: {
                type: Number,
                required: true,
        },

        growTimeDays: {
                type: Number,
                required: true,
        },

        pricePerKg: {
                type: Number,
                required: true,
        },

        description: {
                type: String,
                required: true,
        },

        imageUrl: {
                type: String,
                required: true,
        },
});

const Product = mongoose.model("Product", ProductSchema);

export { ProductSchema };
export default Product; // for future improvements, make use of this model

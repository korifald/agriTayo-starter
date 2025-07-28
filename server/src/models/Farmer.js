import mongoose from "mongoose";
import {ProductSchema} from "./Product.js";

const FarmerSchema = new mongoose.Schema({
        name: { 
                type: String,
                required: true 
        },

        province: { 
                type: String, 
                required: true 
        },

        municipality: { 
                type: String, 
                required: true 
        },

        products: { 
                type: [ProductSchema],
                required: true 
        }, 

        verifiedNum: { 
                type: String, 
                required: true, 
                default: "+14027916453"
        }
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

export default Farmer;
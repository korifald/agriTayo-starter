import mongoose from "mongoose";

const PreorderSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        }, 

        contact: {
                type: String,
                required: true
        },

        email: {
                type: String,
                required: true
        },

        farmer: {
                type: String,
                required: true
        },

        product: {
                type: String,
                required: true
        },

        quantity: {
                type: Number,
                required: true
        },

        
        date: {
                type: Date,
                required: true
        },

        address: {
                type: String,
                required: true
        },

        agree: {
                type: Boolean,
                required: true
        },

        signature: {
                type: String,
                required: true
        }
},
        { timestamps: true }
);

const Preorder = mongoose.model("Preorder", PreorderSchema);

export default Preorder;
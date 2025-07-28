import mongoose from "mongoose"

export const connectDB = async () => {
        
        try {
                await mongoose.connect(process.env.MONGO_URI);
                console.log("MongoDB successfully connected via Mongoose.");
                
        } catch (error) {
                console.error("\t\tError connecting to MONGODB!\n\n", error);
                process.exit(1);
        }
}
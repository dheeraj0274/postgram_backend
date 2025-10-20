import mongoose from "mongoose";
import dotenv from 'dotenv'






const connectDB  = async ()=>{ 
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');
        
    } catch (error) {
        console.log('Error database connection' , error);
        
        
    }
}


export default connectDB;  
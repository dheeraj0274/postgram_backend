import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import path from "path";
import { fileURLToPath } from "url";



dotenv.config({path:'./config/.env'})

console.log('loaded env' , process.env.MONGO_URI);

const Port = process.env.PORT || 5000

const app=express()
app.use(express.json())
connectDB();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ This makes your uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




app.use('/api/v1'  , userRoutes)
app.use('/api' , postRoutes)
app.get('/', (req,res)=>{
    res.send('Hi')
})



app.listen(Port , ()=> console.log(`server is running on the port ${Port}`)
)
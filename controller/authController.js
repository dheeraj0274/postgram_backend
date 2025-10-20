import jwt from 'jsonwebtoken'
import User from '../models/User.js';

import bcrypt from 'bcrypt';



export const userLogin = async (req, res)=>{


    try {


        
    const {email , password , username } = req.body;
    const isUser= await  User.findOne({email});
    if(!isUser) return res.status(400).json({
        message:'No user founds , Regiter first',
        success:false

    });

    const isMatch = await bcrypt.compare(password , isUser.password)
    if(isMatch){
         const token = jwt.sign({
        id:isUser._id , name:isUser.name
    } ,process.env.JWT_SECRET, {expiresIn:'7d'})



    res.status(201).json({
        success:true,
        message:'LoggedIn successfully',
        token,
        id:isUser._id,
        userName:isUser.name
    })

    }
    else {
        res.status(401).json({
            message:'Incorrect Password',
            success:false

        })
    }



   

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error login!',
            error:error.message

        })
        
    }





    
  




    


}

export const userRegister = async(req,res)=>{
    const {name , email ,phone, userName , password}= req.body;

     try {
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message:'User Already Exist'});

        const hashedPass = await bcrypt.hash(password , 10)

        const newUser = new User({
            name , email , phone , userName , password:hashedPass
        })
        await newUser.save()

        const token = jwt.sign({id:newUser._id , name:newUser.name} ,process.env.JWT_SECRET , {expiresIn:'7d'});

        res.status(201).json({
            message:'User registered successfully',
            success:true,
            token,
            user:newUser
        })
        
     } catch (error) {

        res.status(500).json({
            success:true,
            message:"Failed to register",
            error:error.message
        })
        
     }


}
import jwt from 'jsonwebtoken'
import User from '../models/User.js'



const authMiddleware = async (req,res,next)=>{
    let token;

    token =req.headers.authorization
    // console.log(token);
    
    if(!token || !token.startsWith('Bearer')) return res.status(401).json({message:'no token provided'});

    try {

       const decoded = jwt.verify(token.split(' ')[1] , process.env.JWT_SECRET);

       const user = await User.findById(decoded.id).select('-password')
       if(!user) return res.status(404).json({message:'User not found'})

        req.user=user;
        next()

        
    } catch (error) {


        res.status(500).json({
            message:'Invalid Token',
            success:false,
            error:error.message
        })
        
    }

    

}
export default authMiddleware;
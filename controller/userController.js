import User from "../models/User.js"


export const Profile = async (req, res)=>{

    try {

        const aboutUser = await User.findById(req.user._id)
        if(!aboutUser) return res.status(404).json({message:'User not found'});

        res.status(200).json({
            success:true,
            aboutUser
        })
        
    } catch (error) {
        res.status(500).json({message:'error profile' , success:false , error:error.message})
        
    }







}


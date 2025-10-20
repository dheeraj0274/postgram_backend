import mongoose from "mongoose";


const UserSchema= mongoose.Schema({
                                
  name:{type:String , required:true},
  email:{type:String , required:true , unique:true} ,
  password:{type:String , required:true},
  userName:{type:String , requires:true},
  avatar:{type:String , default:''},
  friends:[{type:mongoose.Schema.Types.ObjectId , ref:'User'}]


},
{timestamps:true}


)



const User = mongoose.model('User' , UserSchema );
export default User;

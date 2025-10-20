import express from 'express';
import { userLogin,userRegister } from "../controller/authController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import { Profile } from '../controller/userController.js';

const route = express.Router();



route.post('/login' , userLogin)
route.post('/register' , userRegister);
route.get('/me' ,authMiddleware, Profile)



export default route;
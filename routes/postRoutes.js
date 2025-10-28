// routes/postRoutes.js
import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createPost,
  getFeedPosts,
  toggleLike,
  addComment,
  getAllPosts
} from '../controller/postController.js';

// Multer setup
import  upload  from '../config/cloundinary.js';



const router = express.Router();

router.post('/create', authMiddleware, upload.single('image') , createPost);
router.get('/getAll' , authMiddleware , getAllPosts)
router.get('/:userId', authMiddleware, getFeedPosts);


router.post('/:postId/like', authMiddleware, toggleLike);
router.post('/:postId/comment', authMiddleware, addComment);

export default router;

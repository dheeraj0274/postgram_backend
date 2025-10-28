
import Post from '../models/Post.js';
import User from '../models/User.js';

//  Create a Post
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file?.path;
    console.log('image' , image);
    
    console.log('hi');
    

    const post = new Post({
      userId: req.user.id,
      caption,
      image,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.log('errors', error);
    
    res.status(500).json({ message: error.message });
  }
};

// Get Posts for feed 

export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts sorted by newest first
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name profilePic'); // show name & pic of post owner
      console.log(posts);
      

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friends = user.friends.concat(userId);

    const posts = await Post.find({ userId: { $in: friends } })
      .sort({ createdAt: -1 })
      .populate('userId', 'name profilePic');

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Like and Unlike Post
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) post.likes.push(req.user.id);
    else post.likes.splice(index, 1);

    await post.save();
    res.status(200).json({
      message:'React successfully',
      success:true,
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Add Comments
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const post = await Post.findById(postId);
    post.comments.push({ userId: req.user.id, text });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

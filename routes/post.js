const router = require("express").Router();
const { count } = require("console");
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post({
      userId : req.body.userId,
      title : req.body.title,
      desc : req.body.desc,
      likes : 0
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: 
        {
            title : req.body.title,
            desc : req.body.desc,
        }
    });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like a post

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $set: 
        {
            likes :  post.likes + 1
        }
    });
    res.status(200).json("the post has been likes");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/all", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({"createdAt": -1}).exec() ;
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
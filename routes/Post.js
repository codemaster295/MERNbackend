const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 8080
require('dotenv/config')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Signupdetails = require('../model/SignUp')
const Post = require("../model/Post");
const UserData = require('../model/UserData');
const Comment = require('../model/Comment')
const router = express.Router();
module.exports = router;




router.get("/posts/:email", async (req, res) => {

  const User = await Signupdetails.findOne({ email: req.params.email });
  if (User.posts) {

    const postData = await Post.find().where('_id').in(User.posts).exec((err, records) => {
      res.json(records)
      console.log(records)
    });
    console.log(User, "UserUserUserUserUser")
    for (let i = 0; i <= User[0].posts.length; i++) {
      postdata = await postData.find({ _id: User[0].posts[i] })
      console.log(postdata[i], "postdata[i]postdata[i]")

    }
    console.log(dataArr)

    res.json(dataArr)
    console.log(dataArr, "dawgdadagd")
  }
})
router.post("/createpost/:email", async (req, res) => {
  let userName = await UserData.findOne({ email: req.params.email })
  console.log(userName, "userName.username")
  let User = null;
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    username: userName.username,
    like: [],
    date: Date.now(),
    ownerID: userName._id

  })
  await post.save().then(async (data) => {
    await Signupdetails.findOne({ email: req.params.email }).then((xc) => {
      console.log(xc)
      User = xc
    })
    // console.log(User)
    await User.posts.push(post)
    await User.save()
    // console.log(User)
    console.log("hit")

  })
})
router.post("/likepost", async (req, res) => {
  const userLiked = await UserData.findOne({ email: req.body.email })
  const post = await Post.findOne({ _id: req.body.postid })
  if (post.like && post.like.includes(userLiked._id)) {
    const mmo = Post.findOneAndUpdate({ _id: req.body.postid }, {
      $pull: {
        like: userLiked._id
      }
    }).then((data) => {
      data.save()
    })
    res.status(200).send(false)
  }
  else {
    post.like.push({ _id: userLiked._id })
    post.save()
    res.send(true)
  }
})

router.post("/comment", async (req, res) => {
  const userCommented = await UserData.findOne({ email: req.body.email })
  const post = await Post.findOne({ _id: req.body.postid })
  const CommentPost = await new Comment({
    comment: req.body.comment,
    ownerID:userCommented._id,
    ownername:userCommented.username,
    date: Date.now()
  })
  CommentPost.save()
  post.comment.push(CommentPost)
  await post.save()
  res.status(200).send(200)
})
router.get("/comments/users/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  let  dataMain = []
  if (post) {
    const postData = await Comment.find().where('_id').in(post.comment).populate("ownerID"  , 'username profileimage  _id').exec(async (err, records) => {
      dataMain = {
        commentData:records
      }    
      console.log(records)
      res.status(200).send(records)
    });
  }
  // res.status(200).send("post not found!!")
})


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
    console.log(dataArr)
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
    date: Date.now()

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


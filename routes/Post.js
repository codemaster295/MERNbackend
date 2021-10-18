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
router.put("/likepost", async (req, res) => {
  const userLiked = await UserData.findOne({ email: req.body.email })
  const post = await Post.findOne({ _id: req.body.postid })
  // console.log(req.body, post.like.includes(userLiked._id), "post is liked")
  if (post.like.includes(userLiked._id)) {
    // console.log(post.like.includes("fnbfjsbjhrbfjsbfhb"))
    // const data = post.like.filter((a,index)=>{
      //  return JSON.stringify(a).includes(userLiked._id)
      
      // })
      // console.log(data)
      const post = await Post.findOneAndUpdate({ _id: req.body.postid },{
        $unset:{
          like:{
            _id:userLiked._id
          }
        }
      })
      post.save()
      // console.log(post)
      // post.filter((x , index)=>{x.like.includes(userLiked._id);console.log(index)})
      // const mmo = post.like.pop(post.like.filter(x=>x=userLiked._id))
      // const mmo = Post.findOne({ _id: req.body.postid }).populate("like").exec((x,y)=>{
    //   console.log(x,y,"this is z")
    // })
    // console.log( mmo, "Dmddndn")
    // const mmo = post.like.filter((a,index) =>{a===userLiked._id ; console.log(a,userLiked._id ,index)})
    // var value = JSON.stringify(userLiked._id)

    // var arr = post.like

    // arr = arr.filter(function (item) {
    
    //   return item !== value
    // })

    // console.log(arr,value)
    // console.log("userIs liked", mmo, userLiked._id)
    console.log("reached")

    res.send(false)

  }
  else {
    post.like.push({ _id: userLiked._id })
    post.save()
    // console.log(post)
    res.send(true)
  }
})


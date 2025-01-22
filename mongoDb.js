const mongoose = require("mongoose")
const express = require("express");
mongoose.connect("mongodb+srv://deepakdmr456:Atlas%40123@cluster0.0sxqr.mongodb.net/")
const User = mongoose.model('Users', {
  name:String,
  email:String,
  password:String,
})
const app = express();
app.use(express.json());

app.post("/register", async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const userExists = await User.findOne({email:username})
  if(userExists){
    return res.status(400).send("User already exists");
  }
  
  const user = new User({
    name: name,
    email: username,
    password: password,
  })
  res.json({
    msg: "User created successfully",
  })
  user.save();
})

app.listen(3000, () =>{
  console.log("Server is running on port 3000")
})

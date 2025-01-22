// jwt authorization 
const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const { boolean } = require("zod");
const jwtpass = "112233";

app.use(express.json());
const UserData = [
  {
    username: "abdul@gmail.com",
    password: "123",
    name: "Abdul"
  },
  {
    username: "donald21@gmail.com",
    password: "456",
    name: "Trump"
  }, 
  {
    username: "ronaldo@gmail.com",
    password: "789",
    name: "Ronaldo"
  }
];

function userExists(username, password){
  let user = false;
  for(let i =0; i<UserData.length; i++){
    if(UserData[i].username == username && UserData[i].password == password){
      user = true;
    }
  }
  return user;
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!userExists(username, password)){
    return res.status(403).json({
      msg:"User not exists!"
    });
  }
  var token = jwt.sign({username:username, password: password}, jwtpass);
  return res.json({
    token,
  });
});

app.get("/users", (req, res) =>{
  const token = req.headers.authorization;
  try{
    const decoded = jwt.verify(token, jwtpass);
    const username = decoded.username;
  }catch(err){
    return res.status(403).json({
      msg:"Invalid token!"
    });
  }
  res.json({
    user:UserData
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

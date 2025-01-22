const mongoose = require("mongoose")
const express = require("express");
mongoose.connect("mongodb+srv://deepakdmr456:Atlas%40123@cluster0.0sxqr.mongodb.net/")
const User = mongoose.model('Users', {
  name: String,
  email: String,
  password: String,
})
const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const userExists = await User.findOne({ email: username })
  if (userExists) {
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

// Update user
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({
      msg: "User updated successfully",
      user
    });
  } catch (error) {
    res.status(500).send("Error updating user");
  }
});

// Delete user
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({
      msg: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

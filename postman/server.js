const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/usersdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// GET - Read all users
app.get("/users", async (req, res) => {
  const users = await User.find();
//   console.log(users);
  res.json(users);
});

// GET - Read single user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.json(user) : res.status(404).send("User not found");
  } catch {
    res.status(400).send("Invalid ID");
  }
});

// POST - Create new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User({ name: req.body.name, email: req.body.email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );
    user ? res.json(user) : res.status(404).send("User not found");
  } catch {
    res.status(400).send("Invalid ID");
  }
});
app.listen(3000,()=>console.log("App is listening"));